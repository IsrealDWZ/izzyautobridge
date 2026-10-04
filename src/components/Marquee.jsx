// Infinite ticker: the item list is doubled and the track slides -50%, so the
// loop is seamless. CSS-driven (not framer) so group-hover can actually pause it.
export default function Marquee({
  items,
  duration = 30,
  gap = 'gap-3',
  itemClassName = '',
  className = '',
  mask = true,
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`group w-full overflow-hidden ${className}`}
      style={
        mask
          ? {
              maskImage:
                'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
            }
          : undefined
      }
    >
      <div
        aria-hidden="true"
        className={`flex w-max ${gap} group-hover:[animation-play-state:paused]`}
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span key={`${i}`} className={`whitespace-nowrap ${itemClassName}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
