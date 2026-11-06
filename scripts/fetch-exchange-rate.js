import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchFidelityRates } from './fidelity-rate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const CACHE_PATH = path.join(ROOT_DIR, 'src', 'data', 'exchange-rate.json');
const API_URL = 'https://open.er-api.com/v6/latest/USD';
// Last-resort market proxy when both the live API and the cache are missing.
// It is the market rate sampled with Fidelity's quote, so applying the ratio
// reproduces Fidelity's published selling rate instead of inflating it.
const FALLBACK_MARKET_RATE = 11.67886;

// Fidelity's published quote is used as an observed gap, not as the absolute
// pricing base. Sample both quotes on the same day, store the selling/market
// ratio, and apply that ratio to the live market rate. The gap already carries
// Fidelity's retail premium, so no extra safety margin is added on top. The
// sample stays for auditability and as the fallback when no quote is available.
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

// A quote older than this is refreshed on the next build. Weekends can leave
// Fidelity's last published quote in place for a couple of days, so the cached
// quote is still used when a refresh fails.
const FIDELITY_MAX_AGE_HOURS = 24;

export function roundRate(value) {
  return Math.round(value * 100) / 100;
}

export function computeObservedRatio(sellingRate, marketRate) {
  if (!sellingRate || !marketRate) return null;
  return Number((sellingRate / marketRate).toFixed(6));
}

export function computeAnchoredRate(marketRate, ratio = FIDELITY_RATIO) {
  return roundRate(marketRate * ratio);
}

/**
 * Resolve the market rate for this build: live quote first, then the cached
 * market rate, then the anchor sample as the last resort. Only null/undefined
 * trigger the fallbacks — a fetch failure is expressed as null, never as 0,
 * because fetchMarketRate() rejects falsy rates before returning.
 * @param {number|null|undefined} liveRate - Live market rate, or null when the fetch fails.
 * @param {{marketRate?: number}|null|undefined} cache - Cached exchange-rate payload.
 * @returns {number} Market rate in GHS per USD.
 */
export function resolveMarketRate(liveRate, cache) {
  return liveRate ?? cache?.marketRate ?? FALLBACK_MARKET_RATE;
}

async function fetchMarketRate() {
  try {
    console.log('Fetching USD/GHS market rate from exchangerate-api.com...');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`API responded ${response.status}`);

    const data = await response.json();

    if (data.result !== 'success') throw new Error('API returned error');

    const rate = data.rates?.GHS;

    if (!rate || typeof rate !== 'number') throw new Error('Invalid rate format');

    console.log(`Fetched market rate: 1 USD = ${rate} GHS`);
    return rate;
  } catch (err) {
    console.warn(`Failed to fetch live market rate: ${err.message}`);
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

function quoteAgeHours(quote) {
  const fetchedAt = Date.parse(quote?.fetchedAt || '');
  if (!Number.isFinite(fetchedAt)) return Infinity;
  return (Date.now() - fetchedAt) / (60 * 60 * 1000);
}

function isQuoteFresh(quote) {
  return quoteAgeHours(quote) < FIDELITY_MAX_AGE_HOURS;
}

function warn(message) {
  console.warn(message);
  if (process.env.GITHUB_ACTIONS === 'true') console.log(`::warning::${message}`);
}

function sameQuote(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.selling === b.selling && a.asAt === b.asAt;
}

async function resolveFidelityQuote(cache, marketRate) {
  const force = process.env.FIDELITY_FORCE === '1';

  if (force || !isQuoteFresh(cache?.fidelityLive)) {
    console.log('Fetching live Fidelity Bank USD/GHS rate...');
    const live = await fetchFidelityRates();
    if (live) {
      const observedRatio = computeObservedRatio(live.selling, marketRate);
      console.log(
        `Fidelity USD: buying ${live.buying}, selling ${live.selling} (as at ${
          live.asAt ?? 'unknown'
        }) via ${live.via}`
      );
      console.log(
        `Observed Fidelity gap: ${((observedRatio - 1) * 100).toFixed(2)}% over the market rate`
      );
      return { ...live, observedRatio, marketRateAtFetch: marketRate };
    }
    warn('Live Fidelity rate unavailable; falling back to the cached quote if one exists.');
  }

  if (cache?.fidelityLive?.selling) {
    const age = quoteAgeHours(cache.fidelityLive);
    const observedRatio =
      cache.fidelityLive.observedRatio ??
      computeObservedRatio(
        cache.fidelityLive.selling,
        cache.fidelityLive.marketRateAtFetch ?? cache.marketRate
      );
    console.log(
      `Using cached Fidelity selling rate ${cache.fidelityLive.selling} (as at ${
        cache.fidelityLive.asAt ?? 'unknown'
      }, fetched ${cache.fidelityLive.fetchedAt}, ${age.toFixed(1)}h ago)`
    );
    if (age > 72) {
      warn(
        `Cached Fidelity quote is ${age.toFixed(0)} hours old; check the rate refresh workflow.`
      );
    }
    return { ...cache.fidelityLive, observedRatio };
  }

  return null;
}

function saveRate(payload) {
  fs.writeFileSync(CACHE_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Saved rate to ${CACHE_PATH}`);
}

async function main() {
  console.log('=== FETCHING EXCHANGE RATE ===');

  const cache = loadCache();
  const marketRate = resolveMarketRate(await fetchMarketRate(), cache);
  const fidelity = await resolveFidelityQuote(cache, marketRate);

  const finalRate = computeAnchoredRate(marketRate);
  const source = 'exchangerate-api.com market rate x Fidelity selling gap';
  console.log(
    `Applied Fidelity gap (x${FIDELITY_RATIO}) to market rate: ${marketRate} -> ${finalRate}`
  );

  if (fidelity?.observedRatio) {
    const driftPct = (fidelity.observedRatio - FIDELITY_RATIO) * 100;
    if (Math.abs(driftPct) >= 0.5) {
      const anchorPct = ((FIDELITY_RATIO - 1) * 100).toFixed(2);
      warn(
        `Fidelity's observed gap is ${driftPct.toFixed(2)} percentage points away from the stored +${anchorPct}% anchor; consider updating FIDELITY_ANCHOR.`
      );
    }
  }

  const payload = {
    rate: finalRate,
    marketRate,
    fidelityAnchor: {
      ...FIDELITY_ANCHOR,
      ratio: FIDELITY_RATIO,
    },
    fetchedAt: new Date().toISOString(),
    source,
  };

  if (fidelity) {
    payload.fidelityLive = {
      buying: fidelity.buying,
      selling: fidelity.selling,
      asAt: fidelity.asAt,
      fetchedAt: fidelity.fetchedAt,
      via: fidelity.via,
      source: fidelity.source,
      observedRatio: fidelity.observedRatio,
      marketRateAtFetch: fidelity.marketRateAtFetch ?? cache?.fidelityLive?.marketRateAtFetch,
    };
  }

  const unchanged =
    cache?.rate === payload.rate &&
    cache?.fidelityAnchor?.ratio === payload.fidelityAnchor.ratio &&
    sameQuote(cache?.fidelityLive, payload.fidelityLive);

  if (unchanged) {
    console.log(`Rate unchanged at ${finalRate} GHS/USD; keeping cache timestamp.`);
  } else {
    saveRate(payload);
  }

  console.log(`\nFinal USD/GHS rate for this build: ${finalRate}`);
  console.log(`Source: ${source}\n`);

  return finalRate;
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch(err => {
    console.error('Exchange rate fetch failed:', err);
    process.exit(1);
  });
}
