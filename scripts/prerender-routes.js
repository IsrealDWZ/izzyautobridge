import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Build-time prerender of route-specific <head> (option A).
// Copies the vite-built index.html and swaps title/meta/canonical/OG tags so
// crawlers and social scrapers get the correct head without running JS.
// Body is left as the SPA shell — React hydrates it client-side as before.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.resolve(process.argv[2] || path.join(ROOT_DIR, 'dist'));
const BASE = 'https://izzyautobridge.vercel.app';

const ROUTES = [
  {
    out: 'inventory.html',
    title: 'Browse Inventory — IzzyAutoBridge Ghana',
    description:
      'Browse 194+ inspected vehicles imported from China to Ghana. BYD, Toyota, Honda and more — transparent landed costs, SGS inspection, 12-month warranty.',
    canonical: `${BASE}/inventory`,
  },
];

function replaceOnce(html, pattern, replacement, label, file) {
  if (!pattern.test(html)) {
    console.warn(`  ! ${file}: pattern not found for ${label} (skipped)`);
    return html;
  }
  return html.replace(pattern, replacement);
}

function prerender() {
  const indexPath = path.join(OUT_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`✗ ${indexPath} not found — run vite build first`);
    process.exit(1);
  }
  const template = fs.readFileSync(indexPath, 'utf-8');

  for (const route of ROUTES) {
    let html = template;
    html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`, 'title', route.out);
    html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${route.description}" />`, 'description', route.out);
    html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${route.canonical}" />`, 'canonical', route.out);
    html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${route.canonical}" />`, 'og:url', route.out);
    html = replaceOnce(html, /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${route.title}" />`, 'og:title', route.out);
    html = replaceOnce(html, /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${route.description}" />`, 'og:description', route.out);
    html = replaceOnce(html, /<meta name="twitter:url" content="[^"]*" \/>/,
      `<meta name="twitter:url" content="${route.canonical}" />`, 'twitter:url', route.out);
    html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${route.title}" />`, 'twitter:title', route.out);
    html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${route.description}" />`, 'twitter:description', route.out);

    const outPath = path.join(OUT_DIR, route.out);
    fs.writeFileSync(outPath, html);
    console.log(`✓ Prerendered ${route.out}`);
  }
  console.log(`✓ Prerender done → ${OUT_DIR}`);
}

prerender();
