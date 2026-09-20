const EV_FUEL_TYPES = new Set(['pure electric', 'electric']);
const HYBRID_FUEL_TYPES = new Set([
  'hybrid',
  'mild hybrid',
  'phev',
  'plug-in hybrid',
  'plug in hybrid',
  'range extender',
  'range-extender',
  'self-charging hybrid',
  'self charging hybrid',
]);

const FUEL_FUEL_TYPES = new Set(['petrol', 'gasoline', 'diesel']);

function normalizeFuelType(fuelType) {
  if (!fuelType) return '';
  return fuelType.toLowerCase().trim();
}

function normalizeBody(body) {
  if (!body) return '';
  return body.toLowerCase().trim();
}

export function classifyCategory(fuelType, body) {
  const fuel = normalizeFuelType(fuelType);
  const bodyLower = normalizeBody(body);

  if (bodyLower.includes('bus')) return 'Bus';
  if (bodyLower.includes('truck') || bodyLower.includes('crane') || bodyLower.includes('machinery') || bodyLower.includes('heavy')) return 'Heavy';
  if (bodyLower.includes('motorcycle') || bodyLower.includes('scooter') || bodyLower.includes('tricycle')) return 'Other';

  if (EV_FUEL_TYPES.has(fuel)) return 'EV';
  if (HYBRID_FUEL_TYPES.has(fuel)) return 'Hybrid';
  if (FUEL_FUEL_TYPES.has(fuel)) return 'Fuel';

  return 'Fuel';
}