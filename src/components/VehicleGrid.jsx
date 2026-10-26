/* eslint-disable import/order */
import { useMemo, useCallback } from 'react';

import { useAppStore } from '../store/useAppStore';
import { filterVehicles } from '../utils/filterVehicles';
import VehicleCard from './VehicleCard';

const CATEGORIES = ['EV', 'Hybrid', 'Fuel', 'Bus', 'Heavy', 'Other'];

function VehicleCardWrapper({ vehicle, onToggleCompare, onToggleFavorite }) {
  return (
    <VehicleCard
      vehicle={vehicle}
      onToggleCompare={onToggleCompare}
      onToggleFavorite={onToggleFavorite}
    />
  );
}

export default function VehicleGrid({ vehicles, searchQuery = '', _whatsappNumber }) {
  const { filters, setFilter, toggleCompare, toggleFavorite } = useAppStore();

  const filtered = useMemo(
    () => filterVehicles(vehicles, filters, searchQuery),
    [vehicles, filters, searchQuery]
  );

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
        <p className="text-sm text-muted" aria-live="polite">
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
                : 'bg-accent-surface text-main border-subtle hover:bg-accent-hover/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((vehicle) => (
            <VehicleCardWrapper
              key={vehicle.ID}
              vehicle={vehicle}
              onToggleCompare={toggleCompare}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-20 border border-dashed border-subtle rounded-2xl">
          <p className="font-semibold">
            {searchQuery ? `No vehicles match “${searchQuery}”` : 'No vehicles match those filters'}
          </p>
          <p className="text-sm text-muted mt-1">
            {searchQuery
              ? 'Try a different keyword or clear the search.'
              : 'Try widening your price range or clearing a filter.'}
          </p>
        </div>
      )}
    </section>
  );
}