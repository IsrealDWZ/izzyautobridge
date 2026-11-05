import { Link } from 'react-router-dom';

import { useAppStore } from '../store/useAppStore';
import { toItem, trackEvent } from '../utils/analytics';

import { VehicleActions } from './vehicle/VehicleActions';
import { VehicleImage } from './vehicle/VehicleImage';
import { VehiclePrice } from './vehicle/VehiclePrice';
import { VehicleSpecs } from './vehicle/VehicleSpecs';

export default function VehicleCard({
  vehicle,
  loading = false,
  index = 0,
  onToggleCompare,
  onToggleFavorite,
}) {
  const { compareSelection, favorites } = useAppStore();
  const isComparing = compareSelection.includes(vehicle.ID);
  const isFavorite = favorites.includes(vehicle.ID);
  // Cap the stagger so cards far down the grid are not waiting on a long delay.
  const enterStyle = { animationDelay: `${Math.min(index, 8) * 40}ms` };

  const handleFavorite = () => {
    trackEvent(isFavorite ? 'remove_from_wishlist' : 'add_to_wishlist', {
      currency: 'GHS',
      value: vehicle.Price_GHS,
      items: [toItem(vehicle)],
    });
    onToggleFavorite(vehicle.ID);
  };

  const handleCompare = () => {
    trackEvent(isComparing ? 'compare_remove' : 'compare_add', {
      currency: 'GHS',
      value: vehicle.Price_GHS,
      items: [toItem(vehicle)],
    });
    onToggleCompare(vehicle.ID);
  };

  const handleSelect = () => {
    trackEvent('select_item', {
      item_list_id: 'inventory',
      item_list_name: 'Inventory',
      items: [toItem(vehicle)],
    });
  };

  if (loading) {
    return (
      <div className="card-enter card-surface overflow-hidden flex flex-col hover:shadow-xl hover:border-action/50 transition-all">
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
      </div>
    );
  }

  return (
    <div
      style={enterStyle}
      className="card-enter card-surface overflow-hidden flex flex-col hover:shadow-xl hover:border-action/50 transition-all group"
    >
      <VehicleImage vehicle={vehicle} />
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-muted uppercase tracking-widest">
          {vehicle.ID}
        </span>
        <h3 className="font-display text-lg sm:text-xl font-bold mt-1">
          <Link
            to={`/vehicle/${vehicle.ID}`}
            onClick={handleSelect}
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
          onToggleCompare={handleCompare}
          onToggleFavorite={handleFavorite}
        />
      </div>
    </div>
  );
}
