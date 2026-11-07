// Wrapped gift, muted: deep paper colors with a soft cream ribbon, so the
// parcels sit quietly next to the pines instead of shouting. Pure SVG,
// aria-hidden. `color` picks the paper; ribbon stays cream on every paper.
const PAPERS = {
  crimson: { lid: '#8f1e30', box: '#6d1424' },
  pine: { lid: '#1b5e45', box: '#123f2d' },
  gold: { lid: '#b1852c', box: '#8c6620' },
};
const RIBBON = '#e9dfc7';

export default function Gift({ className = '', color = 'crimson' }) {
  const paper = PAPERS[color] || PAPERS.crimson;
  return (
    <svg viewBox="0 0 80 84" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="40" cy="78" rx="25" ry="4" fill="rgba(0,0,0,0.35)" />
      <rect x="16" y="40" width="48" height="34" rx="3" fill={paper.box} />
      <rect x="12" y="26" width="56" height="16" rx="3" fill={paper.lid} />
      <rect x="34" y="26" width="12" height="48" fill={RIBBON} />
      <rect x="12" y="29" width="56" height="4" fill={RIBBON} opacity="0.5" />
      {/* bow: soft loops, slightly deeper cream */}
      <path d="M40 24c-6-7-14-5-12 1 1.8 5 8.5 5 12-1zM40 24c6-7 14-5 12 1-1.8 5-8.5 5-12-1z" fill={RIBBON} />
      <circle cx="40" cy="24" r="3.2" fill="#d6c8a8" />
    </svg>
  );
}
