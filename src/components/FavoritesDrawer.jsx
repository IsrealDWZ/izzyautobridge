import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Trash2 } from 'lucide-react';
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
        className="fixed bottom-6 right-6 z-40 bg-navy text-white rounded-full px-5 py-3 text-sm font-semibold shadow-lg flex items-center gap-2"
      >
        <Heart size={16} fill="currentColor" /> {favorites.length} Saved
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/40 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: 360 }} animate={{ x: 0 }} exit={{ x: 360 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-[340px] bg-white dark:bg-navy z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/10">
                <h3 className="font-display font-bold">Saved vehicles</h3>
                <button onClick={() => setOpen(false)}><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-auto p-5 space-y-2">
                {favVehicles.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Nothing saved yet — tap the heart on a car to add it here.
                  </p>
                )}
                {favVehicles.map((v) => (
                  <div key={v.ID} className="flex items-center justify-between bg-gray-50 dark:bg-navy-deep rounded-lg p-3">
                    <div>
                      <p className="text-sm font-semibold">{v.Brand} {v.Model} {v.Year}</p>
                      <p className="text-xs text-gray-500">GH₵{v.Price_GHS.toLocaleString()}</p>
                    </div>
                    <button onClick={() => toggleFavorite(v.ID)} aria-label="Remove">
                      <Trash2 size={16} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-gray-100 dark:border-white/10 space-y-2">
                <a
                  href={sendAllLink} target="_blank" rel="noreferrer"
                  className="block text-center bg-whatsapp text-white text-sm font-semibold py-2.5 rounded-lg"
                >
                  💬 Send list on WhatsApp
                </a>
                {favVehicles.length > 0 && (
                  <button
                    onClick={clearFavorites}
                    className="w-full text-center text-xs text-gray-400 py-1"
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
