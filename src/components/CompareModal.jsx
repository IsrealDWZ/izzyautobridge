import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function CompareModal({ vehicles, whatsappNumber }) {
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4"
        onClick={clearCompare}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-navy rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto"
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/10 sticky top-0 bg-white dark:bg-navy">
            <h3 className="font-display text-lg font-bold">Compare vehicles</h3>
            <button onClick={clearCompare}><X size={20} /></button>
          </div>

          <div className="m-5 bg-gold/15 text-navy dark:text-gold rounded-lg px-4 py-3 text-sm font-semibold">
            Price difference: GH₵{diff.toLocaleString()} — {cheaper.Brand} {cheaper.Model} is cheaper
          </div>

          <table className="w-full text-sm">
            <tbody>
              {fields.map(([label, accessor]) => (
                <tr key={label} className="border-b border-gray-100 dark:border-white/10">
                  <th className="text-left p-3 text-gray-500 font-medium w-24">{label}</th>
                  <td className="p-3">{typeof accessor === 'function' ? accessor(a) : a[accessor]}</td>
                  <td className="p-3">{typeof accessor === 'function' ? accessor(b) : b[accessor]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-3 p-5">
            {[a, b].map((v) => (
              <a
                key={v.ID}
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hi, I'm interested in ${v.Brand} ${v.Model} ${v.Year}`
                )}`}
                target="_blank" rel="noreferrer"
                className="text-center bg-whatsapp text-white text-sm font-semibold py-2.5 rounded-lg"
              >
                💬 {v.ID}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
