import { motion } from 'framer-motion';

import { validateImageUrl } from '../../utils/validation';

export function VehicleImage({ vehicle }) {
  function getFirstImage(v) {
    if (Array.isArray(v.Image_URLs) && v.Image_URLs.length > 0) {
      const first = v.Image_URLs[0];
      const url = typeof first === 'object' ? first.image : first;
      return validateImageUrl(url);
    }
    if (typeof v.Image_URLs === 'string' && v.Image_URLs.length > 0) {
      return validateImageUrl(v.Image_URLs.split(',')[0]);
    }
    return null;
  }

  const firstImage = getFirstImage(vehicle);
  const isEV = vehicle.Fuel_Type === 'Electric' || vehicle.Category === 'EV';

  return (
    <motion.div className="relative aspect-video overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-border)] to-[var(--color-bg-elevated)]" />
      
      {firstImage ? (
        <motion.img
          src={firstImage}
          alt={`${vehicle.Brand} ${vehicle.Model} ${vehicle.Year}`}
          loading="lazy"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : (
        <motion.div
          className="w-full h-full flex items-center justify-center text-6xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          🚗
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="badge badge-accent"
        >
          {vehicle.Status}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`badge ${isEV ? 'badge-success' : 'badge-neutral'}`}
        >
          {vehicle.Category}
        </motion.span>
      </div>

      <motion.div
        className="absolute bottom-3 left-3 right-3 flex justify-between items-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs font-medium text-white/70 font-mono">
          ID: {vehicle.ID}
        </span>
        {isEV && (
          <span className="flex items-center gap-1 text-xs text-[var(--color-success)] font-medium">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              ⚡
            </motion.span>
            Electric
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}