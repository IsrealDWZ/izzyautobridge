export function normalize(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function levenshtein(a, b) {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
}

function scoreMatch(query, target) {
  const q = normalize(query);
  const t = normalize(target);
  if (q === t) return 100;
  if (t.includes(q)) return 90;
  if (q.includes(t)) return 85;
  const dist = levenshtein(q, t);
  const maxLen = Math.max(q.length, t.length);
  return Math.max(0, 70 - (dist / maxLen) * 70);
}

export function findBestMatch(query, candidates, threshold = 40) {
  const scored = candidates
    .map(c => ({ candidate: c, score: scoreMatch(query, c) }))
    .filter(m => m.score >= threshold)
    .sort((a, b) => b.score - a.score);
  return scored[0] || null;
}

export function findAllMatches(query, candidates, threshold = 30, maxResults = 4) {
  const scored = candidates
    .map(c => ({ candidate: c, score: scoreMatch(query, c) }))
    .filter(m => m.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
  return scored.map(m => m.candidate);
}