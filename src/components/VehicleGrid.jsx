/* eslint-disable import/order */
import { useMemo, useCallback } from 'react';

import { useAppStore } from '../store/useAppStore';
import VehicleCard from './VehicleCard';

const CATEGORIES = ['EV', 'Hybrid', 'Fuel', 'Bus', 'Heavy', 'Other'];

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

  const handleCategoryToggleWrapper = useCallback((cat) => {
    handleCategoryToggle(cat);
  }, [handleCategoryToggle]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">
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
                ? 'pill-active font-semibold'
                : 'bg-accent-surface text-navy border-subtle hover:bg-accent-hover/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((vehicle) => (
            <VehicleCardWrapper key={vehicle.ID} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-20 border border-dashed border-subtle rounded-2xl">
          <p className="font-semibold">No vehicles match those filters</p>
          <p className="text-sm text-muted mt-1">Try widening your price range or clearing a filter.</p>
        </div>
      )}
    </section>
  );
}