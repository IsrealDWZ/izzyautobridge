import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findAllMatches } from './utils/fuzzy-match.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const VEHICLES_JSON_PATH = path.join(ROOT_DIR, 'src', 'data', 'vehicles.json');
const CUSTOM_IMAGES_DIR = path.join(ROOT_DIR, 'images_custom');

// Source folders to scan for images
const SOURCE_FOLDERS = [
  '/home/israel/Documents/Default Project/images_carimages',
  '/home/israel/Documents/Default Project/images_serpapi',
];

function loadVehicles() {
  if (!fs.existsSync(VEHICLES_JSON_PATH)) {
    console.error('vehicles.json not found. Run npm run build:data first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(VEHICLES_JSON_PATH, 'utf-8'));
}

function scanSourceImages() {
  const images = [];
  for (const folder of SOURCE_FOLDERS) {
    if (!fs.existsSync(folder)) {
      console.warn(`Source folder not found: ${folder}`);
      continue;
    }
    const files = fs.readdirSync(folder, { recursive: true });
    for (const file of files) {
      if (/\.(webp|jpg|jpeg|png)$/i.test(file)) {
        const fullPath = path.join(folder, file);
        const filename = path.basename(file, path.extname(file));
        const normalized = filename.toLowerCase().replace(/[^a-z0-9]/g, '');
        images.push({
          path: fullPath,
          filename,
          ext: path.extname(file),
          normalized,
        });
      }
    }
  }
  return images;
}

function buildImageIndex(images) {
  const index = {};
  for (const img of images) {
    if (!index[img.normalized]) index[img.normalized] = [];
    index[img.normalized].push(img);
  }
  return index;
}

function matchImagesForVehicle(vehicle, imageIndex) {
  const searchTerms = [
    `${vehicle.Brand} ${vehicle.Model} ${vehicle.Variant}`,
    `${vehicle.Brand} ${vehicle.Model}`,
    `${vehicle.Brand} ${vehicle.Model} ${vehicle.Year}`,
    vehicle.Model,
  ];

  const allKeys = Object.keys(imageIndex);
  const matched = new Set();

  for (const term of searchTerms) {
    const matches = findAllMatches(term, allKeys, 30, 5);
    for (const m of matches) matched.add(m);
    if (matched.size >= 5) break;
  }

  const results = [];
  for (const key of matched) {
    const imgs = imageIndex[key];
    for (const img of imgs) {
      results.push(img);
    }
  }
  return results;
}

function main() {
  console.log('=== Bulk Image Matcher ===\n');

  const vehicles = loadVehicles();
  console.log(`Loaded ${vehicles.length} vehicles from vehicles.json`);

  const sourceImages = scanSourceImages();
  console.log(`Found ${sourceImages.length} source images`);

  const imageIndex = buildImageIndex(sourceImages);
  console.log(`Built index with ${Object.keys(imageIndex).length} unique keys`);

  if (!fs.existsSync(CUSTOM_IMAGES_DIR)) {
    fs.mkdirSync(CUSTOM_IMAGES_DIR, { recursive: true });
  }

  let totalMatched = 0;
  let vehiclesWithImages = 0;

  for (const vehicle of vehicles) {
    const matches = matchImagesForVehicle(vehicle, imageIndex);
    if (matches.length === 0) continue;

    const vehicleDir = path.join(CUSTOM_IMAGES_DIR, vehicle.ID);
    if (!fs.existsSync(vehicleDir)) {
      fs.mkdirSync(vehicleDir, { recursive: true });
    }

    let copied = 0;
    for (const match of matches) {
      const destName = `${vehicle.ID}-${match.filename}${match.ext}`;
      const destPath = path.join(vehicleDir, destName);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(match.path, destPath);
        copied++;
      }
    }

    if (copied > 0) {
      vehiclesWithImages++;
      totalMatched += copied;
      console.log(`  ${vehicle.ID}: copied ${copied} images`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Vehicles with matched images: ${vehiclesWithImages}/${vehicles.length}`);
  console.log(`Total images copied: ${totalMatched}`);
  console.log(`Output directory: ${CUSTOM_IMAGES_DIR}`);
  console.log('\nRun `npm run build` to include in production build.');
}

main();