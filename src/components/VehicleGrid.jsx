import { useMemo } from 'react';
import VehicleCard from './VehicleCard';
import { useAppStore } from '../store/useAppStore';

export default function VehicleGrid({ vehicles, whatsappNumber }) {
  const { filters } = useAppStore();

  // Direct port of the Streamlit filtering logic (brand/fuel/body/status/price/year),
  // just running client-side against the in-memory array instead of a pandas DataFrame.
  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (filters.brands.length && !filters.brands.includes(v.Brand)) return false;
      if (filters.fuel.length && !filters.fuel.includes(v.Fuel_Type)) return false;
      if (filters.body.length && !filters.body.includes(v.Body_Type)) return false;
      if (filters.status.length && !filters.status.includes(v.Status)) return false;
      if (v.Price_GHS < filters.priceRange[0] || v.Price_GHS > filters.priceRange[1]) return false;
      if (v.Year < filters.yearRange[0] || v.Year > filters.yearRange[1]) return false;
      return true;
    });
  }, [vehicles, filters]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {vehicles.length} vehicles
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((v) => (
          <VehicleCard key={v.ID} vehicle={v} whatsappNumber={whatsappNumber} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 sm:py-20 border border-dashed border-gray-200 rounded-2xl">
          <p className="font-semibold">No vehicles match those filters</p>
          <p className="text-sm text-gray-500 mt-1">Try widening your price range or clearing a filter.</p>
        </div>
      )}
    </section>
  );
}