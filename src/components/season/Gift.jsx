// Wrapped gift with a ribbon cross and a bow. Pure SVG, aria-hidden.
// `color` picks the paper (crimson | pine | gold); the ribbon stays cream so
// it reads on every paper color.
const PAPERS = {
  crimson: { lid: '#a4122e', box: '#7d0e24' },
  pine: { lid: '#14523c', box: '#0e3f2e' },
  gold: { lid: '#c99a3a', box: '#a37a26' },
};

export default function Gift({ className = '', color = 'crimson' }) {
  const paper = PAPERS[color] || PAPERS.crimson;
  return (
    <svg viewBox="0 0 80 84" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="40" cy="78" rx="26" ry="4.4" fill="rgba(0,0,0,0.35)" />
      <rect x="16" y="40" width="48" height="34" rx="3" fill={paper.box} />
      <rect x="12" y="26" width="56" height="16" rx="3" fill={paper.lid} />
      {/* ribbon */}
      <rect x="34" y="26" width="12" height="48" fill="#f4ead0" />
      <rect x="12" y="29" width="56" height="4" fill="#f4ead0" opacity="0.55" />
      {/* bow */}
      <path d="M40 24c-7-8-16-6-14 1 2 6 10 6 14-1zM40 24c7-8 16-6 14 1-2 6-10 6-14-1z" fill="#f4ead0" />
      <circle cx="40" cy="24" r="3.4" fill="#e8d9b8" />
    </svg>
  );
}
