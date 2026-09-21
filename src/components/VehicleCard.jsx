import { motion } from 'framer-motion';

import { useAppStore } from '../store/useAppStore';

import { VehicleImage, VehiclePrice, VehicleActions, VehicleSpecs } from './vehicle';

export default function VehicleCard({ vehicle }) {
  const { compareSelection, toggleCompare, favorites, toggleFavorite } = useAppStore();
  const isComparing = compareSelection.includes(vehicle.ID);
  const isFavorite = favorites.includes(vehicle.ID);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="card-surface overflow-hidden flex flex-col hover:shadow-xl hover:border-gold/50 transition-all group"
    >
      <VehicleImage vehicle={vehicle} />
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-gold uppercase tracking-widest">
          {vehicle.ID}
        </span>
        <h3 className="font-display text-lg sm:text-xl font-bold mt-1">
          {vehicle.Brand} {vehicle.Model} {vehicle.Year}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.Variant}</p>

        <VehicleSpecs vehicle={vehicle} />

        <VehiclePrice vehicle={vehicle} />

        <VehicleActions
          vehicle={vehicle}
          isComparing={isComparing}
          isFavorite={isFavorite}
          onToggleCompare={toggleCompare}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </motion.div>
  );
}