import { Ship } from 'lucide-react';

import { USD_GHS_RATE } from '../../utils/constants';
import { festiveAnchorGhs, ghsFromUsd } from '../../utils/pricing';
import { currentSeason, isSeasonOverridden, uiNow } from '../../utils/season';

export function VehiclePrice({ vehicle }) {
  const isFestive = currentSeason(uiNow()) === 'festive';

  return (
    <div className="mt-auto pt-3 border-t border-subtle">
      <div className="text-lg sm:text-xl font-bold">GH₵{vehicle.Price_GHS.toLocaleString()}</div>
      <div className="text-xs text-muted">
        ${vehicle.Price_USD.toLocaleString()} • {USD_GHS_RATE} GHS/USD
      </div>
      {/* Festive window only: honest strike anchor — the pre-festive price was
          really Price_USD + the $700 markup step the ladder removed. */}
      {isFestive && (
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
          <s className="text-muted" aria-label="Pre-festive price">
            GH₵{festiveAnchorGhs(vehicle.Price_USD).toLocaleString()}
          </s>
          <span className="bg-festive-surface text-festive font-semibold text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded">
            Festive: GH₵
            {(festiveAnchorGhs(vehicle.Price_USD) - ghsFromUsd(vehicle.Price_USD)).toLocaleString()}{' '}
            less{isFestive && isSeasonOverridden() ? ' (preview)' : ''}
          </span>
        </div>
      )}
      <div className="mt-1.5 inline-flex items-center gap-1 bg-secondary text-onsecondary text-[10px] sm:text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
        <Ship size={12} aria-hidden="true" />
        Shipping to Tema included (CIF)
      </div>
      <div className="mt-1 text-[10px] text-muted">Duties &amp; port clearing separate</div>
    </div>
  );
}
