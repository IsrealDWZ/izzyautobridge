import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Trash2, MessageCircle } from 'lucide-react';
import { useState } from 'react';

import { useAppStore } from '../store/useAppStore';

export default function FavoritesDrawer({ vehicles, whatsappNumber }) {
  const [open, setOpen] = useState(false);
  const { favorites, toggleFavorite, clearFavorites } = useAppStore();
  const favVehicles = favorites.map((id) => vehicles.find((v) => v.ID === id)).filter(Boolean);

  const sendAllLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in: ${favVehicles.map((v) => `${v.Brand} ${v.Model} ${v.Year}`).join(', ')}`
  )}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-secondary text-onsecondary rounded-full px-5 py-3 text-sm font-semibold shadow-lg flex items-center gap-2"
      >
        <Heart size={16} fill="currentColor" /> {favorites.length} Saved
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: 360 }} animate={{ x: 0 }} exit={{ x: 360 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-[340px] bg-card z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-subtle">
                <h3 className="font-display font-bold">Saved vehicles</h3>
                <button onClick={() => setOpen(false)}><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-auto p-5 space-y-2">
                {favVehicles.length === 0 && (
                  <p className="text-sm text-muted text-center py-8">
                    Nothing saved yet — tap the heart on a car to add it here.
                  </p>
                )}
                {favVehicles.map((v) => (
                  <div key={v.ID} className="flex items-center justify-between bg-primary border border-subtle rounded-lg p-3">
                    <div>
                      <p className="text-sm font-semibold">{v.Brand} {v.Model} {v.Year}</p>
                      <p className="text-xs text-muted">GH₵{v.Price_GHS.toLocaleString()}</p>
                    </div>
                    <button onClick={() => toggleFavorite(v.ID)} aria-label="Remove">
                      <Trash2 size={16} className="text-muted" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-subtle space-y-2">
                <a
                  href={sendAllLink} target="_blank" rel="noreferrer"
                  className="block text-center bg-action text-onaction text-sm font-bold py-2.5 rounded-lg hover:opacity-85 transition flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={15} /> Send list on WhatsApp
                </a>
                {favVehicles.length > 0 && (
                  <button
                    onClick={clearFavorites}
                    className="w-full text-center text-xs text-muted py-1 hover:text-main"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
