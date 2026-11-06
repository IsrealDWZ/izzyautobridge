// Per-vehicle profit markup in USD, applied at build time as:
//   Price_USD = CIF_USD + markup
// Israel's pricing ladder (agreed 6 Nov 2026):
//   - $1,000 legacy markup, in force until 1 Dec 2026
//   - $300 festive-season markup for all of December 2026 (profit-only,
//     the site keeps showing full prices until the window opens)
//   - $550 permanent markup from 1 Jan 2027 (the new steady level — the
//     old $1,000 never comes back)
// The window is date-driven so the markup resolves itself on every build;
// no manual regeneration is needed on the flip days. Ghana is UTC+0, so
// UTC dates match the market's calendar.
const LEGACY_MARKUP_USD = 1000;
const FESTIVE_MARKUP_USD = 300;
const STANDARD_MARKUP_USD = 550;
const FESTIVE_WINDOW = { start: '2026-12-01', end: '2026-12-31' };
const STANDARD_MARKUP_FROM = '2027-01-01';

/**
 * The per-vehicle markup in USD in force on the given date.
 * @param {Date} [now] - Reference date; defaults to the current date.
 * @returns {number} Markup in USD.
 */
export function currentMarkupUsd(now = new Date()) {
  const iso = now.toISOString().slice(0, 10);
  if (iso >= FESTIVE_WINDOW.start && iso <= FESTIVE_WINDOW.end) {
    return FESTIVE_MARKUP_USD;
  }
  if (iso >= STANDARD_MARKUP_FROM) {
    return STANDARD_MARKUP_USD;
  }
  return LEGACY_MARKUP_USD;
}

/**
 * A human-readable label describing the window the date falls into, for
 * build logs. Same boundaries as currentMarkupUsd.
 * @param {Date} [now] - Reference date; defaults to the current date.
 * @returns {'legacy'|'festive'|'standard'} Window label.
 */
export function currentMarkupWindow(now = new Date()) {
  const iso = now.toISOString().slice(0, 10);
  if (iso >= FESTIVE_WINDOW.start && iso <= FESTIVE_WINDOW.end) {
    return 'festive';
  }
  if (iso >= STANDARD_MARKUP_FROM) {
    return 'standard';
  }
  return 'legacy';
}
