import { describe, expect, it } from 'vitest';

import { computeAnchoredRate, computeObservedRatio, roundRate } from '../fetch-exchange-rate.js';

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
