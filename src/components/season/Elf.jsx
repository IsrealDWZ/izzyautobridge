// Elf helper — points a big ear, green floppy hat with a crimson band and a
// gold bell, waving arm raised. Pure SVG, aria-hidden. The wrapper gets
// `.season-elf` (hop animation) from index.css; mounted only while festive.
export default function Elf({ className = '' }) {
  return (
    <svg viewBox="0 0 110 130" className={className} aria-hidden="true" focusable="false">
      {/* legs + curly shoes */}
      <path d="M42 96h9l-2 18h-9zM60 96h9l2 18h-9z" fill="#34322e" />
      <path d="M38 114c-6 0-8 6-2 7l14 1 2-8zM74 116c6 1 9 6 3 8l-14 1-3-8z" fill="#a4122e" />
      {/* tunic */}
      <path d="M36 62c-4 18-2 34 0 36h40c3-4 4-20 0-36z" fill="#1c7a4c" />
      {/* pointy collar */}
      <path d="M42 60l9 8 9-8 9 8 9-8-4 10h-28z" fill="#f3f6f2" />
      {/* belt */}
      <rect x="38" y="80" width="38" height="5" rx="2" fill="#34322e" />
      <rect x="53" y="79" width="7" height="7" rx="1.5" fill="#e0b23c" />
      {/* idle arm (left) + waving arm (right) */}
      <path d="M38 64l-10 20 6 3 10-15z" fill="#1c7a4c" />
      <circle cx="31" cy="88" r="5" fill="#f8c9a4" />
      <path d="M76 64l14-22" stroke="#1c7a4c" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="94" cy="38" r="5.5" fill="#f8c9a4" />
      {/* head + ears */}
      <circle cx="57" cy="34" r="19" fill="#f8c9a4" />
      <path d="M38 32c-7-3-9 5-3 8zM76 32c7-3 9 5 3 8z" fill="#f8c9a4" />
      {/* face */}
      <circle cx="50" cy="31" r="2" fill="#34322e" />
      <circle cx="64" cy="31" r="2" fill="#34322e" />
      <circle cx="47" cy="40" r="3" fill="#f4a7a7" />
      <circle cx="67" cy="40" r="3" fill="#f4a7a7" />
      <path d="M52 41q5 5 10 0" stroke="#a04b2e" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* floppy hat: crimson band, pine cone, gold bell */}
      <path d="M40 24C38 8 50 2 60 6c10 4 12 16 8 24l-30 2z" fill="#14523c" />
      <rect x="37" y="20" width="32" height="7" rx="3.5" fill="#a4122e" />
      <circle cx="70" cy="28" r="4" fill="#e0b23c" />
      <circle cx="57" cy="8" r="3" fill="#f3f6f2" />
    </svg>
  );
}
