// String of festive bulbs on a drooping wire, for the top edge of dark hero
// panels. Bulb colors and staggered twinkle delays live in index.css so the
// row stays declarative JSX: however many bulbs, CSS spaces and animates
// them. aria-hidden; static (no twinkle) under prefers-reduced-motion.
export default function Garland({ bulbs = 18, className = '' }) {
  return (
    <div className={`season-garland ${className}`} aria-hidden="true">
      {Array.from({ length: bulbs }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
