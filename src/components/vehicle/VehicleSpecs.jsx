import { motion } from 'framer-motion';
import { Fuel, Droplets, Gauge, Car, Zap } from 'lucide-react';

const specIcons = {
  fuel: Fuel,
  consumption: Droplets,
  mileage: Gauge,
  body: Car,
  transmission: Zap,
  default: Gauge,
};

function getIcon(spec) {
  const lower = spec.toLowerCase();
  if (lower.includes('fuel') || lower.includes('petrol') || lower.includes('diesel') || lower.includes('electric') || lower.includes('hybrid')) return Fuel;
  if (lower.includes('mileage') || lower.includes('km')) return Gauge;
  if (lower.includes('body') || lower.includes('suv') || lower.includes('sedan') || lower.includes('pickup') || lower.includes('van') || lower.includes('hatchback') || lower.includes('coupe')) return Car;
  if (lower.includes('transmission') || lower.includes('auto') || lower.includes('manual')) return Zap;
  if (lower.includes('consumption') || lower.includes('l/100') || lower.includes('kwh')) return Droplets;
  return Gauge;
}

export function VehicleSpecs({ vehicle }) {
  const specs = vehicle.Key_Specs ? vehicle.Key_Specs.split(' • ') : [];
  const displaySpecs = specs.slice(0, 4);

  if (displaySpecs.length === 0) return null;

  return (
    <motion.div
      className="flex flex-wrap gap-2 my-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      {displaySpecs.map((spec, i) => {
        const Icon = getIcon(spec);
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative px-3 py-1.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-bg-hover)] transition-all duration-300"
          >
            <Icon
              size={12}
              className="mr-1.5 text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)] transition-colors"
              strokeWidth={2}
            />
            <span className="text-xs font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
              {spec}
            </span>
          </motion.span>
        );
      })}
    </motion.div>
  );
}