import { motion } from 'framer-motion';
import { ChevronRight, Car, Ship, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { VehicleImage, VehiclePrice, VehicleActions, VehicleSpecs } from '../components/vehicle';
import vehicles from '../data/vehicles.json';
import { useAppStore } from '../store/useAppStore';
import { WHATSAPP_NUMBER } from '../utils/constants';

function specRows(v) {
  return [
    { label: 'Brand', value: v.Brand },
    { label: 'Model', value: v.Model },
    { label: 'Year', value: v.Year },
    { label: 'Variant', value: v.Variant },
    { label: 'Fuel type', value: v.Fuel_Type },
    { label: 'Body type', value: v.Body_Type },
    { label: 'Drive', value: v.Drive },
    { label: 'Color', value: v.Color },
    { label: 'Mileage', value: v.Mileage_km ? `${v.Mileage_km.toLocaleString()} km` : null },
    { label: 'Status', value: v.Status },
  ].filter((r) => r.value);
}

export default function VehicleDetailPage() {
  const { slug } = useParams();
  const vehicle = vehicles.find((v) => v.ID === slug);
  const { compareSelection, toggleCompare, favorites, toggleFavorite } = useAppStore();
  const isComparing = vehicle ? compareSelection.includes(vehicle.ID) : false;
  const isFavorite = vehicle ? favorites.includes(vehicle.ID) : false;

  useEffect(() => {
    if (vehicle) {
      document.title = `${vehicle.Brand} ${vehicle.Model} ${vehicle.Year} — IzzyAutoBridge Ghana`;
    }
  }, [vehicle]);

  if (!vehicle) return <Navigate to="/inventory" replace />;

  const title = `${vehicle.Brand} ${vehicle.Model} ${vehicle.Year}`;
  const waText = encodeURIComponent(`Hi, I'm interested in ${title} (${vehicle.ID})`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-5xl mx-auto"
    >
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted mb-5">
        <Link to="/" className="hover:text-main transition-colors">Home</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link to="/inventory" className="hover:text-main transition-colors">Inventory</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-main font-medium truncate">{title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="group">
          <VehicleImage vehicle={vehicle} />
        </div>

        {/* Summary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-muted uppercase tracking-widest">{vehicle.ID}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
          <p className="text-muted mt-1">{vehicle.Variant}</p>

          <VehicleSpecs vehicle={vehicle} />
          <VehiclePrice vehicle={vehicle} />

          <VehicleActions
            vehicle={vehicle}
            isComparing={isComparing}
            isFavorite={isFavorite}
            onToggleCompare={toggleCompare}
            onToggleFavorite={toggleFavorite}
          />

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 text-sm text-muted">
              <Ship size={16} className="text-main shrink-0" aria-hidden="true" />
              Free shipping to Tema Port
            </div>
            <div className="flex items-center gap-2.5 text-sm text-muted">
              <ShieldCheck size={16} className="text-main shrink-0" aria-hidden="true" />
              SGS inspected · 12-month warranty
            </div>
          </div>
        </div>
      </div>

      {/* Full specifications */}
      <section className="card-surface rounded-2xl p-6 sm:p-8 mt-10">
        <h2 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
          <Car size={18} aria-hidden="true" /> Full specifications
        </h2>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
          {specRows(vehicle).map((row) => (
            <div key={row.label} className="flex justify-between gap-4 py-3 border-b border-subtle last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="text-sm font-medium text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
        {vehicle.Key_Specs && (
          <p className="text-sm text-muted mt-5">Highlights: {vehicle.Key_Specs}</p>
        )}
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-secondary text-onsecondary p-8 sm:p-10 mt-8 overflow-hidden">
        <h2 className="font-display text-2xl font-bold">Interested in this vehicle?</h2>
        <p className="mt-2 max-w-xl">
          Message us on WhatsApp for landed-cost breakdown, inspection reports and delivery timelines.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-action text-onaction text-sm font-bold px-6 py-3 rounded-lg hover:opacity-85 transition min-h-[44px]"
        >
          Enquire on WhatsApp
        </a>
        <Link
          to="/inventory"
          className="mt-5 ml-3 inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to inventory
        </Link>
      </section>
    </motion.article>
  );
}
