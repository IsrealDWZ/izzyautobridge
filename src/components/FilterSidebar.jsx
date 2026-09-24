import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronDown, SlidersHorizontal, Eraser } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

import { useAppStore } from '../store/useAppStore';
import { validatePriceRange, validateYearRange } from '../utils/validation';

function FilterGroup({ label, items, selected, onChange, icon: Icon }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      className="bg-[var(--color-container)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-[var(--color-bg-hover)] transition-colors"
        aria-expanded={expanded}
      >
        <label className="flex items-center gap-2 font-semibold text-white">
          <Icon size={16} className="text-[var(--color-accent)]" strokeWidth={2} />
          {label}
        </label>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-[var(--color-text-dim)]"
        >
          <ChevronDown size={16} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-[var(--color-border)]">
              {items.map((item) => (
                <motion.label
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 cursor-pointer min-h-[44px] p-2 rounded-xl hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={(e) => onChange(e.target.checked ? [...selected, item] : selected.filter(x => x !== item))}
                    className="w-5 h-5 accent-[var(--color-accent)] border-[var(--color-border)] rounded focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
                  />
                  <span className="text-sm text-[var(--color-text)] font-medium">{item}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PriceRangeSlider({ min, max, value, onChange, label, icon: Icon }) {
  const [low, high] = value;

  return (
    <motion.div
      className="bg-[var(--color-container)] border border-[var(--color-border)] rounded-2xl p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <label className="flex items-center gap-2 font-medium text-white mb-3">
        <Icon size={16} className="text-[var(--color-accent)]" strokeWidth={2} />
        {label}
      </label>
      <div className="space-y-3">
        <div className="flex justify-between text-xs font-mono text-[var(--color-accent)]">
          <span>GH₵{low.toLocaleString()}</span>
          <span>GH₵{high.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={min}
            max={max}
            value={low}
            onChange={(e) => {
              const newLow = parseInt(e.target.value);
              if (newLow <= high) onChange([newLow, high]);
            }}
            className="flex-1 h-2 bg-[var(--color-border)] rounded-lg appearance-none accent-[var(--color-accent)]"
            aria-label="Minimum price"
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
            className="flex-1 h-2 bg-[var(--color-border)] rounded-lg appearance-none accent-[var(--color-accent)]"
            aria-label="Maximum price"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function FilterSidebar({ _vehicles = [] }) {
  const { filters, setFilter, setFilters, resetFilters } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const brands = useMemo(() => [...new Set(_vehicles.map(v => v.Brand))].sort(), [_vehicles]);
  const fuelTypes = useMemo(() => [...new Set(_vehicles.map(v => v.Fuel_Type))].sort(), [_vehicles]);
  const bodyTypes = useMemo(() => [...new Set(_vehicles.map(v => v.Body_Type))].sort(), [_vehicles]);
  const statuses = useMemo(() => [...new Set(_vehicles.map(v => v.Status))].sort(), [_vehicles]);

  const priceMin = useMemo(() => Math.min(..._vehicles.map(v => v.Price_GHS)), [_vehicles]);
  const priceMax = useMemo(() => Math.max(..._vehicles.map(v => v.Price_GHS)), [_vehicles]);
  const yearMin = useMemo(() => Math.min(..._vehicles.map(v => v.Year)), [_vehicles]);
  const yearMax = useMemo(() => Math.max(..._vehicles.map(v => v.Year)), [_vehicles]);

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
    filters.category.length,
  ].filter(Boolean).length;

  const handleReset = () => resetFilters({ priceRange: [priceMin, priceMax], yearRange: [yearMin, yearMax] });

  const handlePriceChange = (newRange) => {
    const validated = validatePriceRange(newRange[0], newRange[1], priceMin, priceMax);
    if (validated) setFilter('priceRange', [validated.low, validated.high]);
  };

  const handleYearChange = (newRange) => {
    const validated = validateYearRange(newRange[0], newRange[1], yearMin, yearMax);
    if (validated) setFilter('yearRange', [validated.low, validated.high]);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <motion.div
          className="sticky top-24 space-y-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="flex items-center gap-2 font-display font-bold text-white">
              <SlidersHorizontal size={20} className="text-[var(--color-accent)]" strokeWidth={2} />
              Filters
              {activeCount > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                  className="badge badge-accent text-xs"
                >
                  {activeCount}
                </motion.span>
              )}
            </h3>
            {activeCount > 0 && (
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors min-h-[44px]"
              >
                <Eraser size={12} strokeWidth={2} />
                Reset all
              </motion.button>
            )}
          </motion.div>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <FilterGroup
              label="Brand"
              items={brands}
              selected={filters.brands}
              onChange={(v) => setFilter('brands', v)}
              icon={Car}
            />
            <FilterGroup
              label="Fuel Type"
              items={fuelTypes}
              selected={filters.fuel}
              onChange={(v) => setFilter('fuel', v)}
              icon={Fuel}
            />
            <FilterGroup
              label="Body Type"
              items={bodyTypes}
              selected={filters.body}
              onChange={(v) => setFilter('body', v)}
              icon={Car}
            />
            <FilterGroup
              label="Status"
              items={statuses}
              selected={filters.status}
              onChange={(v) => setFilter('status', v)}
              icon={CheckCircle}
            />
            <FilterGroup
              label="Category"
              items={['EV', 'Hybrid', 'Fuel', 'Bus', 'Heavy', 'Other']}
              selected={filters.category}
              onChange={(v) => setFilter('category', v)}
              icon={Zap}
            />

            <PriceRangeSlider
              min={priceMin} max={priceMax}
              value={filters.priceRange}
              onChange={handlePriceChange}
              label="Price Range (GHS)"
              icon={DollarSign}
            />

            <PriceRangeSlider
              min={yearMin} max={yearMax}
              value={filters.yearRange}
              onChange={handleYearChange}
              label="Year Range"
              icon={Calendar}
            />
          </motion.div>
        </motion.div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-24 left-6 z-40 bg-[var(--color-container)] border border-[var(--color-border)] text-white rounded-full px-5 py-3 text-sm font-semibold shadow-xl flex items-center gap-2 min-h-[48px]"
      >
        <Filter size={16} strokeWidth={2} />
        Filters {activeCount > 0 && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            className="badge badge-accent text-xs"
          >
            {activeCount}
          </motion.span>
        )}
      </button>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[var(--color-overlay-strong)] z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 h-[90vh] max-h-[90vh] bg-[var(--color-bg)] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--color-border)]">
                <h3 className="font-display font-bold text-white">Filters</h3>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 min-h-[44px] min-w-[44px] text-[var(--color-text-muted)] hover:text-white transition-colors"
                >
                  <X size={24} strokeWidth={2} />
                </motion.button>
              </div>

              <motion.div
                className="flex-1 overflow-auto p-4 sm:p-5 space-y-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FilterGroup
                  label="Brand"
                  items={brands}
                  selected={filters.brands}
                  onChange={(v) => setFilter('brands', v)}
                  icon={Car}
                />
                <FilterGroup
                  label="Fuel Type"
                  items={fuelTypes}
                  selected={filters.fuel}
                  onChange={(v) => setFilter('fuel', v)}
                  icon={Fuel}
                />
                <FilterGroup
                  label="Body Type"
                  items={bodyTypes}
                  selected={filters.body}
                  onChange={(v) => setFilter('body', v)}
                  icon={Car}
                />
                <FilterGroup
                  label="Status"
                  items={statuses}
                  selected={filters.status}
                  onChange={(v) => setFilter('status', v)}
                  icon={CheckCircle}
                />
                <FilterGroup
                  label="Category"
                  items={['EV', 'Hybrid', 'Fuel', 'Bus', 'Heavy', 'Other']}
                  selected={filters.category}
                  onChange={(v) => setFilter('category', v)}
                  icon={Zap}
                />

                <PriceRangeSlider
                  min={priceMin} max={priceMax}
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                  label="Price Range (GHS)"
                  icon={DollarSign}
                />

                <PriceRangeSlider
                  min={yearMin} max={yearMax}
                  value={filters.yearRange}
                  onChange={handleYearChange}
                  label="Year Range"
                  icon={Calendar}
                />

                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] py-3 min-h-[48px]"
                >
                  Reset all filters
                </motion.button>
              </motion.div>

              <div className="p-4 sm:p-5 border-t border-[var(--color-border)]">
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[var(--color-accent)] text-[var(--color-bg)] py-3 rounded-xl font-semibold min-h-[48px]"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Icons needed
import { Car, Fuel, CheckCircle, Zap, DollarSign, Calendar } from 'lucide-react';