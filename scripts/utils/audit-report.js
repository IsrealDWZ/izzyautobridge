import fs from 'fs';

export function generateAuditReport(harvestResults, dedupeResult, categorizedCounts, filteredCounts) {
  const lines = [];
  lines.push('=== MASTER CATALOG BUILD REPORT ===');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  lines.push('--- HARVEST ---');
  for (const result of harvestResults) {
    lines.push(`  ${result.sourceName}: ${result.totalRows} rows`);
  }
  lines.push(`  TOTAL RAW ROWS: ${harvestResults.reduce((sum, r) => sum + r.totalRows, 0)}`);
  lines.push('');

  lines.push('--- FILTER (rows with details + price > 0) ---');
  for (const [sourceType, count] of Object.entries(filteredCounts)) {
    lines.push(`  ${sourceType}: ${count} kept`);
  }
  lines.push('');

  lines.push('--- DEDUPE ---');
  lines.push(`  Input rows: ${dedupeResult.totalInput}`);
  lines.push(`  Unique keys: ${dedupeResult.deduped.length}`);
  lines.push(`  Collisions: ${dedupeResult.collisions.length}`);
  if (dedupeResult.collisions.length > 0) {
    lines.push('  Collision details (key | winner → loser):');
    for (const c of dedupeResult.collisions) {
      lines.push(
        `    ${c.key} | ${c.winner.source} (prio ${c.winner.priority}, hash ${c.winner.hash}) → ${c.loser.source} (prio ${c.loser.priority}, hash ${c.loser.hash})`
      );
    }
  }
  lines.push('');

  lines.push('--- CATEGORIES ---');
  for (const [cat, count] of Object.entries(categorizedCounts)) {
    lines.push(`  ${cat}: ${count}`);
  }
  lines.push(`  TOTAL: ${Object.values(categorizedCounts).reduce((a, b) => a + b, 0)}`);
  lines.push('');

  return lines.join('\n');
}

export function writeAuditReport(reportText, outputPath) {
  fs.writeFileSync(outputPath, reportText);
  console.log(`  Audit report written to ${outputPath}`);
}