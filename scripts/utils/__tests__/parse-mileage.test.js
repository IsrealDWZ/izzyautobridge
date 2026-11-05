import { describe, expect, it } from 'vitest';

import { parseMileage } from '../parse-mileage.js';

describe('parseMileage', () => {
  it('parses a single value with thousands separators', () => {
    expect(parseMileage('100,000 km')).toBe(100000);
  });

  it('uses the upper bound of a mileage range', () => {
    expect(parseMileage('19,000-22,000 km')).toBe(22000);
    expect(parseMileage('5,000-27,000 km')).toBe(27000);
  });

  it('handles a truncated lower bound', () => {
    expect(parseMileage('100-60,000 km')).toBe(60000);
  });

  it('returns the fallback for missing or unparseable values', () => {
    expect(parseMileage('')).toBe(0);
    expect(parseMileage(null)).toBe(0);
    expect(parseMileage(undefined)).toBe(0);
    expect(parseMileage('n/a')).toBe(0);
    expect(parseMileage('n/a', 123)).toBe(123);
  });
});
