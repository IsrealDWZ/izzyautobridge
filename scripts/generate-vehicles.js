import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { findAllMatches } from './utils/fuzzy-match.js';
import { transformRow } from './utils/csv-transform.js';

const CSV_DIRS = [
  '/home/israel/Documents/Default Project/TO UPLOAD FIRST/MAIN FEATURES SORTED',
];

const ALLOWED_CSV_FILES = new Set([
  'Group_Hatchbacks.csv',
  'Group_MPVs.csv',
  'Group_Mini Cars.csv',
  'Group_Pickup Trucks.csv',
  'Group_SUVs.csv',
  'Group_Sedans.csv',
  'Group_Buses.csv',
  'Group_Motorcycles.csv',
  'Group_Scooters.csv',
  'Group_Tricycles.csv',
  'TrustedRide_Vehicles.csv',
  'Motorcycles.csv',
]);

const IMAGE_INDEX_PATH = '/home/israel/Desktop/izzyautobridge website/izzy-react/scripts/image-index.json';
const OUTPUT_PATH = '/home/israel/Desktop/izzyautobridge website/izzy-react/src/data/vehicles.json';
const PUBLIC_VEHICLES_DIR = '/home/israel/Desktop/izzyautobridge website/izzy-react/public/vehicles';
const VEHICLES_JSON_PATH = '/home/israel/Desktop/izzyautobridge website/izzy-react/src/data/vehicles.json';

function findCSVFiles() {
  const files = [];
  for (const dir of CSV_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry.endsWith('.csv') && ALLOWED_CSV_FILES.has(entry)) {
        files.push(path.join(dir, entry));
      }
    }
  }
  return files;
}

function loadImageIndex() {
  if (!fs.existsSync(IMAGE_INDEX_PATH)) {
    console.warn('Image index not found, using empty index');
    return {};
  }
  return JSON.parse(fs.readFileSync(IMAGE_INDEX_PATH, 'utf-8'));
}

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return records;
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

  if (allKeys.length === 0) {
    return [];
  }

  for (const term of searchTerms) {
    const matches = findAllMatches(term, allKeys, 30, 4);
    for (const m of matches) matched.add(m);
    if (matched.size >= 4) break;
  }

  const imageUrls = Array.from(matched).map(key => `/vehicles/${key}${path.extname(imageIndex[key][0].path)}`);
  return imageUrls;
}

function main() {
  console.log('Starting vehicle data generation...');

  // Skip if vehicles.json already exists (production/Vercel)
  if (fs.existsSync(VEHICLES_JSON_PATH)) {
    console.log('vehicles.json exists, skipping generation (production mode)');
    return;
  }

  const imageIndex = loadImageIndex();
  const imageKeys = Object.keys(imageIndex);
  console.log(`Loaded image index with ${imageKeys.length} keys`);

  const csvFiles = findCSVFiles();
  console.log(`Found ${csvFiles.length} CSV files:`);
  csvFiles.forEach(f => console.log(`  - ${path.basename(f)}`));

  const allVehicles = [];
  let skipped = 0;

  for (const csvFile of csvFiles) {
    console.log(`\nProcessing ${path.basename(csvFile)}...`);
    const rows = parseCSV(csvFile);
    console.log(`  ${rows.length} rows`);

    for (const row of rows) {
      const vehicleData = { Brand: row.Makes, Model: row.Models, Variant: row['Trim / Edition'], Year: row.Years };
      const imageMatches = matchImagesForVehicle(vehicleData, imageIndex);

      const vehicle = transformRow(row, imageMatches);
      if (vehicle) {
        allVehicles.push(vehicle);
      } else {
        skipped++;
      }
    }
  }

  console.log(`\nTotal vehicles: ${allVehicles.length} (skipped ${skipped} invalid rows)`);

  if (!fs.existsSync(PUBLIC_VEHICLES_DIR)) {
    fs.mkdirSync(PUBLIC_VEHICLES_DIR, { recursive: true });
  }

  const matchedKeys = new Set();
  for (const v of allVehicles) {
    if (v.Image_URLs) {
      v.Image_URLs.split(',').forEach(url => {
        const filename = path.basename(url);
        matchedKeys.add(filename.replace(path.extname(filename), ''));
      });
    }
  }

  for (const key of matchedKeys) {
    const images = imageIndex[key];
    if (images) {
      for (const img of images) {
        const destName = `${key}${path.extname(img.path)}`;
        const destPath = path.join(PUBLIC_VEHICLES_DIR, destName);
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(img.path, destPath);
        }
      }
    }
  }
  console.log(`Copied images for ${matchedKeys.size} vehicles to public/vehicles/`);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allVehicles, null, 2));
  console.log(`\n✓ Generated ${OUTPUT_PATH} with ${allVehicles.length} vehicles`);

  const byBrand = {};
  for (const v of allVehicles) {
    byBrand[v.Brand] = (byBrand[v.Brand] || 0) + 1;
  }
  console.log('\nBy brand:');
  Object.entries(byBrand).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
    console.log(`  ${brand}: ${count}`);
  });

  const byBody = {};
  for (const v of allVehicles) {
    byBody[v.Body_Type] = (byBody[v.Body_Type] || 0) + 1;
  }
  console.log('\nBy body type:');
  Object.entries(byBody).sort((a, b) => b[1] - a[1]).forEach(([body, count]) => {
    console.log(`  ${body}: ${count}`);
  });
}

main();