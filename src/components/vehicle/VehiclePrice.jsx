import { motion } from 'framer-motion';

import { USD_GHS_RATE } from '../../utils/constants';

export function VehiclePrice({ vehicle }) {
  return (
    <motion.div
      className="mt-auto pt-4 border-t border-[var(--color-border)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums"
        >
          GH₵{vehicle.Price_GHS.toLocaleString()}
        </motion.div>
        {vehicle.Original_Price_GHS && vehicle.Original_Price_GHS > vehicle.Price_GHS && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-medium text-[var(--color-success)] bg-[rgba(0,200,150,0.1)] px-2 py-1 rounded-full"
          >
            Save GH₵{(vehicle.Original_Price_GHS - vehicle.Price_GHS).toLocaleString()}
          </motion.span>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-[var(--color-text-dim)]">
        <span className="flex items-center gap-1 font-mono">
          <span className="text-[var(--color-accent)]">{USD_GHS_RATE}</span> GHS/USD
        </span>
        <span className="flex items-center gap-1">
          CIF: ${vehicle.Price_USD.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}