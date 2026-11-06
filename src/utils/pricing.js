import { USD_GHS_RATE } from './constants';

/**
 * Convert a USD price to GHS at the site rate, rounding the same way the
 * data pipeline does (generate-vehicles.js).
 * @param {number} priceUsd - USD price.
 * @returns {number} GHS price.
 */
export function ghsFromUsd(priceUsd) {
  return Math.round(priceUsd * USD_GHS_RATE);
}

/**
 * Stamp every vehicle with a fresh Price_GHS derived from Price_USD at render
 * time, replacing the snapshot stored in vehicles.json so GHS figures can
 * never go stale between rate refreshes. Vehicles without a USD price keep
 * their stored Price_GHS.
 * @param {Array<{Price_USD?: number, Price_GHS?: number}>} vehicles - Raw vehicles.
 * @returns {Array} Vehicles with fresh Price_GHS values.
 */
export function withFreshPrices(vehicles) {
  return vehicles.map(vehicle => ({
    ...vehicle,
    Price_GHS:
      typeof vehicle.Price_USD === 'number' && vehicle.Price_USD > 0
        ? ghsFromUsd(vehicle.Price_USD)
        : vehicle.Price_GHS,
  }));
}
