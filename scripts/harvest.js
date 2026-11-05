import { harvestCategoryCSV } from './sources/category-csv.js';
import { harvestMainFeaturesCSV } from './sources/main-features-csv.js';
import { harvestMiscCSV } from './sources/misc-csv.js';

const HARVESTERS = [harvestMainFeaturesCSV, harvestCategoryCSV, harvestMiscCSV];

export async function runHarvest() {
  console.log('Starting harvest...');
  const results = [];

  for (const harvester of HARVESTERS) {
    try {
      const result = await harvester();
      results.push(result);
    } catch (err) {
      console.error(`Harvester ${harvester.name} failed:`, err);
      results.push({ rows: [], totalRows: 0, sourceName: harvester.name, error: err.message });
    }
  }

  const allRows = results.flatMap(r => r.rows);
  console.log(`\nHarvest complete. Total rows: ${allRows.length}`);

  return { allRows, harvestResults: results };
}