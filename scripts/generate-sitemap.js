import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const VEHICLES_JSON_PATH = path.join(ROOT_DIR, 'src', 'data', 'vehicles.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

function generateSitemap() {
  if (!fs.existsSync(VEHICLES_JSON_PATH)) {
    console.warn('vehicles.json not found, generating basic sitemap');
    generateBasicSitemap();
    return;
  }

  const vehicles = JSON.parse(fs.readFileSync(VEHICLES_JSON_PATH, 'utf-8'));
  const baseUrl = 'https://izzyautobridge.vercel.app';
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    {
      url: baseUrl,
      changefreq: 'daily',
      priority: '1.0',
      lastmod: today,
    },
    {
      url: `${baseUrl}/#inventory`,
      changefreq: 'daily',
      priority: '0.9',
      lastmod: today,
    },
    {
      url: `${baseUrl}/#process`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: today,
    },
    {
      url: `${baseUrl}/#comparison`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: today,
    },
    {
      url: `${baseUrl}/#ev-calculator`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: today,
    },
    {
      url: `${baseUrl}/#concierge`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: today,
    },
  ];

  // Add vehicle pages
  vehicles.forEach(vehicle => {
    urls.push({
      url: `${baseUrl}/vehicle/${vehicle.ID}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: today,
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`✓ Sitemap generated at ${OUTPUT_PATH} with ${urls.length} URLs`);
}

function generateBasicSitemap() {
  const baseUrl = 'https://izzyautobridge.vercel.app';
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { url: baseUrl, changefreq: 'daily', priority: '1.0' },
    { url: `${baseUrl}/#inventory`, changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/#process`, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/#comparison`, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/#ev-calculator`, changefreq: 'monthly', priority: '0.6' },
    { url: `${baseUrl}/#concierge`, changefreq: 'monthly', priority: '0.6' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`✓ Basic sitemap generated at ${OUTPUT_PATH}`);
}

generateSitemap();