import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { findAllMatches } from './utils/fuzzy-match.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const MASTER_CSV_PATH = path.join(ROOT_DIR, 'src', 'data', 'master-inventory.csv');
const IMAGE_INDEX_PATH = path.join(__dirname, 'image-index.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'src', 'data', 'vehicles.json');
const PUBLIC_VEHICLES_DIR = path.join(ROOT_DIR, 'public', 'vehicles');
const CUSTOM_IMAGES_DIR = path.join(ROOT_DIR, 'images_custom');

const EXCHANGE_RATE_PATH = path.join(ROOT_DIR, 'src', 'data', 'exchange-rate.json');

function loadExchangeRate() {
  try {
    if (fs.existsSync(EXCHANGE_RATE_PATH)) {
      const data = JSON.parse(fs.readFileSync(EXCHANGE_RATE_PATH, 'utf-8'));
      if (data.rate && typeof data.rate === 'number') {
        console.log(`Using exchange rate: 1 USD = ${data.rate} GHS (source: ${data.source}, fetched ${data.fetchedAt})`);
        return data.rate;
      }
    }
  } catch (err) {
    console.warn(`Failed to load exchange rate: ${err.message}`);
  }
  console.warn('Using fallback exchange rate: 15.5');
  return 15.5;
}

const USD_GHS_RATE = loadExchangeRate();

function loadMasterCSV() {
  if (!fs.existsSync(MASTER_CSV_PATH)) {
    throw new Error(`Master CSV not found: ${MASTER_CSV_PATH}. Run build-master-catalog.js first.`);
  }
  const content = fs.readFileSync(MASTER_CSV_PATH, 'utf-8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}

function loadImageIndex() {
  if (!fs.existsSync(IMAGE_INDEX_PATH)) {
    console.warn('Image index not found, using empty index');
    return {};
  }
  return JSON.parse(fs.readFileSync(IMAGE_INDEX_PATH, 'utf-8'));
}

function loadExistingVehicles() {
  if (!fs.existsSync(OUTPUT_PATH)) return [];
  return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
}

function getCustomImages(vehicleId) {
  const customDir = path.join(CUSTOM_IMAGES_DIR, vehicleId);
  if (!fs.existsSync(customDir)) return [];

  const files = fs.readdirSync(customDir)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .sort();

  return files.map(f => ({
    path: path.join(customDir, f),
    filename: path.basename(f, path.extname(f)),
    ext: path.extname(f),
  }));
}

function matchImagesForVehicle(vehicle, imageIndex, existingImageUrls) {
  const customImages = getCustomImages(vehicle.ID);
  if (customImages.length > 0) {
    console.log(`  Using ${customImages.length} custom image(s) for ${vehicle.ID}`);
    return customImages.map(img => `/vehicles/${vehicle.ID}-${img.filename}${img.ext}`);
  }

  if (existingImageUrls && existingImageUrls.length > 0) {
    console.log(`  Reusing ${existingImageUrls.length} existing image(s) for ${vehicle.ID}`);
    return existingImageUrls;
  }

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

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[,$*]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function parseIntSafe(val, fallback = 0) {
  if (!val) return fallback;
  const cleaned = val.replace(/[^0-9]/g, '');
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? fallback : num;
}

function extractBodyType(bodies) {
  if (!bodies) return 'Unknown';
  const match = bodies.match(/^(Sedan|SUV|Hatchback|MPV|Pickup|Truck|Bus|Motorcycle|Scooter|Tricycle|Mini|Van|Coupe|Convertible|Wagon)/i);
  return match ? match[1] : bodies.split('(')[0].trim();
}

function generateId(brand, model, year) {
  const base = `${brand}-${model}-${year}`.replace(/[^a-zA-Z0-9]/g, '-');
  return `IZZY-${base.toUpperCase()}`;
}

function buildKeySpecs(row) {
  const parts = [];
  if (row.Engine) parts.push(row.Engine);
  if (row.Seats) parts.push(`${row.Seats}-seater`);
  if (row.Drives) parts.push(row.Drives);
  if (row.Transmission) parts.push(row.Transmission);
  if (row.Fuel_Economy) parts.push(row.Fuel_Economy);
  if (row.Power) parts.push(row.Power);
  if (row.Range_km) parts.push(`${row.Range_km}km range`);
  return parts.join(' • ');
}

function transformMasterRow(row, imageMatches) {
  const brand = row.Makes?.trim() || 'Unknown';
  const model = row.Models?.trim() || 'Unknown';
  const year = parseIntSafe(row.Years);
  const priceUSD = parsePrice(row.Price_USD);

  if (!brand || !model || !year || priceUSD === 0) {
    return null;
  }

  const vehicle = {
    ID: generateId(brand, model, year),
    Category: row.Category || 'Unknown',
    Brand: brand,
    Model: model,
    Year: year,
    Variant: row.Trim_Edition?.trim() || '',
    Fuel_Type: row.Fuel_Types?.trim() || 'Unknown',
    Body_Type: extractBodyType(row.Bodies),
    Drive: row.Drives?.trim() || 'Unknown',
    Color: row.Exterior_Colors?.split(',')[0]?.trim() || 'Unknown',
    Status: row.Conditions?.trim() || 'Available',
    Mileage_km: parseIntSafe(row.Mileage),
    Price_USD: priceUSD,
    Price_GHS: Math.round(priceUSD * USD_GHS_RATE),
    Key_Specs: buildKeySpecs(row),
    Image_URLs: imageMatches.join(','),
  };

  return vehicle;
}

async function main() {
  console.log('Starting vehicle data generation from master catalog...');

  const imageIndex = loadImageIndex();
  const imageKeys = Object.keys(imageIndex);
  console.log(`Loaded image index with ${imageKeys.length} keys`);

  const existingVehicles = loadExistingVehicles();
  const existingImagesById = new Map();
  for (const v of existingVehicles) {
    if (v.Image_URLs) {
      existingImagesById.set(v.ID, v.Image_URLs.split(',').filter(Boolean));
    }
  }
  console.log(`Loaded ${existingImagesById.size} vehicles with existing images from vehicles.json`);

  const masterRows = loadMasterCSV();
  console.log(`Loaded ${masterRows.length} rows from master catalog`);

  const allVehicles = [];
  let withImages = 0;
  let withoutImages = 0;

  for (const row of masterRows) {
    const existingUrls = existingImagesById.get(row.ID) || [];
    const imageMatches = matchImagesForVehicle(row, imageIndex, existingUrls);

    const vehicle = transformMasterRow(row, imageMatches);
    if (vehicle) {
      if (vehicle.Image_URLs) {
        withImages++;
      } else {
        withoutImages++;
      }
      allVehicles.push(vehicle);
    }
  }

  console.log(`\nTotal vehicles: ${allVehicles.length} (with images: ${withImages}, without: ${withoutImages})`);

  if (!fs.existsSync(PUBLIC_VEHICLES_DIR)) {
    fs.mkdirSync(PUBLIC_VEHICLES_DIR, { recursive: true });
  }

  let customCopied = 0;
  for (const v of allVehicles) {
    const customImages = getCustomImages(v.ID);
    for (const img of customImages) {
      const destName = `${v.ID}-${img.filename}${img.ext}`;
      const destPath = path.join(PUBLIC_VEHICLES_DIR, destName);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(img.path, destPath);
        customCopied++;
      }
    }
  }
  if (customCopied > 0) console.log(`Copied ${customCopied} custom images to public/vehicles/`);

  const matchedKeys = new Set();
  for (const v of allVehicles) {
    if (v.Image_URLs && !getCustomImages(v.ID).length) {
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

  const vehiclesWithImages = allVehicles.filter(v => v.Image_URLs && v.Image_URLs.length > 0);
  console.log(`\nPublishing ${vehiclesWithImages.length} vehicles with images (${allVehicles.length - vehiclesWithImages.length} dormant)`);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(vehiclesWithImages, null, 2));
  console.log(`\n✓ Generated ${OUTPUT_PATH} with ${vehiclesWithImages.length} vehicles`);

  const byCategory = {};
  for (const v of vehiclesWithImages) {
    byCategory[v.Category] = (byCategory[v.Category] || 0) + 1;
  }
  console.log('\nBy category:');
  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });

  const byBrand = {};
  for (const v of vehiclesWithImages) {
    byBrand[v.Brand] = (byBrand[v.Brand] || 0) + 1;
  }
  console.log('\nBy brand:');
  Object.entries(byBrand).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
    console.log(`  ${brand}: ${count}`);
  });
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});