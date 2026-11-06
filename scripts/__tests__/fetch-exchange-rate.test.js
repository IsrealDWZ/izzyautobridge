import { describe, expect, it } from 'vitest';

import { computeAnchoredRate, computeObservedRatio, resolveMarketRate, roundRate } from '../fetch-exchange-rate.js';

describe('resolveMarketRate (fallback chain)', () => {
  it('uses the live market rate when the fetch succeeds', () => {
    expect(resolveMarketRate(11.698248, { marketRate: 11.65 })).toBe(11.698248);
  });

  it('falls back to the cached market rate when the live fetch fails', () => {
    expect(resolveMarketRate(null, { marketRate: 11.65 })).toBe(11.65);
  });

  it('falls back to the anchor sample when live and cache both fail', () => {
    expect(resolveMarketRate(null, null)).toBe(11.67886);
    expect(resolveMarketRate(null, {})).toBe(11.67886);
  });

  it('only falls through on null or undefined, matching fetchMarketRate', () => {
    // fetchMarketRate() never returns 0 — falsy rates are rejected and surface
    // as null — so a 0 here passes through by definition of the nullish chain.
    expect(resolveMarketRate(0, { marketRate: 11.65 })).toBe(0);
    expect(resolveMarketRate(undefined, { marketRate: 11.65 })).toBe(11.65);
  });
});

describe('computeObservedRatio', () => {
  it('measures the Fidelity selling gap over the market rate', () => {
    expect(computeObservedRatio(11.76, 11.67886)).toBe(1.006948);
  });

  it('returns null when either side is missing', () => {
    expect(computeObservedRatio(11.76, null)).toBeNull();
    expect(computeObservedRatio(null, 11.67886)).toBeNull();
    expect(computeObservedRatio(0, 11.67886)).toBeNull();
  });
});

describe('computeAnchoredRate', () => {
  it('applies the Fidelity gap to the market rate without an extra buffer', () => {
    expect(computeAnchoredRate(11.67886)).toBe(11.76);
  });

  it('tracks the market rate while keeping the Fidelity premium', () => {
    expect(computeAnchoredRate(11.690671)).toBe(11.77);
  });

  it('accepts an explicit ratio', () => {
    expect(computeAnchoredRate(10, 1.1)).toBe(11);
  });
});

describe('roundRate', () => {
  it('rounds half up at two decimals', () => {
    expect(roundRate(12.1128)).toBe(12.11);
    expect(roundRate(12.115)).toBe(12.12);
  });
});
