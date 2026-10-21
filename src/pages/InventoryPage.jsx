import { Car } from 'lucide-react';
import { useMemo, useEffect } from 'react';

import BrandMarquee from '../components/BrandMarquee';
import FilterSidebar from '../components/FilterSidebar';
import VehicleGrid from '../components/VehicleGrid';
import vehicles from '../data/vehicles.json';
import { WHATSAPP_NUMBER } from '../utils/constants';
import { useAppStore } from '../store/useAppStore';

export default function InventoryPage() {
  const { filters } = useAppStore();
  useEffect(() => {
    document.title = 'Browse Inventory — IzzyAutoBridge Ghana';
  }, []);

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

  return (
    <>
      <header className="rounded-2xl bg-secondary text-onsecondary p-8 sm:p-10 mb-8 overflow-hidden">
        <div className="inline-flex items-center gap-2 chip-badge px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
          <Car size={16} aria-hidden="true" /> Inventory
        </div>
        <div className="mb-5">
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Browse {filtered.length} of {vehicles.length} inspected vehicles
          </h1>
          {filtered.length !== vehicles.length && (
            <p className="text-sm text-onsecondary-muted mt-1">
              {filtered.length} of {vehicles.length} vehicles match your filters
            </p>
          )}
        </div>
        <p className="text-onsecondary-muted max-w-2xl">
          Live stock from our China partners — filter by brand, price and year.
          Free shipping to Tema included in every landed price.
        </p>
        <div className="-mx-8 sm:-mx-10 mt-7">
          <BrandMarquee />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <FilterSidebar vehicles={vehicles} />
        <div className="flex-1 min-w-0 w-full">
          <VehicleGrid vehicles={filtered} whatsappNumber={WHATSAPP_NUMBER} />
        </div>
      </div>
    </>
  );
}
