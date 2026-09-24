import { motion } from 'framer-motion';
import { Car, Tag, Zap, DollarSign, CheckCircle, Globe, Shield, Truck } from 'lucide-react';

export default function StatsRow({ vehicles }) {
  const total = vehicles?.length || 0;
  const brands = total > 0 ? [...new Set(vehicles.map(v => v.Brand))].length : 0;
  const avgPrice = total > 0 ? Math.round(vehicles.reduce((sum, v) => sum + (v.Price_GHS || 0), 0) / total) : 0;
  const available = total > 0 ? vehicles.filter(v => ['Available', 'Brand new'].includes(v.Status)).length : 0;
  const evCount = total > 0 ? vehicles.filter(v => v.Fuel_Type === 'Electric').length : 0;
  const categories = total > 0 ? [...new Set(vehicles.map(v => v.Category))].length : 0;
  const countries = total > 0 ? 1 : 0;

  const stats = [
    { icon: Car, value: total.toLocaleString(), label: 'Total Vehicles', color: 'accent' },
    { icon: Tag, value: brands, label: 'Brands Available', color: 'info' },
    { icon: Zap, value: evCount, label: 'Electric Models', color: 'success' },
    { icon: DollarSign, value: `GH₵${avgPrice.toLocaleString()}`, label: 'Avg Landed Price', color: 'warning' },
    { icon: CheckCircle, value: available.toLocaleString(), label: 'Ready to Ship', color: 'success' },
    { icon: Globe, value: categories, label: 'Categories', color: 'info' },
  ];

  const colorClasses = {
    accent: 'text-[var(--color-accent)]',
    info: 'text-[var(--color-info)]',
    success: 'text-[var(--color-success)]',
    warning: 'text-[var(--color-warning)]',
    danger: 'text-[var(--color-danger)]',
  };

  const colorBgClasses = {
    accent: 'bg-[var(--color-accent-glow)]',
    info: 'bg-[rgba(45,156,219,0.15)]',
    success: 'bg-[rgba(0,200,150,0.15)]',
    warning: 'bg-[rgba(245,166,35,0.15)]',
    danger: 'bg-[rgba(224,75,75,0.15)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="container-custom mb-12 sm:mb-16"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
            className="group card card-hover p-4 sm:p-6 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              className={`w-14 h-14 ${colorBgClasses[stat.color]} rounded-2xl flex items-center justify-center mx-auto mb-4`}
            >
              <stat.icon size={28} strokeWidth={2} className={colorClasses[stat.color]} />
            </motion.div>
            <motion.div
              className={`text-3xl sm:text-4xl font-extrabold tabular-nums ${colorClasses[stat.color]}`}
            >
              {stat.value}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2 font-medium"
            >
              {stat.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}