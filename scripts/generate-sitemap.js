import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

// Only real routes: index + inventory. Vehicle detail pages are not built yet —
// listing them would create soft-404s (SPA fallback redirects to /).
const ROUTES = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/inventory', changefreq: 'daily', priority: '0.9' },
];

function generateSitemap() {
  const baseUrl = 'https://izzyautobridge.vercel.app';
  const today = new Date().toISOString().split('T')[0];

  const urls = ROUTES.map(r => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`✓ Sitemap generated at ${OUTPUT_PATH} with ${ROUTES.length} URLs`);
}

generateSitemap();
