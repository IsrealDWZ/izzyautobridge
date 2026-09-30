import { Heart, Check } from 'lucide-react';

import { WHATSAPP_NUMBER } from '../../utils/constants';

export function VehicleActions({ vehicle, isComparing, isFavorite, onToggleCompare, onToggleFavorite }) {

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={onToggleCompare}
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2.5 rounded-lg border transition min-h-[44px] ${
          isComparing
            ? 'bg-gold/15 border-gold text-navy dark:text-gold'
            : 'border-gray-200 dark:border-white/10 text-gray-500'
        }`}
      >
        <Check size={14} className={isComparing ? 'opacity-100' : 'opacity-0'} />
        <span className="hidden sm:inline">Compare</span>
        <span className="sm:hidden" aria-label="Compare">⚖</span>
      </button>
      <button
        onClick={onToggleFavorite}
        className="p-2.5 rounded-lg border border-gray-200 dark:border-white/10 min-h-[44px] min-w-[44px]"
        aria-label="Save to favorites"
      >
        <Heart size={18} fill={isFavorite ? '#D9534F' : 'none'} stroke={isFavorite ? '#D9534F' : 'currentColor'} />
      </button>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hi, I'm interested in ${vehicle.Brand} ${vehicle.Model} ${vehicle.Year} (${vehicle.ID})`
        )}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 text-center bg-whatsapp text-white text-sm font-semibold py-2.5 rounded-lg hover:brightness-95 transition min-h-[44px] flex items-center justify-center"
      >
        💬 WhatsApp
      </a>
    </div>
  );
}