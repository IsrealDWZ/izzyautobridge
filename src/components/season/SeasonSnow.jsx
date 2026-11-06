// Snowfall overlay for dark hero panels. Three pattern layers of CSS dots
// drift downward at different speeds; no JS, no images, and the whole thing
// is display:none under prefers-reduced-motion. Mount only while the season
// is festive.
export default function SeasonSnow() {
  return (
    <div className="season-snow" aria-hidden="true">
      <i className="season-snow-layer-1" />
      <i className="season-snow-layer-2" />
      <i className="season-snow-layer-3" />
    </div>
  );
}
