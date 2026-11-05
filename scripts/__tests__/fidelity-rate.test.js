import { describe, expect, it } from 'vitest';

import { parseFidelityRates } from '../fidelity-rate.js';

const RATES_HTML = `
<div class="elementor-widget-container">
  <table class="table forex-rates">
    <thead><tr><th>currency</th><th>buying</th><th>selling</th></tr></thead>
    <tbody>
      <tr><td>USD</td><td><span data-teams="true">11.4500<br></span></td><td><span data-teams="true">11.7600</span></td></tr>
      <tr><td>GBP</td><td><span data-teams="true">15.3500</span></td><td><span data-teams="true">15.8700</span></td></tr>
      <tr><td>EUR</td><td><span data-teams="true">12.8000</span></td><td><span data-teams="true">13.2500</span></td></tr>
    </tbody>
  </table>
  <p>As at 4th November, 2026</p>
</div>`;

describe('parseFidelityRates', () => {
  it('extracts the USD buying and selling rates', () => {
    expect(parseFidelityRates(RATES_HTML)).toMatchObject({
      buying: 11.45,
      selling: 11.76,
      asAt: '4th November, 2026',
      source: 'https://fidelitybank.com.gh/rates',
    });
  });

  it('ignores the other currency rows', () => {
    const parsed = parseFidelityRates(RATES_HTML);
    expect(parsed.buying).toBe(11.45);
    expect(parsed.selling).toBe(11.76);
  });

  it('returns null for the Sucuri challenge page', () => {
    expect(
      parseFidelityRates(
        '<html><title>You are being redirected...</title><script>eval(...)</script></html>'
      )
    ).toBeNull();
  });

  it('returns null when the forex table is missing', () => {
    expect(parseFidelityRates('<table><tr><td>USD</td></tr></table>')).toBeNull();
  });

  it('returns null when the USD row has no rates', () => {
    const html = '<table class="forex-rates"><tr><td>USD</td><td>n/a</td><td>n/a</td></tr></table>';
    expect(parseFidelityRates(html)).toBeNull();
  });

  it('returns null for empty or non-string input', () => {
    expect(parseFidelityRates('')).toBeNull();
    expect(parseFidelityRates(null)).toBeNull();
    expect(parseFidelityRates(undefined)).toBeNull();
  });
});
