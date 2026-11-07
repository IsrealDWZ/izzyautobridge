// Santa's sleigh and reindeer as an elegant near-black silhouette with thin
// gold accents — reads like a premium decal against the dark cargo photo
// rather than a cartoon. Pure SVG, aria-hidden wherever it mounts; flown by
// the `.season-santa` keyframes in index.css while the season is festive.
const INK = '#25231f';
const GOLD = '#d9a53c';

export default function SantaSleigh({ className = '' }) {
  return (
    <svg viewBox="0 0 260 120" className={className} aria-hidden="true" focusable="false">
      {/* reindeer: strides rendered as slender ink shapes, no face */}
      <g fill={INK}>
        <ellipse cx="50" cy="60" rx="24" ry="9" />
        <path d="M34 66l-3 17h4l3-15zM44 68l0 18h4l0-18zM56 68l0 18h4l0-18zM62 66l7 15 4-2-7-14z" stroke={INK} strokeWidth="2.6" fill="none" />
        {/* neck + small head, muzzle lifted */}
        <path d="M66 56l15-13c3-2 7 0 5 3l-10 13z" />
        <circle cx="86" cy="42" r="6.4" />
        {/* antlers — thin branching strokes */}
        <path d="M84 36l-5-11M84 36l-9-5M84 36l5-11M84 36l8-6" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* tail */}
        <path d="M27 56l-7-3 2 7z" />
        {/* gift sack */}
        <path d="M146 60c-5-22 17-30 27-21 11 10 4 36-7 40-12 3-16-7-20-19z" />
        {/* santa torso + raised arm, head small, hat trailing back */}
        <path d="M148 58c-1-12 7-20 17-20 9 0 15 8 14 20z" />
        <path d="M156 44l-14-10" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="169" cy="31" r="6.6" />
        <path d="M162 26c-1-8 5-13 11-12l9 4-2 6c-5-2-12-2-18 2z" />
      </g>
      {/* cream details: beard wedge under the face, pom at the hat trail */}
      <path d="M163 33c-1 7 2 10 6 10s7-3 6-9c-3 2-9 2-12-1z" fill="#f3f6f2" />
      <circle cx="184" cy="20" r="2.8" fill="#f3f6f2" />
      {/* sleigh hull */}
      <path
        d="M104 58c-4 34 20 48 44 48h62c22 0 30-15 28-30h-30c-2 11-13 16-28 16h-32c-19 0-31-11-34-34z"
        fill={INK}
      />
      {/* gold accents: harness, reins, rail, runner */}
      <path d="M85 44c-10 8-15 12-22 17" stroke={GOLD} strokeWidth="1.8" fill="none" />
      <path d="M90 42c18-4 34-2 52-8" stroke={GOLD} strokeWidth="1.4" fill="none" />
      <path d="M104 58c2 20 14 31 34 33" stroke={GOLD} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M100 110c30 7 88 7 132 0" stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
