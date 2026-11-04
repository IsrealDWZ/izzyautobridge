import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const CACHE_PATH = path.join(ROOT_DIR, 'src', 'data', 'exchange-rate.json');
const SAFETY_MARGIN = 0.03; // 3% buffer to avoid losses
const API_URL = 'https://open.er-api.com/v6/latest/USD';
const FALLBACK_RATE = 12.0;

// Fidelity Bank Ghana publishes a USD buying/selling table. We anchor to the
// selling rate (what a customer pays for USD) rather than guessing a spread:
// sample both quotes on the same day, store the ratio, and let the daily build
// apply it to whatever the general market rate is. Re-measure periodically
// (monthly is realistic) and update the sample below.
const FIDELITY_ANCHOR = {
  side: 'selling',
  sampleRate: 11.76,
  sampleMarketRate: 11.67886,
  sampledAt: '2026-11-04',
  source: 'fidelitybank.com.gh/rates',
};
const FIDELITY_RATIO = Number(
  (FIDELITY_ANCHOR.sampleRate / FIDELITY_ANCHOR.sampleMarketRate).toFixed(6)
);

async function fetchRate() {
  try {
    console.log('Fetching USD/GHS rate from exchangerate-api.com...');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`API responded ${response.status}`);

    const data = await response.json();

    if (data.result !== 'success') throw new Error('API returned error');

    const rate = data.rates?.GHS;

    if (!rate || typeof rate !== 'number') throw new Error('Invalid rate format');

    console.log(`Fetched rate: 1 USD = ${rate} GHS`);
    return rate;
  } catch (err) {
    console.warn(`Failed to fetch live rate: ${err.message}`);
    return null;
  }
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
    if (data.rate && typeof data.rate === 'number') {
      return data;
    }
  } catch {}
  return null;
}

function saveRate(rate, marketRate) {
  const payload = {
    rate,
    marketRate,
    fidelityAnchor: {
      ...FIDELITY_ANCHOR,
      ratio: FIDELITY_RATIO,
    },
    fetchedAt: new Date().toISOString(),
    source: 'exchangerate-api.com (open.er-api.com)',
    safetyMargin: SAFETY_MARGIN,
  };
  fs.writeFileSync(CACHE_PATH, JSON.stringify(payload, null, 2));
  console.log(`Saved rate to ${CACHE_PATH}`);
}

function applyPricing(rate) {
  const anchored = rate * FIDELITY_RATIO;
  const adjusted = Math.round(anchored * (1 + SAFETY_MARGIN) * 100) / 100;
  console.log(
    `Applied Fidelity ${FIDELITY_ANCHOR.side} anchor (x${FIDELITY_RATIO}): ${rate} -> ${anchored.toFixed(2)}`
  );
  console.log(
    `Applied ${(SAFETY_MARGIN * 100).toFixed(0)}% safety margin: ${anchored.toFixed(2)} -> ${adjusted}`
  );
  return adjusted;
}

async function main() {
  console.log('=== FETCHING EXCHANGE RATE ===');

  const liveRate = await fetchRate();
  const cache = loadCache();
  let finalRate;

  if (liveRate) {
    finalRate = applyPricing(liveRate);
    const unchanged = cache?.rate === finalRate && cache?.fidelityAnchor?.ratio === FIDELITY_RATIO;
    if (unchanged) {
      console.log(`Rate unchanged at ${finalRate} GHS/USD; keeping cache timestamp.`);
    } else {
      saveRate(finalRate, liveRate);
    }
  } else if (cache?.rate) {
    finalRate = cache.rate;
    console.log(`Using cached rate: 1 USD = ${finalRate} GHS (fetched ${cache.fetchedAt})`);
  } else {
    finalRate = applyPricing(FALLBACK_RATE);
    console.log(`Using fallback market rate with margin: ${finalRate}`);
  }

  console.log(`\nFinal USD/GHS rate for this build: ${finalRate}`);
  console.log(
    `This tracks Fidelity's ${FIDELITY_ANCHOR.side} rate (sampled ${FIDELITY_ANCHOR.sampledAt}) plus a ${(SAFETY_MARGIN * 100).toFixed(0)}% buffer.\n`
  );

  return finalRate;
}

main().catch(err => {
  console.error('Exchange rate fetch failed:', err);
  process.exit(1);
});
