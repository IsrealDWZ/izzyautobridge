// Decorative festive pine used in the seasonal refresh. Pure SVG — no image
// payload, scales freely, and it is aria-hidden everywhere it mounts because
// it carries no meaning a screen reader needs. Colors reference the festive
// tokens documented in DESIGN.md's seasonal appendix.
export default function FestiveTree({ className = '' }) {
  return (
    <svg
      viewBox="0 0 64 80"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* gold star */}
      <path
        d="M32 1.5l2 5 5.3.3-4.2 3.4 1.6 5.1L32 12.2l-4.7 3.1 1.6-5.1-4.2-3.4 5.3-.3z"
        fill="#f0c24b"
      />
      {/* pine tiers, darkest at the base */}
      <path d="M32 12l11 14.5H21z" fill="#34a06a" />
      <path d="M32 22l14.5 19h-29z" fill="#1c7a4c" />
      <path d="M32 35l18 23.5H14z" fill="#0f5d3a" />
      {/* baubles */}
      <circle cx="26" cy="34" r="2.2" fill="#a4122e" />
      <circle cx="39.5" cy="41" r="2.2" fill="#f0c24b" />
      <circle cx="27" cy="47" r="2.2" fill="#a4122e" />
      <circle cx="38" cy="30" r="1.8" fill="#f0c24b" />
      <circle cx="33" cy="53.5" r="2" fill="#f0c24b" />
      {/* trunk */}
      <rect x="29.5" y="58.5" width="5" height="7" rx="1" fill="#7a4a21" />
      {/* ground shadow */}
      <ellipse cx="32" cy="67" rx="14" ry="2.4" fill="rgba(0,0,0,0.35)" />
    </svg>
  );
}
