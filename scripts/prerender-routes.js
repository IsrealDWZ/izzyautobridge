import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { currentSeason } from '../src/utils/season.js';

// HTML escape for attribute context (prevents breaking out of content="...")
function escapeAttr(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// HTML escape for text content context
function escapeHtml(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Build-time prerender of route-specific <head> (option A).
// Copies the vite-built index.html and swaps title/meta/canonical/OG tags so
// crawlers and social scrapers get the correct head without running JS.
// Body is left as the SPA shell — React hydrates it client-side as before.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.resolve(process.argv[2] || path.join(ROOT_DIR, 'dist'));
const VEHICLES_JSON_PATH = path.join(ROOT_DIR, 'src', 'data', 'vehicles.json');
const EXCHANGE_RATE_PATH = path.join(ROOT_DIR, 'src', 'data', 'exchange-rate.json');
const BASE = 'https://izzyautobridge.vercel.app';

const STATIC_ROUTES = [
  {
    // Root = the inventory itself. Cars are the first thing a visitor sees.
    out: 'index.html',
    title: 'IzzyAutoBridge Ghana — Inspected Cars from China',
    description:
      'Browse 129 SGS-inspected vehicles imported from China to Ghana. Transparent landed prices in GHS, free shipping to Tema, full payment only.',
    canonical: `${BASE}/`,
  },
  {
    out: 'about/index.html',
    title: 'About Us — IzzyAutoBridge Ghana',
    description:
      'How IzzyAutoBridge sources, inspects and ships vehicles from China to Tema: transparent landed costs, SGS inspection, 60-day delivery and full-payment terms.',
    canonical: `${BASE}/about`,
  },
  {
    // Legacy/alias URL. Still served so old links and bookmarks work, but the
    // canonical points at "/" so search engines index a single inventory page.
    out: 'inventory/index.html',
    title: 'Browse Inventory — IzzyAutoBridge Ghana',
    description:
      'Browse 129 inspected vehicles imported from China to Ghana. BYD, Toyota, Honda and more — transparent landed costs and SGS inspection.',
    canonical: `${BASE}/`,
  },
  {
    out: 'privacy/index.html',
    title: 'Privacy Policy — IzzyAutoBridge Ghana',
    description:
      "How IzzyAutoBridge Ghana handles your data: local-only storage, analytics cookies only after you consent, and your rights under Ghana's Data Protection Act, 2012.",
    canonical: `${BASE}/privacy`,
  },
  {
    out: 'terms/index.html',
    title: 'Terms of Service — IzzyAutoBridge Ghana',
    description:
      'Terms governing IzzyAutoBridge vehicle orders: full-payment policy, 60-day shipping estimate, clearance options and Ghana consumer rights.',
    canonical: `${BASE}/terms`,
  },
  {
    out: 'compare/index.html',
    title: 'Compare vehicles — IzzyAutoBridge Ghana',
    description:
      'Compare inspected China-import vehicles side by side: price, year, fuel, body type and key specs, with transparent landed costs to Tema.',
    canonical: `${BASE}/compare`,
  },
];

function buildVehicleRoutes() {
  if (!fs.existsSync(VEHICLES_JSON_PATH)) return [];
  const vehicles = JSON.parse(fs.readFileSync(VEHICLES_JSON_PATH, 'utf-8'));
  let rate = null;
  if (fs.existsSync(EXCHANGE_RATE_PATH)) {
    const cached = JSON.parse(fs.readFileSync(EXCHANGE_RATE_PATH, 'utf-8'));
    rate = typeof cached.rate === 'number' ? cached.rate : null;
  }
  // Price in GHS the same way the app does at render time, so meta tags always
  // match what the page re-computes from Price_USD and the site rate.
  const priceGhs = (v) =>
    typeof v.Price_USD === 'number' && v.Price_USD > 0 && rate
      ? Math.round(v.Price_USD * rate)
      : Number(v.Price_GHS) || 0;
  // Mirror the on-site season so social/Google previews stay in sync.
  const festiveTag = currentSeason() === 'festive' ? ' · festive prices live' : '';
  return vehicles.map((v) => {
    const title = `${v.Brand} ${v.Model} ${v.Year} — IzzyAutoBridge Ghana`;
    const variant = v.Variant ? ` (${v.Variant})` : '';
    const specs = v.Key_Specs ? ` Key specs: ${v.Key_Specs}.` : '';
    const description = `${v.Brand} ${v.Model} ${v.Year}${variant} available now in Ghana. GH₵${priceGhs(
      v
    ).toLocaleString()} · SGS inspected · free shipping to Tema${festiveTag}.${specs}`;
    return {
      out: `vehicle/${v.ID}/index.html`,
      title,
      description,
      canonical: `${BASE}/vehicle/${v.ID}`,
    };
  });
}

function replaceOnce(html, pattern, replacement, label, file) {
  if (!pattern.test(html)) {
    console.warn(`  ! ${file}: pattern not found for ${label} (skipped)`);
    return html;
  }
  // Function replacer: a `$` in the replacement must stay literal instead of
  // being interpreted as a capture-group reference.
  return html.replace(pattern, () => replacement);
}

function prerender() {
  const indexPath = path.join(OUT_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`✗ ${indexPath} not found — run vite build first`);
    process.exit(1);
  }
  const template = fs.readFileSync(indexPath, 'utf-8');
  const ROUTES = [...STATIC_ROUTES, ...buildVehicleRoutes()];

  for (const route of ROUTES) {
    let html = template;
    html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`, 'title', route.out);
    html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeAttr(route.description)}" />`, 'description', route.out);
    html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeAttr(route.canonical)}" />`, 'canonical', route.out);
    html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${escapeAttr(route.canonical)}" />`, 'og:url', route.out);
    html = replaceOnce(html, /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`, 'og:title', route.out);
    html = replaceOnce(html, /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeAttr(route.description)}" />`, 'og:description', route.out);
    html = replaceOnce(html, /<meta name="twitter:url" content="[^"]*" \/>/,
      `<meta name="twitter:url" content="${escapeAttr(route.canonical)}" />`, 'twitter:url', route.out);
    html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`, 'twitter:title', route.out);
    html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`, 'twitter:description', route.out);

    const outPath = path.join(OUT_DIR, route.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`✓ Prerendered ${route.out}`);
  }
  console.log(`✓ Prerender done → ${OUT_DIR}`);
}

prerender();
