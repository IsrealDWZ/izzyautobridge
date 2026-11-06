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

function isoOf(now) {
  return now.toISOString().slice(0, 10);
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
      'Pre-book your unit via WhatsApp',
    ];
  }
  if (phase === 'festive') {
    return [
      'Festive prices are live — every unit cut for Christmas',
      'Festive pricing ends 31 December',
      'Free shipping to Tema, always',
    ];
  }
  if (phase === 'winddown') {
    return ['Festive prices have ended — standard pricing is back'];
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
    return 'Festive prices are on every unit through 31 December — lock yours in now.';
  }
  return '';
}
