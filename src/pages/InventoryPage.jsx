import { Car } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import BrandMarquee from '../components/BrandMarquee';
import EVCalculator from '../components/EVCalculator';
import ExchangeRateNote from '../components/ExchangeRateNote';
import FilterSidebar from '../components/FilterSidebar';
import InventorySearch from '../components/InventorySearch';
import ProcessSection from '../components/ProcessSection';
import Elf from '../components/season/Elf';
import FestiveTree from '../components/season/FestiveTree';
import Garland from '../components/season/Garland';
import Gift from '../components/season/Gift';
import SantaSleigh from '../components/season/SantaSleigh';
import SeasonSnow from '../components/season/SeasonSnow';
import Snowman from '../components/season/Snowman';
import VehicleGrid from '../components/VehicleGrid';
import vehicles from '../data/vehicles';
import { useAppStore } from '../store/useAppStore';
import { trackEvent } from '../utils/analytics';
import { WHATSAPP_NUMBER } from '../utils/constants';
import { filterVehicles } from '../utils/filterVehicles';
import { currentSeason, uiNow } from '../utils/season';

export default function InventoryPage() {
  const { filters } = useAppStore();
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  // The festive scene (snow + pines in the hero panel) is date-driven.
  const isFestive = currentSeason(uiNow()) === 'festive';

  useEffect(() => {
    document.title =
      pathname === '/'
        ? 'IzzyAutoBridge Ghana — Inspected Cars from China'
        : 'Browse Inventory — IzzyAutoBridge Ghana';
  }, [pathname]);

  const matchingVehicles = useMemo(
    () => filterVehicles(vehicles, filters, searchQuery),
    [filters, searchQuery]
  );

  // Filter changes are tracked here rather than inside each control, so the
  // sidebar, the category chips and "Reset all" all report the same way.
  const previousFilters = useRef(filters);

  useEffect(() => {
    const previous = previousFilters.current;
    const changed = Object.keys(filters).filter(
      key => JSON.stringify(filters[key]) !== JSON.stringify(previous[key])
    );
    previousFilters.current = filters;
    if (changed.length === 0) return undefined;

    // FilterSidebar syncs its computed price/year bounds into the store on
    // mount. That is not a user action, so don't report it as one.
    const isInitialBoundsSync =
      changed.every(key => key === 'priceRange' || key === 'yearRange') &&
      previous.priceRange[0] === 0 &&
      previous.priceRange[1] === 10000000 &&
      previous.yearRange[0] === 1900 &&
      previous.yearRange[1] === 2030;
    if (isInitialBoundsSync) return undefined;

    // Debounced: price/year sliders fire on every pixel of drag.
    const timer = setTimeout(() => {
      trackEvent('filter_apply', {
        filter_type: changed.length === 1 ? changed[0] : 'multiple',
        filter_value: changed.length === 1 ? String(filters[changed[0]]) : changed.join(','),
        results: matchingVehicles.length,
      });
    }, 700);
    return () => clearTimeout(timer);
  }, [filters, matchingVehicles.length]);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`relative rounded-2xl bg-slate-950 text-white overflow-hidden ${
          isHome ? 'p-6 sm:p-10 mb-6' : 'p-8 sm:p-10 mb-8'
        }`}
      >
        {/* Same backdrop as the About hero: cargo ship + dark gradient. */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605745341112-85968b19335b?fm=webp&q=70&w=1280&auto=format&fit=crop"
            alt="Cargo ship carrying containers at sea"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        </div>

        {/* Festive scene (season.js gates the phase): garland across the top
            edge, Santa flying a cameo pass, snowman + elf + gifts joining the
            pines on the deck. */}
        {isFestive && (
          <>
            <SeasonSnow />
            <Garland />
            <SantaSleigh className="season-santa w-40 sm:w-56" />
            <div className="pointer-events-none absolute bottom-0 right-4 sm:right-10 flex items-end gap-2 sm:gap-3">
              <Gift color="pine" className="w-6 sm:w-8 h-8 sm:h-9" />
              <Snowman className="w-11 sm:w-14 h-14 sm:h-[72px]" />
              <FestiveTree className="w-12 sm:w-16 h-16 sm:h-20" />
              <Gift color="gold" className="w-7 sm:w-9 h-8 sm:h-10" />
              <FestiveTree className="w-9 sm:w-11 h-[48px] sm:h-14 opacity-90" />
              <Gift color="crimson" className="w-6 sm:w-8 h-8 sm:h-9" />
              <Elf className="season-elf w-9 sm:w-12 h-11 sm:h-14" />
            </div>
          </>
        )}

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 chip-badge px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
            <Car size={16} aria-hidden="true" /> Inventory
          </div>
          <div className="mb-5">
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              Browse {matchingVehicles.length} of {vehicles.length} inspected vehicles
            </h1>
            {matchingVehicles.length !== vehicles.length && (
              <p className="text-sm text-white/80 mt-1">
                {matchingVehicles.length} of {vehicles.length} vehicles match your search and
                filters
              </p>
            )}
          </div>
          <p className="text-white/80 max-w-2xl">
            Live stock from our China partners — filter by brand, price and year. Shipping to Tema
            included (CIF). Duties and port clearing are separate.
          </p>
          <ExchangeRateNote className="text-white/80 mt-3" />
          {/* The brand marquee is decorative — on the home page the cars win the fold. */}
          {!isHome && (
            <div className="-mx-8 sm:-mx-10 mt-7">
              <BrandMarquee />
            </div>
          )}
        </div>
      </header>

      <div className="mb-6">
        <InventorySearch
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={term =>
            trackEvent('search', { search_term: term, results: matchingVehicles.length })
          }
        />
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

      {/* Everything below the cars. The grid always comes first. */}
      <div className="-mx-4 sm:-mx-6 mt-16 border-t border-subtle">
        <ProcessSection />
        <EVCalculator />
      </div>
    </>
  );
}
