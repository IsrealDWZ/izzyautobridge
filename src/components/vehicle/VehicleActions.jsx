import { motion } from 'framer-motion';
import { Heart, Scale, MessageSquare } from 'lucide-react';

import { WHATSAPP_NUMBER } from '../../utils/constants';

export function VehicleActions({ vehicle, isComparing, isFavorite, onToggleCompare, onToggleFavorite }) {
  return (
    <motion.div
      className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
    >
      <motion.button
        onClick={onToggleCompare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition-all duration-200 min-h-[44px] group ${
          isComparing
            ? 'bg-[var(--color-accent-glow)] border-[var(--color-accent-dim)] text-[var(--color-accent)]'
            : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-dim)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-glow)]'
        }`}
        aria-label={isComparing ? 'Remove from comparison' : 'Add to comparison'}
      >
        <motion.span
          animate={{ opacity: isComparing ? 1 : 0, scale: isComparing ? 1 : 0.5, rotate: isComparing ? 0 : -90 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-block"
        >
          <Scale size={13} strokeWidth={2.5} />
        </motion.span>
        <span className="hidden sm:inline font-medium">Compare</span>
      </motion.button>

      <motion.button
        onClick={onToggleFavorite}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2.5 rounded-xl border border-[var(--color-border)] min-h-[44px] min-w-[44px] group transition-all duration-200 hover:border-[var(--color-danger)] hover:bg-[rgba(224,75,75,0.1)]"
        aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      >
        <motion.span
          animate={{ scale: isFavorite ? 1.15 : 1, rotate: isFavorite ? 10 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Heart
            size={20}
            strokeWidth={2.5}
            className={`transition-all duration-300 ${
              isFavorite
                ? 'fill-[var(--color-danger)] stroke-[var(--color-danger)]'
                : 'fill-none stroke-[var(--color-text-muted)] group-hover:stroke-[var(--color-danger)] group-hover:text-[var(--color-danger)]'
            }`}
          />
        </motion.span>
      </motion.button>

      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hi, I'm interested in ${vehicle.Brand} ${vehicle.Model} ${vehicle.Year} (${vehicle.ID})`
        )}`}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-whatsapp)] text-white text-sm font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all duration-200 min-h-[44px]"
        style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)' }}
      >
        <MessageSquare size={16} strokeWidth={2.5} />
        <span>WhatsApp</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  );
}