/**
 * Format a rate timestamp in UTC so the date shown matches the fetch date
 * for Ghana (UTC+0) regardless of the visitor's time zone.
 * @param {string} value
 * @returns {string|null}
 */
export function formatRateDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
