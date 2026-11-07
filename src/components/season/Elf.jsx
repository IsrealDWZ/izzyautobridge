// Elf as a slender near-black silhouette holding a lit gold lantern — no
// cartoon face, just the hat's droop, a thin hat band and the curled shoes
// carrying the character. Pure SVG, aria-hidden; `.season-elf` (gentle hop)
// applies in index.css while the season is festive.
const INK = '#25231f';

export default function Elf({ className = '' }) {
  return (
    <svg viewBox="0 0 110 130" className={className} aria-hidden="true" focusable="false">
      <g fill={INK}>
        {/* legs + curled shoes */}
        <path d="M44 92l9-1-1 22-9 1zM60 92l9 1 1 21-9 1z" />
        <path d="M41 113c-7 0-9 7-2 8l14 1 1-9zM73 115c7 0 10 7 3 8l-14 1-1-9z" stroke={INK} strokeWidth="2.4" />
        {/* tunic, slightly tapered — grown-up proportions */}
        <path d="M38 58c-4 18-3 34 0 38h37c3-4 3-22 0-38z" />
        {/* collar point */}
        <path d="M40 58l9 7 9-7 9 7 9-7-3 8h-30z" />
        {/* idle arm, then lantern arm */}
        <path d="M39 60l-9 22 6 2 8-16z" />
        <path d="M74 60l13-20" stroke={INK} strokeWidth="7.5" strokeLinecap="round" fill="none" />
        {/* head + ears, tiny and quiet */}
        <circle cx="56" cy="34" r="15" />
        <path d="M41 31c-6-2-8 4-3 7zM71 31c6-2 8 4 3 7z" />
        {/* hat: droops to one side, thin band, bell */}
        <path d="M42 25C41 10 51 4 60 7c9 3 12 13 9 20l-27 1z" />
      </g>
      {/* gold accents: hat band + bell, belt mark, lantern */}
      <rect x="39" y="20" width="30" height="4.6" rx="2.3" fill="#a4122e" />
      <circle cx="70" cy="27" r="3.4" fill="#d9a53c" />
      <rect x="40" y="76" width="33" height="3.4" fill="#d9a53c" opacity="0.7" />
      <circle cx="92" cy="36" r="3.6" fill="#f3f6f2" />
      <path d="M92 40v8" stroke={INK} strokeWidth="2.4" fill="none" />
      <path d="M87 50h10l-1.6 11h-6.8z" fill="#d9a53c" />
      <circle cx="92" cy="55.5" r="6.5" fill="#d9a53c" opacity="0.28" />
    </svg>
  );
}
