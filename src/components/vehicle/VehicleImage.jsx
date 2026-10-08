/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Car } from 'lucide-react';
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

  return (
    <div className="relative aspect-video bg-gradient-to-br from-primary to-card overflow-hidden">
      <span className="absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full pill-active">
        {vehicle.Status}
      </span>
      <span className="absolute top-3 right-3 z-10 text-xs font-medium px-2 py-1 rounded bg-card text-main border border-subtle">
        {vehicle.Category}
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
        <div className="w-full h-full flex items-center justify-center">
          <Car size={56} className="text-muted" />
        </div>
      )}
    </div>
  );
}