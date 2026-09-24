import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, ChevronLeft, ChevronRight } from 'lucide-react';

import { useAppStore } from '../store/useAppStore';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function CompareModal({ vehicles, _whatsappNumber = WHATSAPP_NUMBER }) {
  const { compareSelection, clearCompare } = useAppStore();
  const isOpen = compareSelection.length === 2;
  const rows = compareSelection.map((id) => vehicles.find((v) => v.ID === id)).filter(Boolean);

  const fields = [
    ['Brand', 'Brand'], ['Model', 'Model'], ['Year', 'Year'], ['Variant', 'Variant'],
    ['Fuel', 'Fuel_Type'], ['Body', 'Body_Type'], ['Mileage', (v) => `${v.Mileage_km.toLocaleString()} km`],
    ['Price', (v) => `GH₵${v.Price_GHS.toLocaleString()}`],
  ];

  if (!isOpen || rows.length < 2) return null;
  const [a, b] = rows;
  const diff = Math.abs(a.Price_GHS - b.Price_GHS);
  const cheaper = a.Price_GHS < b.Price_GHS ? a : b;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={clearCompare}
      >
        <motion.div
          className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[var(--color-container)] border border-[var(--color-border)] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg)]/80 backdrop-blur-sm z-10">
            <h3 className="font-display text-lg font-bold text-white">Compare Vehicles</h3>
            <motion.button
              onClick={clearCompare}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 min-h-[44px] min-w-[44px] text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-hover)] rounded-xl transition-all"
            >
              <X size={24} strokeWidth={2} />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="m-4 sm:m-5"
          >
            <div className="bg-gradient-to-r from-[var(--color-accent-dim)] to-[var(--color-accent)] text-[var(--color-bg)] rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2">
              <Scale size={16} strokeWidth={2} />
              <span>Price difference: GH₵{diff.toLocaleString()}</span>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
              <span>{cheaper.Brand} {cheaper.Model} is cheaper</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-4 sm:px-5 overflow-x-auto"
          >
            <table className="w-full text-sm min-w-[500px]">
              <tbody>
                {fields.map(([label, accessor], i) => (
                  <motion.tr
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] transition-colors"
                  >
                    <th className="text-left p-3 text-[var(--color-text-muted)] font-medium w-24 whitespace-nowrap">{label}</th>
                    <td className="p-3 text-white font-medium">{typeof accessor === 'function' ? accessor(a) : a[accessor]}</td>
                    <td className="p-3 text-white font-medium">{typeof accessor === 'function' ? accessor(b) : b[accessor]}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 gap-3 p-4 sm:p-5 border-t border-[var(--color-border)]"
          >
            {[a, b].map((v) => (
              <motion.a
                key={v.ID}
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi, I'm interested in ${v.Brand} ${v.Model} ${v.Year}`
                )}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-[var(--color-whatsapp)] text-white text-sm font-semibold py-3 rounded-xl hover:brightness-110 transition-all min-h-[48px]"
                style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)' }}
              >
                <MessageSquare size={16} strokeWidth={2.5} />
                <span className="hidden sm:inline">Inquire</span>
                <span className="sm:hidden">💬</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Icons
import { MessageSquare } from 'lucide-react';