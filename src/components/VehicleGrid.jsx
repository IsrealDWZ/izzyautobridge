import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AutoSizer } from 'react-virtualized-auto-sizer';
import { Grid as FixedSizeGrid } from 'react-window';

import { useAppStore } from '../store/useAppStore';

import VehicleCard from './VehicleCard';

const CATEGORIES = [
  { id: 'EV', label: '⚡ Electric', color: 'success' },
  { id: 'Hybrid', label: '⛽ Hybrid', color: 'warning' },
  { id: 'Fuel', label: '⛽ Petrol/Diesel', color: 'info' },
  { id: 'Bus', label: '🚌 Bus/Van', color: 'accent' },
  { id: 'Heavy', label: '🚛 Heavy Duty', color: 'danger' },
  { id: 'Other', label: '🛵 Other', color: 'info' },
];

const CARD_WIDTH = 340;
const CARD_HEIGHT = 500;

function VehicleCardWrapper({ vehicle }) {
  return <VehicleCard vehicle={vehicle} />;
}

const categoryColors = {
  success: 'bg-[rgba(0,200,150,0.15)] text-[var(--color-success)] border-[var(--color-success-dim)]',
  warning: 'bg-[rgba(245,166,35,0.15)] text-[var(--color-warning)] border-[var(--color-warning)]',
  info: 'bg-[rgba(45,156,219,0.15)] text-[var(--color-info)] border-[var(--color-info)]',
  accent: 'bg-[var(--color-accent-glow)] text-[var(--color-accent)] border-[var(--color-accent-dim)]',
  danger: 'bg-[rgba(224,75,75,0.15)] text-[var(--color-danger)] border-[var(--color-danger)]',
};

export default function VehicleGrid({ vehicles, _whatsappNumber }) {
  const { filters, setFilter } = useAppStore();

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (filters.brands.length && !filters.brands.includes(v.Brand)) return false;
      if (filters.fuel.length && !filters.fuel.includes(v.Fuel_Type)) return false;
      if (filters.body.length && !filters.body.includes(v.Body_Type)) return false;
      if (filters.status.length && !filters.status.includes(v.Status)) return false;
      if (filters.category.length && !filters.category.includes(v.Category)) return false;
      if (v.Price_GHS < filters.priceRange[0] || v.Price_GHS > filters.priceRange[1]) return false;
      if (v.Year < filters.yearRange[0] || v.Year > filters.yearRange[1]) return false;
      return true;
    });
  }, [vehicles, filters]);

  const handleCategoryToggle = useCallback((cat) => {
    setFilter('category', filters.category.includes(cat)
      ? filters.category.filter(c => c !== cat)
      : [...filters.category, cat]);
  }, [filters.category, setFilter]);

  const CellRenderer = useCallback(({ index, style }) => {
    const vehicle = filtered[index];
    if (!vehicle) return null;
    return (
      <div style={style}>
        <VehicleCardWrapper vehicle={filtered[index]} />
      </div>
    );
  }, [filtered]);

  return (
    <section className="container-custom section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-6">
          <motion.p
            className="text-sm text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Showing <span className="font-bold text-white">{filtered.length}</span> of <span className="font-bold text-[var(--color-text-muted)]">{vehicles.length}</span> vehicles
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => handleCategoryToggle(cat.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`badge px-4 py-2 text-sm transition-all duration-300 ${
                filters.category.includes(cat.id)
                  ? categoryColors[cat.color]
                  : 'badge-neutral hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + CATEGORIES.indexOf(cat) * 0.05 }}
            >
              {cat.label}
              {filters.category.includes(cat.id) && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                  className="ml-1"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {filtered.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <AutoSizer>
            {({ width, height }) => {
              const columnCount = Math.max(1, Math.floor(width / CARD_WIDTH));
              const rowCount = Math.ceil(filtered.length / columnCount);

              return (
                <FixedSizeGrid
                  columnCount={columnCount}
                  rowCount={rowCount}
                  columnWidth={CARD_WIDTH}
                  rowHeight={CARD_HEIGHT}
                  width={width}
                  height={height}
                  itemData={filtered}
                  itemKey={({ index }) => filtered[index].ID}
                  className="vehicle-grid"
                  overscanColumnCount={1}
                  overscanRowCount={1}
                >
                  {CellRenderer}
                </FixedSizeGrid>
              );
            }}
          </AutoSizer>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 sm:py-28 border-2 border-dashed border-[var(--color-border)] rounded-3xl bg-[var(--color-bg-elevated)]/50"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-4 inline-block"
          >
            🔍
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-xl font-semibold text-white mb-2"
          >
            No vehicles match those filters
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-muted)] max-w-xs mx-auto"
          >
            Try widening your price range, adjusting the year, or clearing a filter.
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}