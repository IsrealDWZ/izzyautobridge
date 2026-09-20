import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const FILES = [
  'Trucks_HeavyVehicles.csv',
  'Motorcycles.csv',
  'TrustedRide_Vehicles.csv',
  'whatsapp_mapped_features.csv',
];

const CSV_DIR = '/home/israel/Documents/Default Project';

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}

export function harvestMiscCSV() {
  const rows = [];
  let totalRows = 0;

  for (const file of FILES) {
    const filePath = path.join(CSV_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  Missing: ${file}`);
      continue;
    }
    const records = parseCSV(filePath);
    totalRows += records.length;
    for (const record of records) {
      rows.push({
        ...record,
        _sourceFile: file,
        _sourceType: 'misc-csv',
      });
    }
    console.log(`  ${file}: ${records.length} rows`);
  }

  return { rows, totalRows, sourceName: 'misc-csv' };
}