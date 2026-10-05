import { Car } from 'lucide-react';
import { useEffect } from 'react';

import BrandMarquee from '../components/BrandMarquee';
import FilterSidebar from '../components/FilterSidebar';
import VehicleGrid from '../components/VehicleGrid';
import vehicles from '../data/vehicles.json';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function InventoryPage() {
  useEffect(() => {
    document.title = 'Browse Inventory — IzzyAutoBridge Ghana';
  }, []);

  return (
    <>
      <header className="rounded-2xl bg-secondary text-onsecondary p-8 sm:p-10 mb-8 overflow-hidden">
        <div className="inline-flex items-center gap-2 chip-badge px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
          <Car size={16} aria-hidden="true" /> Inventory
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
          Browse {vehicles.length} inspected vehicles
        </h1>
        <p className="mt-3 text-onsecondary/75 max-w-2xl">
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
          <VehicleGrid vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
        </div>
      </div>
    </>
  );
}
