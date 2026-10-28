import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

import vehicles from '../data/vehicles.json';
import { WHATSAPP_NUMBER } from '../utils/constants';

const TABS = [
  { id: 'suvs', label: 'SUVs & Crossovers' },
  { id: 'sedans', label: 'Sedans & EVs' },
  { id: 'trucks', label: 'Trucks & Commercial' },
  { id: 'upcoming', label: 'Upcoming Imports' },
];

const ENERGY_LABELS = {
  EV: 'Battery EV',
  Hybrid: 'Plug-in Hybrid',
  Fuel: 'Petrol',
  Other: 'Fuel Cell',
};

export default function LandingVehicleGrid() {
  const [activeTab, setActiveTab] = useState('suvs');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      switch (activeTab) {
        case 'suvs':
          return v.Body_Type?.includes('SUV') || v.Category === 'Heavy';
        case 'sedans':
          return (
            v.Body_Type?.includes('Sedan') ||
            v.Fuel_Type?.includes('Electric') ||
            v.Fuel_Type?.includes('Hybrid')
          );
        case 'trucks':
          return (
            v.Body_Type?.includes('Pickup') ||
            v.Body_Type?.includes('Truck') ||
            v.Category === 'Heavy'
          );
        case 'upcoming':
          return v.Year >= 2025;
        default:
          return true;
      }
    });
  }, [activeTab]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">
              Explore All Vehicles
            </h2>
            <p className="text-slate-600 text-sm">
              Direct China vehicle supply to Ghana
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="relative">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${
              activeTab === 'upcoming'
                ? 'overflow-x-auto snap-x pb-12 flex-nowrap min-h-[560px]'
                : ''
            }`}
          >
            {filteredVehicles.map((v) => (
              <VehicleCard key={v.ID} vehicle={v} />
            ))}
            {activeTab === 'upcoming' && <div className="w-8 shrink-0" />}
          </div>

          {/* Mobile Scroll Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none lg:hidden">
            <button
              onClick={() => {
                const grid = document.querySelector(
                  '.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3'
                );
                if (grid) grid.scrollBy({ left: -320, behavior: 'smooth' });
              }}
              className="z-30 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center border border-slate-200"
            >
              <ChevronLeft size={18} className="text-slate-900" />
            </button>
            <button
              onClick={() => {
                const grid = document.querySelector(
                  '.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3'
                );
                if (grid) grid.scrollBy({ left: 320, behavior: 'smooth' });
              }}
              className="ml-auto z-30 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center border border-slate-200"
            >
              <ChevronRight size={18} className="text-slate-900" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function VehicleCard({ vehicle }) {
  const images = vehicle.Image_URLs ? vehicle.Image_URLs.split(',') : [];
  const firstImage = images[0] || '';
  const energyLabel = ENERGY_LABELS[vehicle.Category] || 'Fuel';
  const priceText =
    vehicle.Price_USD > 0
      ? `Starting at $${vehicle.Price_USD.toLocaleString()}`
      : 'Contact for Ghana Port Clearing Quote';
  const whatsAppText = encodeURIComponent(
    `Hi, I'm interested in ${vehicle.Brand} ${vehicle.Model} ${vehicle.Year} (${vehicle.ID})`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.random() * 0.2 }}
      className="group relative flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-100 mb-5">
        <img
          src={firstImage}
          alt={`${vehicle.Brand} ${vehicle.Model} ${vehicle.Year}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold text-white bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 rounded uppercase tracking-tighter shadow-md">
            {energyLabel}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[10px] font-bold text-slate-900 bg-white/90 backdrop-blur px-2.5 py-1 rounded uppercase tracking-tighter">
            {vehicle.Status}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-emerald-600 transition-colors">
          {vehicle.Brand} {vehicle.Model} {vehicle.Year}
        </h3>
        <p className="text-sm text-emerald-600 font-semibold mb-4">
          {priceText}
        </p>

        <div className="space-y-1.5 mb-6 flex-1">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-tighter">
            <span>Estimated Range</span>
            <span>{vehicle.Range_km ? `${vehicle.Range_km} km` : '—'}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-tighter">
            <span>Transmission</span>
            <span>Automatic</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-tighter">
            <span>Drive Side</span>
            <span>Left-Hand Drive</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={`/vehicle/${vehicle.ID}`}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all duration-300 min-h-[48px]"
          >
            Explore Details
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all duration-300 min-h-[48px]"
          >
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
