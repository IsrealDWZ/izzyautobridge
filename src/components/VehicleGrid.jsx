/* eslint-disable import/order */
import { useMemo, useCallback } from 'react';
import { Grid as FixedSizeGrid } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';

import { useAppStore } from '../store/useAppStore';
import VehicleCard from './VehicleCard';

const CATEGORIES = ['EV', 'Hybrid', 'Fuel', 'Bus', 'Heavy', 'Other'];

const CARD_WIDTH = 340; // Approximate card width
const CARD_HEIGHT = 500; // Approximate card height

function VehicleCardWrapper({ vehicle }) {
  return <VehicleCard vehicle={vehicle} />;
}

export default function VehicleGrid({ vehicles, _whatsappNumber }) {
  const { filters, setFilter } = useAppStore();

  // Direct port of the Streamlit filtering logic (brand/fuel/body/status/price/year),
  // just running client-side against the in-memory array instead of a pandas DataFrame.
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

  const handleCategoryToggleWrapper = useCallback((cat) => {
    handleCategoryToggle(cat);
  }, [handleCategoryToggle]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {vehicles.length} vehicles
        </p>
      </div>
      
      {/* Category filter chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryToggleWrapper(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
              filters.category.includes(cat)
                ? 'bg-gold/15 border-gold text-navy dark:bg-gold/10 dark:text-gold'
                : 'border-gray-200 dark:border-white/10 text-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
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
              >
                {CellRenderer}
              </FixedSizeGrid>
            );
          }}
        </AutoSizer>
      ) : (
        <div className="text-center py-12 sm:py-20 border border-dashed border-gray-200 rounded-2xl">
          <p className="font-semibold">No vehicles match those filters</p>
          <p className="text-sm text-gray-500 mt-1">Try widening your price range or clearing a filter.</p>
        </div>
      )}
    </section>
  );
}