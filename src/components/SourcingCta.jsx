import { MessageCircle } from 'lucide-react';

import { trackWhatsApp } from '../utils/analytics';
import { WHATSAPP_NUMBER } from '../utils/constants';

const WHATSAPP_MESSAGE =
  "Hi, I can't find the car I'm looking for on your site. Could you check what's available?";

/**
 * Shown under the inventory grid, and again when filters return nothing.
 * The catalogue is a subset of what the China partners can supply, so a
 * dead-end search should still produce a lead rather than a bounce.
 */
export default function SourcingCta() {
  return (
    <div className="mt-8 card-surface rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <div className="flex-1">
        <h2 className="font-display text-lg sm:text-xl font-bold">Can&rsquo;t find your car?</h2>
        <p className="text-sm text-muted mt-1.5 max-w-xl">
          This isn&rsquo;t the full inventory — we source new units every week. Tell us the make,
          model and budget, and we&rsquo;ll check what&rsquo;s available.
        </p>
      </div>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackWhatsApp('inventory_sourcing')}
        className="inline-flex items-center justify-center gap-2 bg-whatsapp text-onwhatsapp text-sm font-bold px-5 py-3 rounded-lg hover:opacity-85 transition min-h-[44px] whitespace-nowrap"
      >
        <MessageCircle size={16} aria-hidden="true" />
        Send us a message now
      </a>
    </div>
  );
}
