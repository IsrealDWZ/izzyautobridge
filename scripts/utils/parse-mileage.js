/**
 * Parse a mileage string into a single kilometre value.
 *
 * Source sheets sometimes describe a range ("19,000-22,000 km"). The upper
 * bound is used so a listing never overstates a vehicle's condition. A single
 * value parses to itself.
 *
 * @param {string | number | null | undefined} value
 * @param {number} [fallback]
 * @returns {number}
 */
export function parseMileage(value, fallback = 0) {
  if (value === undefined || value === null || value === '') return fallback;

  const matches = String(value).match(/\d[\d,]*/g);
  if (!matches || matches.length === 0) return fallback;

  const numbers = matches
    .map(match => parseInt(match.replace(/,/g, ''), 10))
    .filter(number => Number.isFinite(number));

  if (numbers.length === 0) return fallback;

  const highest = Math.max(...numbers);
  // A six-figure-plus range is almost always malformed; fall back to the first
  // number rather than inventing an impossible mileage.
  return highest > 1_000_000 ? numbers[0] : highest;
}
