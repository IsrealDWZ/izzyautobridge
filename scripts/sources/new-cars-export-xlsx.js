import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const FILES = [
  { name: 'new cars export.xlsx', sourceType: 'new-cars-export-xlsx' },
];

const XLSX_DIR = '/mnt/8A0CBCB40CBC9C9F/WhatsApp Chat with TrustedRide imports';

function parseXLSX(filePath) {
  const workbook = XLSX.readFile(filePath);
  const rows = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    for (const record of json) {
      rows.push(record);
    }
  }
  return rows;
}

export function harvestNewCarsExportXLSX() {
  const rows = [];
  let totalRows = 0;

  for (const file of FILES) {
    const filePath = path.join(XLSX_DIR, file.name);
    if (!fs.existsSync(filePath)) {
      console.warn(`  Missing: ${file.name}`);
      continue;
    }
    const workbook = XLSX.readFile(filePath);
    const records = parseXLSX(filePath);
    totalRows += records.length;
    for (const record of records) {
      rows.push({
        ...record,
        _sourceFile: file.name,
        _sourceType: file.sourceType,
      });
    }
    console.log(`  ${file.name} (${workbook.SheetNames.length} sheets): ${records.length} rows`);
  }

  return { rows, totalRows, sourceName: 'new-cars-export-xlsx' };
}