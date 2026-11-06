// Date-driven season phases for the festive visual refresh. Mirrors the
// pricing ladder in {@link ./markup.js} so the site, its prices and its
// decoration all switch on the same dates with no manual work.
//
// Phases (Israel's plan, agreed 6 Nov 2026):
//   - 'off'           before 24 Nov 2026 and after 2 Jan 2027
//   - 'anticipation'  24–30 Nov 2026: teaser strip + countdown, normal look
//   - 'festive'       1–31 Dec 2026: full festive visuals + cut markup
//   - 'winddown'      1–2 Jan 2027: accents off, one closing line, then clean
//
// To run the promotion again another year, adjust the window constants below.
const ANTICIPATION_WINDOW = { start: '2026-11-24', end: '2026-11-30' };
const FESTIVE_WINDOW = { start: '2026-12-01', end: '2026-12-31' };
const WINDDOWN_WINDOW = { start: '2027-01-01', end: '2027-01-02' };

const DAY_MS = 24 * 60 * 60 * 1000;

// Canonical sample dates so a Forced preview shows each phase mid-flight
// (teaser already shipping, festive running, December just ended).
const PREVIEW_PHASE_DATES = {
  anticipation: '2026-11-27',
  festive: '2026-12-15',
  winddown: '2027-01-01',
};

function isoOf(now) {
  return now.toISOString().slice(0, 10);
}

/**
 * The reference date UI code should resolve the season against. Precedence:
 *  1. A build-time pin via VITE_SEASON_DATE (the "preview:xmas" build).
 *  2. A ?season=<phase> URL override for a live look at any build.
 *  3. Today.
 * Node-side scripts instead pin via {@link previewDate} (SEASON_DATE), so a
 * preview build can align prices (built December-style) with pixels.
 * @param {Date} [fallback] - Date to use when no override is present.
 * @returns {Date} The effective preview date.
 */
export function uiNow(fallback = new Date()) {
  const pinned = import.meta.env?.VITE_SEASON_DATE;
  if (pinned) {
    const parsed = Date.parse(`${pinned}T12:00:00Z`);
    if (Number.isFinite(parsed)) return new Date(parsed);
  }
  if (typeof window !== 'undefined') {
    const param = new URLSearchParams(window.location.search).get('season');
    if (param && PREVIEW_PHASE_DATES[param]) {
      return new Date(`${PREVIEW_PHASE_DATES[param]}T12:00:00Z`);
    }
  }
  return fallback;
}

/**
 * The reference date for build-process pricing (node side). Pinned by the
 * SEASON_DATE env var so a preview build can price as December.
 * @param {Date} [fallback] - Date to use when no env pin is present.
 * @returns {Date} The effective preview date.
 */
export function previewDate(fallback = new Date()) {
  const iso =
    typeof process !== 'undefined' && process.env ? process.env.SEASON_DATE : undefined;
  if (iso) {
    const parsed = Date.parse(`${iso}T12:00:00Z`);
    if (Number.isFinite(parsed)) return new Date(parsed);
  }
  return fallback;
}

/**
 * True when the season was forced by a browser URL override (?season=…) or a
 * build pin rather than the real calendar — used so preview-only states can
 * be labeled as such in the UI.
 * @returns {boolean} Whether a preview override is active.
 */
export function isSeasonOverridden() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SEASON_DATE) {
    return true;
  }
  if (typeof window !== 'undefined') {
    return Boolean(
      new URLSearchParams(window.location.search).get('season') &&
        PREVIEW_PHASE_DATES[
          new URLSearchParams(window.location.search).get('season')
        ]
    );
  }
  return false;
}

/**
 * The season phase in force on the given date.
 * @param {Date} [now] - Reference date; defaults to the current date.
 * @returns {'off'|'anticipation'|'festive'|'winddown'} Current phase.
 */
export function currentSeason(now = new Date()) {
  const iso = isoOf(now);
  if (iso >= ANTICIPATION_WINDOW.start && iso <= ANTICIPATION_WINDOW.end) {
    return 'anticipation';
  }
  if (iso >= FESTIVE_WINDOW.start && iso <= FESTIVE_WINDOW.end) {
    return 'festive';
  }
  if (iso >= WINDDOWN_WINDOW.start && iso <= WINDDOWN_WINDOW.end) {
    return 'winddown';
  }
  return 'off';
}

/**
 * Whole days of anticipation left until festive prices land (1 Dec).
 * Clamped at zero so late builds never show a negative count.
 * @param {Date} [now] - Reference date; defaults to the current date.
 * @returns {number} Days to 1 Dec, minimum 0.
 */
export function daysToFestive(now = new Date()) {
  const start = Date.parse(`${FESTIVE_WINDOW.start}T00:00:00Z`);
  const today = Date.parse(`${isoOf(now)}T00:00:00Z`);
  if (!Number.isFinite(start)) return 0;
  return Math.max(0, Math.ceil((start - today) / DAY_MS));
}

/**
 * Items for the top marquee in the current phase. Normal shipping items
 * outside the season; countdown/urgency items during it.
 * @param {Date} [now] - Reference date; defaults to the current date.
 * @returns {string[]} Marquee strings.
 */
export function seasonMarqueeItems(now = new Date()) {
  const phase = currentSeason(now);
  if (phase === 'anticipation') {
    const days = daysToFestive(now);
    const plural = days === 1 ? 'day' : 'days';
    return [
      'Festive prices arrive 1 December',
      `${days} ${plural} to the festive price drop`,
      'Pre-book your unit on WhatsApp',
    ];
  }
  if (phase === 'festive') {
    return [
      'Festive prices live on every unit',
      'This cut ends 31 December',
      'Free shipping to Tema, always',
    ];
  }
  if (phase === 'winddown') {
    return ['Festive prices have ended. Standard pricing is back.'];
  }
  return [];
}

/**
 * A sentence to fold into hero subtitles in the current phase ('festive'
 * only — the anticipation phase is carried by the marquee countdown).
 * @param {Date} [now] - Reference date; defaults to the current date.
 * @returns {string} Sentence, or '' outside the season.
 */
export function seasonHeroLine(now = new Date()) {
  if (currentSeason(now) === 'festive') {
    return 'Festive prices are on every unit through 31 December. Lock yours in now.';
  }
  return '';
}
