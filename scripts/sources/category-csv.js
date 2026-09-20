import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const FILES = [
  'Group_Buses.csv',
  'Group_Trucks & Cranes.csv',
  'Group_Machinery.csv',
  'Group_Motorcycles.csv',
  'Group_Scooters.csv',
  'Group_Tricycles.csv',
  'Group_Other.csv',
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

export function harvestCategoryCSV() {
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
        _sourceType: 'category-csv',
      });
    }
    console.log(`  ${file}: ${records.length} rows`);
  }

  return { rows, totalRows, sourceName: 'category-csv' };
}