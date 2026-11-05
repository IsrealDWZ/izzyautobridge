import { RefreshCw } from 'lucide-react';

import rateData from '../data/exchange-rate.json';
import { formatRateDate } from '../utils/formatRateDate';

export default function ExchangeRateNote({ className = '' }) {
  const updated = formatRateDate(rateData.fetchedAt);
  const rate = Number(rateData.rate).toFixed(2);

  return (
    <p
      className={`inline-flex flex-wrap items-center gap-1.5 text-xs ${className}`}
      title="Pricing rate: live USD/GHS market rate plus Fidelity's selling premium. Checked every 6 hours; prices update automatically when the rate changes."
    >
      <RefreshCw size={12} aria-hidden="true" />
      <span>USD/GHS {rate}</span>
      <span aria-hidden="true">·</span>
      <span>{updated ? `Rate updated ${updated}` : 'Rate updated recently'}</span>
    </p>
  );
}
