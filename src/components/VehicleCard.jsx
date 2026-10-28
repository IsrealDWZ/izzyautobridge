import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useAppStore } from '../store/useAppStore';

import { VehicleActions } from './vehicle/VehicleActions';
import { VehicleImage } from './vehicle/VehicleImage';
import { VehiclePrice } from './vehicle/VehiclePrice';
import { VehicleSpecs } from './vehicle/VehicleSpecs';

export default function VehicleCard({ vehicle, loading = false, onToggleCompare, onToggleFavorite }) {
  const { compareSelection, favorites } = useAppStore();
  const isComparing = compareSelection.includes(vehicle.ID);
  const isFavorite = favorites.includes(vehicle.ID);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card-surface overflow-hidden flex flex-col hover:shadow-xl hover:border-action/50 transition-all"
      >
        <div className="aspect-video bg-accent-surface rounded-3xl mb-5 animate-pulse" />
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="h-4 bg-accent-surface w-1/4 rounded mb-4 animate-pulse" />
          <div className="h-5 bg-accent-surface w-3/4 rounded mb-2 animate-pulse" />
          <div className="h-4 bg-accent-surface w-1/2 rounded mb-2 animate-pulse" />
          <div className="flex gap-2 h-8">
            <div className="w-1/3 h-4 bg-accent-surface rounded animate-pulse" />
            <div className="w-1/3 h-4 bg-accent-surface rounded animate-pulse" />
            <div className="w-1/3 h-4 bg-accent-surface rounded animate-pulse" />
          </div>
          <div className="h-4 bg-accent-surface w-1/2 rounded mb-2 animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-1/3 h-10 bg-accent-surface rounded animate-pulse" />
            <div className="flex-1 h-10 bg-accent-surface rounded animate-pulse" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="card-surface overflow-hidden flex flex-col hover:shadow-xl hover:border-action/50 transition-all group"
    >
      <VehicleImage vehicle={vehicle} />
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-muted uppercase tracking-widest">
          {vehicle.ID}
        </span>
        <h3 className="font-display text-lg sm:text-xl font-bold mt-1">
          <Link
            to={`/vehicle/${vehicle.ID}`}
            className="hover:text-action transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action rounded"
          >
            {vehicle.Brand} {vehicle.Model} {vehicle.Year}
          </Link>
        </h3>
        <p className="text-sm text-muted">{vehicle.Variant}</p>

        <VehicleSpecs vehicle={vehicle} />

        <VehiclePrice vehicle={vehicle} />

        <VehicleActions
          vehicle={vehicle}
          isComparing={isComparing}
          isFavorite={isFavorite}
          onToggleCompare={onToggleCompare}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </motion.div>
  );
}
