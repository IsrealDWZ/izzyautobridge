const DEFAULT_BADGES = [
  "Toyota", "Honda", "Hyundai", "Kia", "Nissan",
  "Mercedes", "BMW", "Ford", "Mazda", "Lexus",
];

// Infinite ticker. The list is doubled and the track slides -50% so the loop is seamless.
// CSS-driven so group-hover can actually pause it (framer-motion ignores animation-play-state).
// Pass your own badges (e.g. makes from vehicles.json).
export default function BrandMarquee({ badges = DEFAULT_BADGES, duration = 30 }) {
  const items = [...badges, ...badges];

  return (
    <div
      className="group w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-3 group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {items.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
