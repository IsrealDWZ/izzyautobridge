import crypto from 'crypto';

const SOURCE_PRIORITY = {
  'main-features-csv': 1,
  'category-csv': 2,
  'misc-csv': 3,
  'changan-xlsx': 4,
  'changan-quote-xlsx': 5,
  'new-cars-export-xlsx': 6,
};

function makeDedupeKey(row) {
  const makes = row.Makes?.trim().toLowerCase() || '';
  const models = row.Models?.trim().toLowerCase() || '';
  const years = row.Years?.trim() || '';
  const trim = row['Trim / Edition']?.trim().toLowerCase() || '';
  return `${makes}|${models}|${years}|${trim}`;
}

function rowHash(row) {
  const str = JSON.stringify(row._raw || row);
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 8);
}

export function dedupeRows(rows) {
  const groups = new Map();
  const collisions = [];

  for (const row of rows) {
    const key = makeDedupeKey(row);
    const hash = rowHash(row);
    const sourceType = row._sourceType || 'unknown';
    const priority = SOURCE_PRIORITY[sourceType] ?? 99;

    if (!groups.has(key)) {
      groups.set(key, { row, priority, hash, sourceType });
    } else {
      const existing = groups.get(key);
      collisions.push({
        key,
        winner: { source: existing.sourceType, priority: existing.priority, hash: existing.hash },
        loser: { source: sourceType, priority, hash },
      });

      if (priority < existing.priority) {
        groups.set(key, { row, priority, hash, sourceType });
      }
    }
  }

  const deduped = Array.from(groups.values()).map(g => g.row);

  return { deduped, collisions, totalInput: rows.length };
}