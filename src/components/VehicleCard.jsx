import { motion } from 'framer-motion';

import { useAppStore } from '../store/useAppStore';

import { VehicleImage, VehiclePrice, VehicleActions, VehicleSpecs } from './vehicle';

export default function VehicleCard({ vehicle }) {
  const { compareSelection, toggleCompare, favorites, toggleFavorite } = useAppStore();
  const isComparing = compareSelection.includes(vehicle.ID);
  const isFavorite = favorites.includes(vehicle.ID);
  const isEV = vehicle.Fuel_Type === 'Electric' || vehicle.Category === 'EV';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="group card card-hover overflow-hidden flex flex-col"
      style={{ 
        background: 'linear-gradient(145deg, var(--color-container) 0%, var(--color-bg-elevated) 100%)',
      }}
    >
      <VehicleImage vehicle={vehicle} />
      
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2 mb-3"
        >
          <motion.span
            className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest font-mono"
          >
            {vehicle.ID}
          </motion.span>
          {isEV && (
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1 text-xs text-[var(--color-success)] font-medium"
            >
              <span>⚡</span> Electric
            </motion.span>
          )}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors duration-300"
        >
          {vehicle.Brand} {vehicle.Model} {vehicle.Year}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-sm text-[var(--color-text-muted)]"
        >
          {vehicle.Variant}
        </motion.p>

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
    </motion.article>
  );
}