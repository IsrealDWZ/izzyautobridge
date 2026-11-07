// Snowman, refined: warm ivory instead of bright white, slimmer hatsband
// details, no smile dots or blush. Coal eyes and buttons stay — they're the
// character. Pure SVG, aria-hidden, fully static.
export default function Snowman({ className = '' }) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="45" cy="103" rx="28" ry="5.5" fill="rgba(0,0,0,0.35)" />
      {/* snowballs — muted ivory with a faint cool edge */}
      <ellipse cx="45" cy="84" rx="26" ry="17.5" fill="#ddd8ce" />
      <circle cx="45" cy="52" r="18.5" fill="#e5e0d6" />
      <circle cx="45" cy="26" r="13" fill="#ece7dd" />
      {/* hat */}
      <ellipse cx="45" cy="15" rx="12.5" ry="2.4" fill="#26241f" />
      <path d="M36 14h18l-1.6-8.4c-4.8-1.8-10.4-1.8-14.8 0z" fill="#26241f" />
      <rect x="36" y="9.6" width="18" height="3" fill="#8f1f33" />
      {/* face: quiet — eyes + a small muted carrot */}
      <circle cx="40.5" cy="23" r="1.5" fill="#2b2925" />
      <circle cx="49.5" cy="23" r="1.5" fill="#2b2925" />
      <path d="M45 26.5l6 2.2-6 2.2z" fill="#c07a3a" />
      {/* scarf, muted crimson, knotted low */}
      <path d="M33.5 35.5c7.5 4.5 16.5 4.5 23 0l-1.6 6.2c-6.2 3.6-13.8 3.6-19.8 0z" fill="#8f1f33" />
      <path d="M51 39.5l5 12.5-5.4 1.8z" fill="#8f1f33" />
      {/* three buttons, enough */}
      <circle cx="45" cy="49" r="2.1" fill="#2b2925" />
      <circle cx="45" cy="57" r="2.1" fill="#2b2925" />
      <circle cx="45" cy="82" r="2.3" fill="#2b2925" />
      <circle cx="45" cy="91" r="2.3" fill="#2b2925" />
    </svg>
  );
}
