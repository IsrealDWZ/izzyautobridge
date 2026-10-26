/**
 * Normalize a search query for case-insensitive matching.
 * @param {string} value
 * @returns {string}
 */
export function normalizeSearch(value) {
  return String(value ?? '').trim().toLowerCase();
}

/**
 * Check whether a vehicle matches every token in the query. Tokens are matched
 * against the stock ID, make, model, variant, year, fuel, body, status and
 * category, so "toyota corolla 2022" works as well as a partial stock ID.
 * @param {object} vehicle
 * @param {string} query
 * @returns {boolean}
 */
export function matchesSearch(vehicle, query = '') {
  const tokens = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = [
    vehicle.ID,
    vehicle.Brand,
    vehicle.Model,
    vehicle.Variant,
    vehicle.Year,
    vehicle.Fuel_Type,
    vehicle.Body_Type,
    vehicle.Status,
    vehicle.Category,
  ]
    .filter((value) => value !== null && value !== undefined)
    .join(' ')
    .toLowerCase();

  return tokens.every((token) => haystack.includes(token));
}

/**
 * Apply the inventory filters and free-text search to a vehicle list.
 * @param {object[]} vehicles
 * @param {object} filters
 * @param {string} query
 * @returns {object[]}
 */
export function filterVehicles(vehicles, filters, query = '') {
  return vehicles.filter((vehicle) => {
    if (filters.brands.length && !filters.brands.includes(vehicle.Brand)) return false;
    if (filters.fuel.length && !filters.fuel.includes(vehicle.Fuel_Type)) return false;
    if (filters.body.length && !filters.body.includes(vehicle.Body_Type)) return false;
    if (filters.status.length && !filters.status.includes(vehicle.Status)) return false;
    if (filters.category.length && !filters.category.includes(vehicle.Category)) return false;
    if (vehicle.Price_GHS < filters.priceRange[0] || vehicle.Price_GHS > filters.priceRange[1]) return false;
    if (vehicle.Year < filters.yearRange[0] || vehicle.Year > filters.yearRange[1]) return false;
    return matchesSearch(vehicle, query);
  });
}
