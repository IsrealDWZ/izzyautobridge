import { Car } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import BrandMarquee from '../components/BrandMarquee';
import FilterSidebar from '../components/FilterSidebar';
import InventorySearch from '../components/InventorySearch';
import VehicleGrid from '../components/VehicleGrid';
import vehicles from '../data/vehicles.json';
import { useAppStore } from '../store/useAppStore';
import { WHATSAPP_NUMBER } from '../utils/constants';
import { filterVehicles } from '../utils/filterVehicles';

export default function InventoryPage() {
  const { filters } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Browse Inventory — IzzyAutoBridge Ghana';
  }, []);

  const matchingVehicles = useMemo(
    () => filterVehicles(vehicles, filters, searchQuery),
    [filters, searchQuery]
  );

  return (
    <>
      <header className="rounded-2xl bg-secondary text-onsecondary p-8 sm:p-10 mb-8 overflow-hidden">
        <div className="inline-flex items-center gap-2 chip-badge px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
          <Car size={16} aria-hidden="true" /> Inventory
        </div>
        <div className="mb-5">
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Browse {matchingVehicles.length} of {vehicles.length} inspected vehicles
          </h1>
          {matchingVehicles.length !== vehicles.length && (
            <p className="text-sm text-onsecondary-muted mt-1">
              {matchingVehicles.length} of {vehicles.length} vehicles match your search and filters
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

      <div className="mb-6">
        <InventorySearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <FilterSidebar vehicles={vehicles} />
        <div className="flex-1 min-w-0 w-full">
          <VehicleGrid
            vehicles={vehicles}
            searchQuery={searchQuery}
            whatsappNumber={WHATSAPP_NUMBER}
          />
        </div>
      </div>
    </>
  );
}
