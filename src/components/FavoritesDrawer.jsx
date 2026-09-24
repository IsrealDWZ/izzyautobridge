import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Trash2, Send } from 'lucide-react';
import { useState } from 'react';

import { useAppStore } from '../store/useAppStore';

export default function FavoritesDrawer({ _vehicles, whatsappNumber }) {
  const [open, setOpen] = useState(false);
  const { favorites, toggleFavorite, clearFavorites } = useAppStore();
  const favVehicles = favorites.map((id) => _vehicles.find((v) => v.ID === id)).filter(Boolean);

  const sendAllLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in: ${favVehicles.map((v) => `${v.Brand} ${v.Model} ${v.Year}`).join(', ')}`
  )}`;

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 bg-[var(--color-container)] border border-[var(--color-border)] text-white rounded-full px-5 py-3 text-sm font-semibold shadow-xl flex items-center gap-2 min-h-[48px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          animate={{ scale: favorites.length > 0 ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart size={16} fill="currentColor" strokeWidth={2} />
        </motion.span>
        <span className="hidden sm:inline">
          {favorites.length} Saved
        </span>
        {favorites.length > 0 && (
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-[var(--color-accent)] text-[var(--color-bg)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {favorites.length}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[var(--color-overlay)] z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: 360 }}
              animate={{ x: 0 }}
              exit={{ x: 360 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[360px] bg-[var(--color-bg)] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--color-border)]">
                <h3 className="font-display font-bold text-white">Saved Vehicles</h3>
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 min-h-[44px] min-w-[44px] text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-hover)] rounded-xl transition-all"
                >
                  <X size={24} strokeWidth={2} />
                </motion.button>
              </div>

              <motion.div
                className="flex-1 overflow-auto p-4 sm:p-5 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {favVehicles.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 text-[var(--color-text-muted)]"
                  >
                    <Heart size={48} className="mx-auto mb-3 text-[var(--color-border)] stroke-[var(--color-border)]" strokeWidth={1.5} />
                    <p className="text-sm">Nothing saved yet</p>
                    <p className="text-xs mt-1">Tap the heart on a car to add it here</p>
                  </motion.div>
                )}
                {favVehicles.map((v, i) => (
                  <motion.div
                    key={v.ID}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="flex items-center justify-between bg-[var(--color-container)] border border-[var(--color-border)] rounded-xl p-3 hover:border-[var(--color-accent-dim)] hover:shadow-lg transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{v.Brand} {v.Model} {v.Year}</p>
                      <p className="text-xs text-[var(--color-text-muted)] font-mono">GH₵{v.Price_GHS.toLocaleString()}</p>
                    </div>
                    <motion.button
                      onClick={() => toggleFavorite(v.ID)}
                      whileHover={{ scale: 1.15, rotate: -10 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[rgba(224,75,75,0.1)] rounded-lg transition-all min-h-[40px] min-w-[40px]"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="p-4 sm:p-5 border-t border-[var(--color-border)] space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.a
                  href={sendAllLink}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-[var(--color-whatsapp)] text-white text-sm font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all min-h-[48px]"
                  style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)' }}
                >
                  <Send size={16} strokeWidth={2.5} />
                  Send list on WhatsApp
                </motion.a>
                {favVehicles.length > 0 && (
                  <motion.button
                    onClick={clearFavorites}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-danger)] py-2 min-h-[48px]"
                  >
                    <Trash2 size={16} strokeWidth={2} />
                    Clear all
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}