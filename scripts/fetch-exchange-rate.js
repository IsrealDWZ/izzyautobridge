import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const CACHE_PATH = path.join(ROOT_DIR, 'src', 'data', 'exchange-rate.json');
const SAFETY_MARGIN = 0.03; // 3% buffer to avoid losses
const API_URL = 'https://open.er-api.com/v6/latest/USD';
const FALLBACK_RATE = 12.0;

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

function saveRate(rate) {
  const payload = {
    rate,
    fetchedAt: new Date().toISOString(),
    source: 'exchangerate-api.com (open.er-api.com)',
    safetyMargin: SAFETY_MARGIN,
  };
  fs.writeFileSync(CACHE_PATH, JSON.stringify(payload, null, 2));
  console.log(`Saved rate to ${CACHE_PATH}`);
}

function applySafetyMargin(rate) {
  const adjusted = Math.round(rate * (1 + SAFETY_MARGIN) * 100) / 100;
  console.log(`Applied ${(SAFETY_MARGIN * 100).toFixed(0)}% safety margin: ${rate} -> ${adjusted}`);
  return adjusted;
}

async function main() {
  console.log('=== FETCHING EXCHANGE RATE ===');
  
  const liveRate = await fetchRate();
  const cache = loadCache();
  let finalRate;
  
  if (liveRate) {
    finalRate = applySafetyMargin(liveRate);
    if (cache?.rate === finalRate) {
      console.log(`Rate unchanged at ${finalRate} GHS/USD; keeping cache timestamp.`);
    } else {
      saveRate(finalRate);
    }
  } else if (cache?.rate) {
    finalRate = cache.rate;
    console.log(`Using cached rate: 1 USD = ${finalRate} GHS (fetched ${cache.fetchedAt})`);
  } else {
    finalRate = applySafetyMargin(FALLBACK_RATE);
    console.log(`Using fallback rate with margin: ${finalRate}`);
  }
  
  console.log(`\nFinal USD/GHS rate for this build: ${finalRate}`);
  console.log(`This includes a ${(SAFETY_MARGIN * 100).toFixed(0)}% buffer to protect against rate fluctuations.\n`);
  
  return finalRate;
}

main().catch(err => {
  console.error('Exchange rate fetch failed:', err);
  process.exit(1);
});
