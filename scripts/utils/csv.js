// CSV helpers for the data pipeline.

/**
 * Escape a single CSV cell.
 *
 * Two jobs:
 *  1. Formula injection (OWASP): Excel and Google Sheets execute cells that
 *     start with = + - @ or a tab/CR, so prefix those with an apostrophe.
 *  2. Standard quoting: wrap cells containing a comma, quote or newline and
 *     double any inner quotes.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function escapeCsvCell(value) {
  let str = value == null ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(str)) str = `'${str}`;
  if (/[",\n\r]/.test(str)) str = `"${str.replace(/"/g, '""')}"`;
  return str;
}
