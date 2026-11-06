// Santa in his sleigh with a reindeer team, drawn side-on. Pure SVG — no
// image payload, aria-hidden wherever it mounts. Flown across the hero by
// CSS (`.season-santa` keyframes in index.css), mounted only while the
// season is festive.
export default function SantaSleigh({ className = '' }) {
  return (
    <svg viewBox="0 0 260 132" className={className} aria-hidden="true" focusable="false">
      {/* reindeer legs */}
      <path d="M34 72l-4 16 5 2 4-15zM44 74l1 17 6 0-1-17zM56 74l1 17 6 0-1-17zM64 72l7 15 5-3-7-14z" fill="#6b4423" />
      <path d="M30 88h8M43 91h9M54 91h9M67 85h8" stroke="#3f2a12" strokeWidth="3" strokeLinecap="round" />
      {/* body + neck + head */}
      <ellipse cx="50" cy="62" rx="24" ry="13" fill="#8a5a33" />
      <path d="M68 56l14-14 4 3-12 15z" fill="#8a5a33" />
      <circle cx="86" cy="43" r="8" fill="#8a5a33" />
      {/* antlers */}
      <path d="M84 35l-4-10M84 35l-8-6M84 35l4-11M84 35l7-7" stroke="#5b3a1e" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* ear, nose, eye, tail, harness */}
      <path d="M92 38c4-2 6-2 7 0l-6 3z" fill="#8a5a33" />
      <circle cx="94" cy="42" r="2.6" fill="#c8102e" />
      <circle cx="88" cy="41" r="1.3" fill="#2a1a0c" />
      <path d="M27 58l-7-4 1 9z" fill="#6b4423" />
      <path d="M84 45C70 55 66 58 62 62" stroke="#e0b23c" strokeWidth="2.2" fill="none" />
      {/* reins */}
      <path d="M92 40c12-4 24-6 34-10" stroke="#7a4a21" strokeWidth="1.8" fill="none" />
      {/* gift sack behind santa */}
      <path d="M148 66c-6-26 20-34 30-24 12 12 4 42-8 46-14 4-18-8-22-22z" fill="#7a4a21" />
      <circle cx="172" cy="49" r="5" fill="#c8102e" />
      {/* sleigh hull */}
      <path
        d="M104 60c-4 36 20 50 44 50h64c24 0 32-16 30-32h-32c-2 12-14 18-30 18h-34c-20 0-32-12-34-36z"
        fill="#a4122e"
      />
      {/* gold rail + runner */}
      <path d="M104 60c2 22 14 34 34 36" stroke="#e0b23c" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M100 114c30 8 92 8 136 0" stroke="#d9a53c" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      {/* santa */}
      <path d="M150 62c-2-14 8-24 20-24s18 10 16 24z" fill="#c8102e" />
      <circle cx="170" cy="30" r="9" fill="#f8c9a4" />
      {/* beard */}
      <path d="M160 32c-2 12 4 17 10 17s12-4 10-16c-3 3-17 2-20-1z" fill="#f3f6f2" />
      <circle cx="166.5" cy="29" r="1.4" fill="#2a1a0c" />
      <circle cx="174" cy="29" r="1.4" fill="#2a1a0c" />
      <circle cx="170" cy="33.5" r="2" fill="#e04b63" />
      {/* hat */}
      <path d="M159 24c-2-10 4-16 12-16s12 6 11 13l-2 5c-7-3-14-3-21-2z" fill="#c8102e" />
      <path d="M159 24c9-3 16-3 21 2l-1 4c-6-4-13-4-20-2z" fill="#f3f6f2" />
      <circle cx="182" cy="21" r="3.2" fill="#f3f6f2" />
      {/* arm to reins */}
      <path d="M158 44l-16-10" stroke="#c8102e" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <circle cx="141" cy="34" r="3.4" fill="#f3f6f2" />
    </svg>
  );
}
