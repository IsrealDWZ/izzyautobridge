import { USD_GHS_RATE } from '../../utils/constants';

export function VehiclePrice({ vehicle }) {
  return (
    <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/10">
      <div className="text-lg sm:text-xl font-bold">GH₵{vehicle.Price_GHS.toLocaleString()}</div>
      <div className="text-xs text-gray-500">
        CIF: ${vehicle.Price_USD.toLocaleString()} • {USD_GHS_RATE} GHS/USD
      </div>
    </div>
  );
}