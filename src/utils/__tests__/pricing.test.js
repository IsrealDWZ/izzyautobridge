import { describe, expect, it } from 'vitest';

import { USD_GHS_RATE } from '../constants';
import { festiveAnchorGhs, ghsFromUsd, withFreshPrices } from '../pricing';

describe('ghsFromUsd', () => {
  it('converts a USD price to GHS and rounds like the data pipeline', () => {
    expect(ghsFromUsd(15000)).toBe(Math.round(15000 * USD_GHS_RATE));
  });
});

describe('withFreshPrices (render-time pricing)', () => {
  it('recomputes Price_GHS from Price_USD and the site rate', () => {
    const [fresh] = withFreshPrices([{ ID: 1, Price_USD: 15000, Price_GHS: 1 }]);
    expect(fresh.Price_GHS).toBe(ghsFromUsd(15000));
    expect(fresh.Price_USD).toBe(15000);
  });

  it('keeps the stored Price_GHS when there is no USD price', () => {
    const [fallback] = withFreshPrices([{ ID: 2, Price_GHS: 180000 }]);
    expect(fallback.Price_GHS).toBe(180000);
  });

  it('keeps properties other than the price untouched', () => {
    const [only] = withFreshPrices([
      { ID: 3, Brand: 'Toyota', Model: 'Corolla', Year: 2022, Price_USD: 12000, Price_GHS: 999 },
    ]);
    expect(only.Brand).toBe('Toyota');
    expect(only.Model).toBe('Corolla');
    expect(only.Year).toBe(2022);
  });
});

describe('festiveAnchorGhs (honest "was" anchor)', () => {
  it('bakes in the $700 step the festive ladder removed', () => {
    expect(festiveAnchorGhs(15000)).toBe(Math.round((15000 + 700) * USD_GHS_RATE));
  });
});
