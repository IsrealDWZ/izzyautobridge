// Frosty little snowman for the hero deck: coal eyes/buttons, carrot nose,
// crimson scarf and hat band. Pure SVG, aria-hidden; fully static (motion
// budget is spent on Santa and the elf).
export default function Snowman({ className = '' }) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden="true" focusable="false">
      {/* mound shadow */}
      <ellipse cx="45" cy="103" rx="30" ry="6" fill="rgba(0,0,0,0.35)" />
      {/* snowballs */}
      <ellipse cx="45" cy="84" rx="28" ry="19" fill="#f3f6f2" />
      <circle cx="45" cy="52" r="20" fill="#f3f6f2" />
      <circle cx="45" cy="26" r="14" fill="#f3f6f2" />
      {/* hat */}
      <ellipse cx="45" cy="14.5" rx="13" ry="2.6" fill="#26241f" />
      <path d="M35 14h20l-2-9c-5-2-11-2-16 0z" fill="#26241f" />
      <rect x="35" y="9.4" width="20" height="3.4" fill="#a4122e" />
      {/* face */}
      <circle cx="40" cy="23" r="1.7" fill="#26241f" />
      <circle cx="50" cy="23" r="1.7" fill="#26241f" />
      <path d="M45 27l7 2.6-7 2.6z" fill="#e0872b" />
      <path d="M38.5 31.5h1.6M41 33h1.6M43.5 33.7h1.6M46 33h1.6M48.5 31.5h1.6" stroke="#26241f" strokeWidth="1.6" strokeLinecap="round" />
      {/* scarf */}
      <path d="M32 36c8 5 18 5 26 0l-2 7c-7 4-15 4-22 0z" fill="#a4122e" />
      <path d="M52 41l6 14-6 2z" fill="#a4122e" />
      {/* buttons */}
      <circle cx="45" cy="48" r="2.4" fill="#26241f" />
      <circle cx="45" cy="56" r="2.4" fill="#26241f" />
      <circle cx="45" cy="80" r="2.6" fill="#26241f" />
      <circle cx="45" cy="90" r="2.6" fill="#26241f" />
      <circle cx="45" cy="98" r="2.4" fill="#26241f" />
    </svg>
  );
}
