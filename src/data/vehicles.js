import { withFreshPrices } from '../utils/pricing';

import rawVehicles from './vehicles.json';

/**
 * Published vehicles with GHS prices computed at render time from Price_USD
 * and the site rate. Import this instead of vehicles.json when displaying
 * prices, so GHS figures always match the current exchange-rate.json.
 */
const vehicles = withFreshPrices(rawVehicles);

export default vehicles;
