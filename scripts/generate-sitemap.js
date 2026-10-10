import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const VEHICLES_JSON_PATH = path.join(ROOT_DIR, 'src', 'data', 'vehicles.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

// Only real routes: index + inventory + one page per vehicle. Fragment URLs
// (#process etc.) are not listable entries — Google ignores them.
const STATIC_ROUTES = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/inventory', changefreq: 'daily', priority: '0.9' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.2' },
  { path: '/terms', changefreq: 'yearly', priority: '0.2' },
];

function generateSitemap() {
  const baseUrl = 'https://izzyautobridge.vercel.app';
  const today = new Date().toISOString().split('T')[0];

  const entries = STATIC_ROUTES.map((r) => ({
    url: `${baseUrl}${r.path}`,
    changefreq: r.changefreq,
    priority: r.priority,
  }));

  if (fs.existsSync(VEHICLES_JSON_PATH)) {
    const vehicles = JSON.parse(fs.readFileSync(VEHICLES_JSON_PATH, 'utf-8'));
    for (const v of vehicles) {
      entries.push({
        url: `${baseUrl}/vehicle/${v.ID}`,
        changefreq: 'weekly',
        priority: '0.8',
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`✓ Sitemap generated at ${OUTPUT_PATH} with ${entries.length} URLs`);
}

generateSitemap();
