import { execFile } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export const FIDELITY_RATES_URL = 'https://fidelitybank.com.gh/rates';

const BROWSER_UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36';

const CHROME_CANDIDATES = [
  process.env.CHROME_BIN,
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

function stripTags(value) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toNumber(value) {
  const match = stripTags(value).match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const number = Number(match[0]);
  return Number.isFinite(number) && number > 0 ? number : null;
}

/**
 * Parse the USD row out of Fidelity Bank Ghana's published forex table.
 *
 * The page is a WordPress/Elementor build with a stable `forex-rates` table,
 * so a small, tolerant parser is enough and avoids a DOM dependency.
 *
 * @param {string} html
 * @returns {{ buying: number, selling: number, asAt: string | null, source: string } | null}
 */
export function parseFidelityRates(html) {
  if (!html || typeof html !== 'string') return null;

  const tableMatch = html.match(/<table[^>]*forex-rates[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return null;

  const rows = tableMatch[1].match(/<tr[\s\S]*?<\/tr>/gi) || [];
  const usdRow = rows.find(row => /<td[^>]*>\s*USD\s*<\/td>/i.test(row));
  if (!usdRow) return null;

  const cells = [...usdRow.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(match => match[1]);
  if (cells.length < 3) return null;

  const buying = toNumber(cells[1]);
  const selling = toNumber(cells[2]);
  if (!buying || !selling) return null;

  const asAtMatch = html.match(/As at\s+([^<]+)/i);

  return {
    buying,
    selling,
    asAt: asAtMatch ? asAtMatch[1].trim() : null,
    source: FIDELITY_RATES_URL,
  };
}

async function fetchViaHttp(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'text/html,application/xhtml+xml',
        'user-agent': BROWSER_UA,
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchViaChrome(url, timeoutMs = 60000) {
  for (const binary of CHROME_CANDIDATES) {
    const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fidelity-chrome-'));
    try {
      const { stdout } = await execFileAsync(
        binary,
        [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--hide-scrollbars',
          `--user-data-dir=${profileDir}`,
          '--virtual-time-budget=20000',
          '--dump-dom',
          url,
        ],
        { timeout: timeoutMs, maxBuffer: 16 * 1024 * 1024 }
      );
      if (stdout && stdout.length > 0) return stdout;
    } catch {
      // Try the next Chrome/Chromium binary.
    } finally {
      try {
        fs.rmSync(profileDir, { recursive: true, force: true });
      } catch {
        // Best-effort cleanup; a locked profile should not fail the fetch.
      }
    }
  }
  return null;
}

/**
 * Fetch Fidelity Bank Ghana's current USD buying/selling rates.
 *
 * A plain HTTP request is tried first because it is fast and works when the
 * Sucuri challenge is not active. When the challenge HTML comes back without
 * the rate table, a headless browser renders the page and the parsed DOM is
 * used instead.
 *
 * @returns {Promise<{ buying: number, selling: number, asAt: string | null, source: string, via: string, fetchedAt: string } | null>}
 */
export async function fetchFidelityRates() {
  const plainHtml = await fetchViaHttp(FIDELITY_RATES_URL);
  const plain = parseFidelityRates(plainHtml);
  if (plain) {
    return { ...plain, via: 'http', fetchedAt: new Date().toISOString() };
  }

  console.log('Fidelity page needs a browser (anti-bot challenge); rendering headless Chrome...');
  const renderedHtml = await fetchViaChrome(FIDELITY_RATES_URL);
  const rendered = parseFidelityRates(renderedHtml);
  if (rendered) {
    return { ...rendered, via: 'headless-chrome', fetchedAt: new Date().toISOString() };
  }

  return null;
}
