export default function BrandMark({ size = 30, className = '' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="6" fill="currentColor" />
      <path d="M30 44 V74" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M42 76 L58 38 L74 76 Z M51 76 V62 Q58 50 65 62 V76 Z"
      />
    </svg>
  );
}
