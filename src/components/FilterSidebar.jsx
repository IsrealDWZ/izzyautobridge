import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function FilterSidebar({ vehicles }) {
  const { filters, setFilter, setFilters, resetFilters } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const brands = useMemo(() => [...new Set(vehicles.map(v => v.Brand))].sort(), [vehicles]);
  const fuelTypes = useMemo(() => [...new Set(vehicles.map(v => v.Fuel_Type))].sort(), [vehicles]);
  const bodyTypes = useMemo(() => [...new Set(vehicles.map(v => v.Body_Type))].sort(), [vehicles]);
  const statuses = useMemo(() => [...new Set(vehicles.map(v => v.Status))].sort(), [vehicles]);

  const priceMin = useMemo(() => Math.min(...vehicles.map(v => v.Price_GHS)), [vehicles]);
  const priceMax = useMemo(() => Math.max(...vehicles.map(v => v.Price_GHS)), [vehicles]);
  const yearMin = useMemo(() => Math.min(...vehicles.map(v => v.Year)), [vehicles]);
  const yearMax = useMemo(() => Math.max(...vehicles.map(v => v.Year)), [vehicles]);

  useEffect(() => {
    setFilters({ priceRange: [priceMin, priceMax], yearRange: [yearMin, yearMax] });
  }, [priceMin, priceMax, yearMin, yearMax, setFilters]);

  const activeCount = [
    filters.brands.length,
    filters.fuel.length,
    filters.body.length,
    filters.status.length,
    filters.priceRange[0] !== priceMin || filters.priceRange[1] !== priceMax,
    filters.yearRange[0] !== yearMin || filters.yearRange[1] !== yearMax,
  ].filter(Boolean).length;

  const handleReset = () => resetFilters({ priceRange: [priceMin, priceMax], yearRange: [yearMin, yearMax] });

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold">🔍 Filters</h3>
            <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gold">Reset all</button>
          </div>

          <FilterGroup label="Brand" items={brands} selected={filters.brands} onChange={(v) => setFilter('brands', v)} />
          <FilterGroup label="Fuel Type" items={fuelTypes} selected={filters.fuel} onChange={(v) => setFilter('fuel', v)} />
          <FilterGroup label="Body Type" items={bodyTypes} selected={filters.body} onChange={(v) => setFilter('body', v)} />
          <FilterGroup label="Status" items={statuses} selected={filters.status} onChange={(v) => setFilter('status', v)} />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">💰 Price Range (GHS)</label>
            <PriceRangeSlider
              min={priceMin} max={priceMax}
              value={filters.priceRange}
              onChange={(v) => setFilter('priceRange', v)}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
            <PriceRangeSlider
              min={yearMin} max={yearMax}
              value={filters.yearRange}
              onChange={(v) => setFilter('yearRange', v)}
            />
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-navy text-white rounded-full px-5 py-3 text-sm font-semibold shadow-lg flex items-center gap-2"
      >
        <Filter size={16} /> Filters {activeCount > 0 && (
          <span className="bg-gold text-navy text-xs font-bold px-1.5 py-0.5 rounded-full">{activeCount}</span>
        )}
      </button>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/40 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white dark:bg-navy z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/10">
                <h3 className="font-display font-bold">🔍 Filters</h3>
                <button onClick={() => setMobileOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-auto p-5 space-y-6">
                <FilterGroup label="Brand" items={brands} selected={filters.brands} onChange={(v) => setFilter('brands', v)} />
                <FilterGroup label="Fuel Type" items={fuelTypes} selected={filters.fuel} onChange={(v) => setFilter('fuel', v)} />
                <FilterGroup label="Body Type" items={bodyTypes} selected={filters.body} onChange={(v) => setFilter('body', v)} />
                <FilterGroup label="Status" items={statuses} selected={filters.status} onChange={(v) => setFilter('status', v)} />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">💰 Price Range (GHS)</label>
                  <PriceRangeSlider
                    min={priceMin} max={priceMax}
                    value={filters.priceRange}
                    onChange={(v) => setFilter('priceRange', v)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                  <PriceRangeSlider
                    min={yearMin} max={yearMax}
                    value={filters.yearRange}
                    onChange={(v) => setFilter('yearRange', v)}
                  />
                </div>

                <button onClick={handleReset} className="w-full text-center text-xs text-gray-400 py-2">Reset all filters</button>
              </div>

              <div className="p-5 border-t border-gray-100 dark:border-white/10">
                <button onClick={() => setMobileOpen(false)} className="w-full bg-navy text-white py-3 rounded-lg font-semibold">
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterGroup({ label, items, selected, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={(e) => onChange(e.target.checked ? [...selected, item] : selected.filter(x => x !== item))}
              className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function PriceRangeSlider({ min, max, value, onChange }) {
  const [low, high] = value;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>GH₵{low.toLocaleString()}</span>
        <span>GH₵{high.toLocaleString()}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={low}
        onChange={(e) => {
          const newLow = parseInt(e.target.value);
          if (newLow <= high) onChange([newLow, high]);
        }}
        className="w-full h-2 bg-gray-200 dark:bg-navy-deep rounded-lg appearance-none accent-gold"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={high}
        onChange={(e) => {
          const newHigh = parseInt(e.target.value);
          if (newHigh >= low) onChange([low, newHigh]);
        }}
        className="w-full h-2 bg-gray-200 dark:bg-navy-deep rounded-lg appearance-none accent-gold"
      />
    </div>
  );
}