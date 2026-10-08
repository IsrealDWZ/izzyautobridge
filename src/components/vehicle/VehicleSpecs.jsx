export function VehicleSpecs({ vehicle }) {
  const specs = vehicle.Key_Specs ? vehicle.Key_Specs.split(' • ') : [];

  return (
    <div className="flex flex-wrap gap-1.5 my-3">
      {specs.slice(0, 4).map((spec, i) => (
        <span
          key={i}
          className="text-xs bg-accent-surface text-main border border-subtle px-2.5 py-1 rounded-full"
        >
          {spec}
        </span>
      ))}
    </div>
  );
}