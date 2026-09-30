import { motion } from 'framer-motion';
import { Car, Tag, Zap, DollarSign, CheckCircle } from 'lucide-react';

export default function StatsRow({ vehicles }) {
  const total = vehicles?.length || 0;
  const brands = total > 0 ? [...new Set(vehicles.map(v => v.Brand))].length : 0;
  const avgPrice = total > 0 ? Math.round(vehicles.reduce((sum, v) => sum + (v.Price_GHS || 0), 0) / total) : 0;
  const available = total > 0 ? vehicles.filter(v => ['Available', 'Brand new'].includes(v.Status)).length : 0;
  const evCount = total > 0 ? vehicles.filter(v => v.Fuel_Type === 'Electric').length : 0;

  const stats = [
    { icon: Car, value: total.toLocaleString(), label: 'Total Vehicles in Inventory' },
    { icon: Tag, value: brands, label: 'Brands Available' },
    { icon: Zap, value: evCount, label: 'Electric Models', isGold: true },
    { icon: DollarSign, value: `GH₵${avgPrice.toLocaleString()}`, label: 'Average Landed Price', isGold: true },
    { icon: CheckCircle, value: available.toLocaleString(), label: 'Ready to Ship', isGold: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="mb-8 sm:mb-12"
    >
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-surface p-4 sm:p-6 text-center hover:border-gold/50 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <stat.icon className="text-2xl sm:text-3xl mx-auto mb-2" style={{ color: stat.isGold ? '#D4A843' : '#1B2A4A' }} />
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: stat.isGold ? '#D4A843' : '#1B2A4A' }}>
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}