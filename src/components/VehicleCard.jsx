import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { WHATSAPP_NUMBER, USD_GHS_RATE } from '../utils/constants';
import { validateImageUrl } from '../utils/validation';

function getFirstImage(vehicle) {
  // New format: array of objects [{image: "url"}, ...]
  if (Array.isArray(vehicle.Image_URLs) && vehicle.Image_URLs.length > 0) {
    const first = vehicle.Image_URLs[0];
    const url = typeof first === 'object' ? first.image : first;
    return validateImageUrl(url);
  }
  // Old format: comma-separated string
  if (typeof vehicle.Image_URLs === 'string' && vehicle.Image_URLs.length > 0) {
    return validateImageUrl(vehicle.Image_URLs.split(',')[0]);
  }
  return null;
}

export default function VehicleCard({ vehicle, whatsappNumber = WHATSAPP_NUMBER }) {
  const { compareSelection, toggleCompare, favorites, toggleFavorite } = useAppStore();
  const isComparing = compareSelection.includes(vehicle.ID);
  const isFavorite = favorites.includes(vehicle.ID);

  const specs = vehicle.Key_Specs ? vehicle.Key_Specs.split(' • ') : [];
  const firstImage = getFirstImage(vehicle);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in ${vehicle.Brand} ${vehicle.Model} ${vehicle.Year} (${vehicle.ID})`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="card-surface overflow-hidden flex flex-col hover:shadow-xl hover:border-gold/50 transition-all group"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-deep dark:to-navy overflow-hidden">
        <span className="absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full bg-gold/90 text-navy">
          {vehicle.Status}
        </span>
        {firstImage ? (
          <img
            src={firstImage}
            alt={`${vehicle.Brand} ${vehicle.Model}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🚗</div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-gold uppercase tracking-widest">
          {vehicle.ID}
        </span>
        <h3 className="font-display text-lg sm:text-xl font-bold mt-1">
          {vehicle.Brand} {vehicle.Model} {vehicle.Year}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.Variant}</p>

        <div className="flex flex-wrap gap-1.5 my-3">
          {specs.slice(0, 4).map((spec, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 dark:bg-navy-deep text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/10">
          <div className="text-lg sm:text-xl font-bold">GH₵{vehicle.Price_GHS.toLocaleString()}</div>
          <div className="text-xs text-gray-500">
            CIF: ${vehicle.Price_USD.toLocaleString()} • {USD_GHS_RATE} GHS/USD
          </div>
        </div>

        {/* Action row - mobile optimized */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => toggleCompare(vehicle.ID)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2.5 rounded-lg border transition min-h-[44px] ${
              isComparing
                ? 'bg-gold/15 border-gold text-navy dark:text-gold'
                : 'border-gray-200 dark:border-white/10 text-gray-500'
            }`}
          >
            <Check size={14} className={isComparing ? 'opacity-100' : 'opacity-0'} />
            <span className="hidden sm:inline">Compare</span>
            <span className="sm:hidden" aria-label="Compare">⚖</span>
          </button>
          <button
            onClick={() => toggleFavorite(vehicle.ID)}
            className="p-2.5 rounded-lg border border-gray-200 dark:border-white/10 min-h-[44px] min-w-[44px]"
            aria-label="Save to favorites"
          >
            <Heart size={18} fill={isFavorite ? '#D9534F' : 'none'} stroke={isFavorite ? '#D9534F' : 'currentColor'} />
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hi, I'm interested in ${vehicle.Brand} ${vehicle.Model} ${vehicle.Year} (${vehicle.ID})`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center bg-whatsapp text-white text-sm font-semibold py-2.5 rounded-lg hover:brightness-95 transition min-h-[44px] flex items-center justify-center"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}