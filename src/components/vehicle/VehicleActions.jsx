import { Heart, Check, Scale, MessageCircle } from 'lucide-react';

import { WHATSAPP_NUMBER } from '../../utils/constants';

export function VehicleActions({ vehicle, isComparing, isFavorite, onToggleCompare, onToggleFavorite }) {

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => onToggleCompare(vehicle.ID)}
        aria-label="Compare"
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2.5 rounded-lg border transition min-h-[44px] ${
          isComparing
            ? 'pill-active font-semibold'
            : 'bg-accent-surface text-main border-subtle hover:bg-accent-hover/15'
        }`}
      >
        <Check size={14} className={isComparing ? 'opacity-100' : 'opacity-0'} />
        <span className="hidden sm:inline">Compare</span>
        <Scale size={14} className="sm:hidden" />
      </button>
      <button
        onClick={() => onToggleFavorite(vehicle.ID)}
        className="p-2.5 rounded-lg border border-subtle min-h-[44px] min-w-[44px] hover:bg-accent-hover/15 transition-colors"
        aria-label="Save to favorites"
      >
        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" />
      </button>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hi, I'm interested in ${vehicle.Brand} ${vehicle.Model} ${vehicle.Year} (${vehicle.ID})`
        )}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 text-center bg-action text-onaction text-sm font-bold py-2.5 rounded-lg hover:opacity-85 transition min-h-[44px] flex items-center justify-center gap-1.5"
      >
        <MessageCircle size={15} /> WhatsApp
      </a>
    </div>
  );
}