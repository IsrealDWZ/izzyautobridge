import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { runHarvest } from './harvest.js';
import { normalizeRow, hasRequiredDetails } from './utils/normalize-row.js';
import { dedupeRows } from './utils/dedupe.js';
import { classifyCategory } from './utils/classify-category.js';
import { generateAuditReport, writeAuditReport } from './utils/audit-report.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USD_GHS_RATE = 15.5;
const MASTER_CSV_PATH = path.join(__dirname, '..', 'src', 'data', 'master-inventory.csv');
const AUDIT_REPORT_PATH = path.join(__dirname, '..', 'logs', 'master-catalog-audit.txt');

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[,$*]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function generateId(brand, model, year) {
  const base = `${brand}-${model}-${year}`.replace(/[^a-zA-Z0-9]/g, '-');
  return `IZZY-${base.toUpperCase()}`;
}

function extractBodyType(bodies) {
  if (!bodies) return 'Unknown';
  const match = bodies.match(/^(Sedan|SUV|Hatchback|MPV|Pickup|Truck|Bus|Motorcycle|Scooter|Tricycle|Mini|Van|Coupe|Convertible|Wagon)/i);
  return match ? match[1] : bodies.split('(')[0].trim();
}

function buildKeySpecs(row) {
  const parts = [];
  if (row.Engine) parts.push(row.Engine);
  if (row.Seats) parts.push(`${row.Seats}-seater`);
  if (row.Drives) parts.push(row.Drives);
  if (row.Transmission) parts.push(row.Transmission);
  if (row['Fuel Economy']) parts.push(row['Fuel Economy']);
  if (row.Power) parts.push(row.Power);
  if (row['Range (km)']) parts.push(`${row['Range (km)']}km range`);
  return parts.join(' • ');
}

async function main() {
  console.log('=== BUILDING MASTER CATALOG ===\n');

  const { allRows: rawRows, harvestResults } = await runHarvest();

  console.log('\nNormalizing and filtering...');
  const normalized = rawRows.map(normalizeRow);

  const filteredBySource = {};
  const filteredRows = [];

  for (const row of normalized) {
    if (hasRequiredDetails(row)) {
      filteredRows.push(row);
      const st = row._sourceType || 'unknown';
      filteredBySource[st] = (filteredBySource[st] || 0) + 1;
    }
  }

  console.log(`  Filtered: ${filteredRows.length} rows with details + price`);

  console.log('\nDeduplicating...');
  const dedupeResult = dedupeRows(filteredRows);
  console.log(`  Unique after dedupe: ${dedupeResult.deduped.length}`);
  if (dedupeResult.collisions.length > 0) {
    console.log(`  Collisions resolved: ${dedupeResult.collisions.length}`);
  }

  console.log('\nCategorizing and applying price rule...');
  const categorizedCounts = {};
  const outputRows = [];

  for (const row of dedupeResult.deduped) {
    const category = classifyCategory(row['Fuel Types'], row.Bodies);

    const cifPrice = parsePrice(row['Price (CIF USD)']);
    const newPriceUSD = Math.round(cifPrice + 1000);
    const newPriceGHS = Math.round(newPriceUSD * USD_GHS_RATE);

    categorizedCounts[category] = (categorizedCounts[category] || 0) + 1;

    const outputRow = {
      ID: generateId(row.Makes, row.Models, row.Years),
      Category: category,
      Conditions: row.Conditions,
      Bodies: row.Bodies,
      Makes: row.Makes,
      Models: row.Models,
      Mileage: row.Mileage,
      Fuel_Types: row['Fuel Types'],
      Engine: row.Engine,
      Years: row.Years,
      Fuel_Consumption: row['Fuel Consumption'],
      Transmission: row.Transmission,
      Drives: row.Drives,
      Fuel_Economy: row['Fuel Economy'],
      Exterior_Colors: row['Exterior Colors'],
      Interior_Color: row['Interior Color'],
      CIF_USD: cifPrice,
      Price_USD: newPriceUSD,
      Price_GHS: newPriceGHS,
      Seats: row.Seats,
      Dimensions_mm: row['Dimensions (mm)'],
      Trim_Edition: row['Trim / Edition'],
      Range_km: row['Range (km)'],
      Power: row.Power,
      Source: row.Source,
      specs_json: row.specs_json,
      _sourceFile: row._sourceFile,
      _sourceType: row._sourceType,
    };

    outputRows.push(outputRow);
  }

  outputRows.sort((a, b) => {
    const catOrder = { EV: 1, Hybrid: 2, Fuel: 3, Bus: 4, Heavy: 5, Other: 6 };
    const aOrder = catOrder[a.Category] ?? 99;
    const bOrder = catOrder[b.Category] ?? 99;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.Makes.localeCompare(b.Makes);
  });

  console.log('\nWriting master CSV...');
  const csvHeaders = [
    'ID', 'Category', 'Conditions', 'Bodies', 'Makes', 'Models', 'Mileage', 'Fuel_Types',
    'Engine', 'Years', 'Fuel_Consumption', 'Transmission', 'Drives', 'Fuel_Economy',
    'Exterior_Colors', 'Interior_Color', 'CIF_USD', 'Price_USD', 'Price_GHS',
    'Seats', 'Dimensions_mm', 'Trim_Edition', 'Range_km', 'Power', 'Source',
    'specs_json', '_sourceFile', '_sourceType'
  ];

  const csvLines = [
    csvHeaders.join(','),
    ...outputRows.map(r =>
      csvHeaders.map(h => {
        const val = r[h] ?? '';
        const str = String(val).replace(/"/g, '""');
        return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
      }).join(',')
    )
  ];

  if (!fs.existsSync(path.dirname(MASTER_CSV_PATH))) {
    fs.mkdirSync(path.dirname(MASTER_CSV_PATH), { recursive: true });
  }
  fs.writeFileSync(MASTER_CSV_PATH, csvLines.join('\n'));
  console.log(`  Written to ${MASTER_CSV_PATH} (${outputRows.length} rows)`);

  if (!fs.existsSync(path.dirname(AUDIT_REPORT_PATH))) {
    fs.mkdirSync(path.dirname(AUDIT_REPORT_PATH), { recursive: true });
  }
  const report = generateAuditReport(harvestResults, dedupeResult, categorizedCounts, filteredBySource);
  writeAuditReport(report, AUDIT_REPORT_PATH);

  console.log('\n=== BUILD COMPLETE ===');
  console.log(`Master CSV: ${MASTER_CSV_PATH}`);
  console.log(`Audit report: ${AUDIT_REPORT_PATH}`);
  console.log('Categories:', categorizedCounts);
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});