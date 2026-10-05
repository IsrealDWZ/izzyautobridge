import { Ship } from 'lucide-react';

import { USD_GHS_RATE } from '../../utils/constants';

export function VehiclePrice({ vehicle }) {
  return (
    <div className="mt-auto pt-3 border-t border-subtle">
      <div className="text-lg sm:text-xl font-bold">GH₵{vehicle.Price_GHS.toLocaleString()}</div>
      <div className="text-xs text-muted">
        CIF: ${vehicle.Price_USD.toLocaleString()} • {USD_GHS_RATE} GHS/USD
      </div>
      <div className="mt-1.5 inline-flex items-center gap-1 bg-secondary text-onsecondary text-[10px] sm:text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
        <Ship size={12} aria-hidden="true" />
        Free shipping to Tema
      </div>
    </div>
  );
}