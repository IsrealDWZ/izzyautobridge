// Tiny Santa cap pinned on the floating WhatsApp bubble (festive only, so
// the button stays unmistakably green otherwise). Pure SVG, aria-hidden.
export default function SantaHat({ className = '' }) {
  return (
    <svg viewBox="0 0 90 70" className={className} aria-hidden="true" focusable="false">
      {/* cone flops to the left, muted crimson to match the season tokens */}
      <path d="M64 22C58 4 40 4 30 16c-9 11-8 28-4 34l8-2c-2-14 2-26 10-32 8-6 16-4 20 6z" fill="#8f1f33" />
      {/* brim + pom */}
      <rect x="52" y="6" width="30" height="17" rx="8.5" fill="#f3f6f2" />
      <circle cx="26" cy="50" r="9" fill="#f3f6f2" />
    </svg>
  );
}
