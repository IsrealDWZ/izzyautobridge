const USD_GHS_RATE = 15.5;

export function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[,$*]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function parseIntSafe(val, fallback = 0) {
  if (!val) return fallback;
  const cleaned = val.replace(/[^0-9]/g, '');
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? fallback : num;
}

export function extractBodyType(bodies) {
  if (!bodies) return 'Unknown';
  const match = bodies.match(/^(Sedan|SUV|Hatchback|MPV|Pickup|Truck|Bus|Motorcycle|Scooter|Tricycle|Mini|Van|Coupe|Convertible|Wagon)/i);
  return match ? match[1] : bodies.split('(')[0].trim();
}

export function generateId(brand, model, year) {
  const base = `${brand}-${model}-${year}`.replace(/[^a-zA-Z0-9]/g, '-');
  return `IZZY-${base.toUpperCase()}`;
}

export function buildKeySpecs(row) {
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

export function transformRow(row, imageMatches) {
  const brand = row.Makes?.trim() || 'Unknown';
  const model = row.Models?.trim() || 'Unknown';
  const year = parseIntSafe(row.Years);
  const priceUSD = parsePrice(row['Price (CIF USD)']);

  if (!brand || !model || !year || priceUSD === 0) {
    return null;
  }

  const vehicle = {
    ID: generateId(brand, model, year),
    Brand: brand,
    Model: model,
    Year: year,
    Variant: row['Trim / Edition']?.trim() || '',
    Fuel_Type: row['Fuel Types']?.trim() || 'Unknown',
    Body_Type: extractBodyType(row.Bodies),
    Drive: row.Drives?.trim() || 'Unknown',
    Color: row['Exterior Colors']?.split(',')[0]?.trim() || 'Unknown',
    Status: row.Conditions?.trim() || 'Available',
    Mileage_km: parseIntSafe(row.Mileage),
    Price_USD: priceUSD,
    Price_GHS: Math.round(priceUSD * USD_GHS_RATE),
    Key_Specs: buildKeySpecs(row),
    Image_URLs: imageMatches.join(','),
  };

  return vehicle;
}