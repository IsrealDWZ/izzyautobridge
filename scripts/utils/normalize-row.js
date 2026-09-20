const UNIVERSAL_COLUMNS = [
  'Conditions',
  'Bodies',
  'Makes',
  'Models',
  'Mileage',
  'Fuel Types',
  'Engine',
  'Years',
  'Fuel Consumption',
  'Transmission',
  'Drives',
  'Fuel Economy',
  'Exterior Colors',
  'Interior Color',
  'Price (CIF USD)',
  'Seats',
  'Dimensions (mm)',
  'Trim / Edition',
  'Range (km)',
  'Power',
  'Source',
];

function cleanValue(val) {
  if (val === undefined || val === null) return '';
  return String(val).trim();
}

export function normalizeRow(rawRow) {
  const normalized = {};

  for (const col of UNIVERSAL_COLUMNS) {
    normalized[col] = cleanValue(rawRow[col]);
  }

  const specsJson = {};
  for (const [key, val] of Object.entries(rawRow)) {
    if (!UNIVERSAL_COLUMNS.includes(key) && !key.startsWith('_')) {
      specsJson[key] = cleanValue(val);
    }
  }

  normalized.specs_json = JSON.stringify(specsJson);
  normalized._sourceFile = rawRow._sourceFile || '';
  normalized._sourceType = rawRow._sourceType || '';
  normalized._raw = rawRow;

  return normalized;
}

export function hasRequiredDetails(row) {
  return (
    row.Makes &&
    row.Models &&
    row.Years &&
    row['Price (CIF USD)'] &&
    parseFloat(row['Price (CIF USD)'].replace(/[,$*]/g, '')) > 0
  );
}