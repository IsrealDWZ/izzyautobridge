import { describe, expect, it } from 'vitest';

import { computeAnchoredRate, computeLiveRate, roundRate } from '../fetch-exchange-rate.js';

describe('computeLiveRate', () => {
  it('applies the 3% safety margin to Fidelity selling', () => {
    expect(computeLiveRate(11.76)).toBe(12.11);
  });

  it('rounds to two decimals', () => {
    expect(computeLiveRate(11.45)).toBe(11.79);
  });

  it('accepts a custom margin', () => {
    expect(computeLiveRate(10, 0.1)).toBe(11);
  });
});

describe('computeAnchoredRate', () => {
  it('reproduces the sampled Fidelity rate from the market rate', () => {
    expect(computeAnchoredRate(11.67886)).toBe(12.11);
  });

  it('accepts an explicit ratio and margin', () => {
    expect(computeAnchoredRate(10, 1.1, 0.1)).toBe(12.1);
  });
});

describe('roundRate', () => {
  it('rounds half up at two decimals', () => {
    expect(roundRate(12.1128)).toBe(12.11);
    expect(roundRate(12.115)).toBe(12.12);
  });
});
