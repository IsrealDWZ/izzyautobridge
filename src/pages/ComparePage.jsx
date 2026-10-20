import { motion } from 'framer-motion';
import { ArrowLeft, Car, MessageCircle, X, Ship, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppStore } from '../store/useAppStore';
import vehicles from '../data/vehicles.json';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function ComparePage() {
  const { compareSelection, toggleCompare, clearCompare, favorites, toggleFavorite } = useAppStore();
  const rows = compareSelection.map((id) => vehicles.find((v) => v.ID === id)).filter(Boolean);

  const fields = [
    ['Brand', 'Brand'],
    ['Model', 'Model'],
    ['Year', 'Year'],
    ['Variant', 'Variant'],
    ['Fuel type', 'Fuel_Type'],
    ['Body type', 'Body_Type'],
    ['Drive', 'Drive'],
    ['Color', 'Color'],
    ['Mileage', (v) => `${v.Mileage_km ? v.Mileage_km.toLocaleString() : '—'} km`],
    ['Status', 'Status'],
    ['Price', (v) => `GH₵${v.Price_GHS.toLocaleString()}`],
  ];

  if (rows.length < 2) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto py-20 sm:py-28 text-center"
      >
        <div className="w-16 h-16 bg-action/10 text-action rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={32} />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Compare vehicles</h2>
        <p className="text-muted mb-6">
          Select two vehicles on the inventory page to compare them side by side.
        </p>
        <Link
          to="/inventory"
          className="inline-flex items-center gap-2 bg-action text-onaction text-sm font-bold px-6 py-3 rounded-lg hover:opacity-85 transition min-h-[44px]"
        >
          <ArrowLeft size={16} /> Browse inventory
        </Link>
      </motion.div>
    );
  }

  const [a, b] = rows;
  const diff = Math.abs(a.Price_GHS - b.Price_GHS);
  const cheaper = a.Price_GHS < b.Price_GHS ? a : b;

  useEffect(() => {
    document.title = `Compare ${a.Brand} ${a.Model} vs ${b.Brand} ${b.Model} — IzzyAutoBridge Ghana`;
  }, [a, b]);

  const waText = encodeURIComponent(
    `Hi, I'm interested in comparing ${a.Brand} ${a.Model} ${a.Year} vs ${b.Brand} ${b.Model} ${b.Year}. Can you send me more details and landed-cost breakdown for both?`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-8 sm:py-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to inventory
        </Link>
        <button
          onClick={clearCompare}
          className="text-sm font-medium text-muted hover:text-action transition-colors min-h-[44px] px-3"
        >
          <X size={16} className="mr-2" aria-hidden="true" /> Clear comparison
        </button>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left">
        Compare vehicles
      </h1>
      <p className="text-muted mb-8 text-center sm:text-left">
        Side-by-side comparison to help you choose.
      </p>

      {/* Price difference callout */}
      <div className="mb-8 p-4 sm:p-6 bg-action/10 border border-action/20 rounded-lg text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm font-semibold text-main">
          <Ship size={14} className="text-action shrink-0" aria-hidden="true" />
          Price difference: <span className="font-bold">GH₵{diff.toLocaleString()}</span>
          — <span className="font-bold">{cheaper.Brand} {cheaper.Model}</span> is cheaper
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-subtle">
              <th className="p-4 sm:p-6 text-sm font-medium text-muted w-24 whitespace-nowrap">
                Feature
              </th>
              <th className="p-4 sm:p-6 text-sm font-medium text-muted text-center">
                {a.Brand} {a.Model} {a.Year}
              </th>
              <th className="p-4 sm:p-6 text-sm font-medium text-muted text-center">
                {b.Brand} {b.Model} {b.Year}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {fields.map(([label, accessor]) => (
              <tr key={label} className="hover:bg-action/5 transition-colors">
                <td className="p-4 sm:p-6 text-sm text-muted font-medium w-24 whitespace-nowrap">
                  {label}
                </td>
                <td className="p-4 sm:p-6 text-sm text-center">
                  {typeof accessor === 'function' ? accessor(a) : a[accessor]}
                </td>
                <td className="p-4 sm:p-6 text-sm text-center">
                  {typeof accessor === 'function' ? accessor(b) : b[accessor]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WhatsApp CTAs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[a, b].map((v) => (
          <a
            key={v.ID}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hi, I'm interested in ${v.Brand} ${v.Model} ${v.Year} (${v.ID})`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-action text-onaction text-sm font-bold px-6 py-4 rounded-lg hover:opacity-85 transition min-h-[56px]"
          >
            <MessageCircle size={18} />
            Enquire on WhatsApp
          </a>
        ))}
      </div>

      {/* Remove from comparison */}
      <div className="flex gap-3">
        {[a, b].map((v) => (
          <button
            key={v.ID}
            onClick={() => toggleCompare(v.ID)}
            className="flex items-center gap-2 text-sm font-medium text-muted hover:text-action transition-colors px-4 py-2 min-h-[44px]"
          >
            <X size={16} aria-hidden="true" />
            Remove {v.Brand} {v.Model}
          </button>
        ))}
      </div>
    </motion.div>
  );
}