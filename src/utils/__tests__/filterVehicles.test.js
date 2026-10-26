import { describe, expect, it } from 'vitest';

import { filterVehicles, matchesSearch, normalizeSearch } from '../filterVehicles';

const FILTERS = {
  brands: [],
  fuel: [],
  body: [],
  status: [],
  category: [],
  priceRange: [0, 10000000],
  yearRange: [1900, 2030],
};

const VEHICLES = [
  {
    ID: 'IZZY-TOYOTA-COROLLA-2022',
    Brand: 'Toyota',
    Model: 'Corolla',
    Variant: 'LE',
    Year: 2022,
    Fuel_Type: 'Fuel',
    Body_Type: 'Sedan',
    Status: 'Available',
    Category: 'Fuel',
    Price_GHS: 180000,
  },
  {
    ID: 'IZZY-BMW-X5-2022',
    Brand: 'BMW',
    Model: 'X5',
    Variant: 'xDrive40i',
    Year: 2022,
    Fuel_Type: 'Fuel',
    Body_Type: 'SUV',
    Status: 'Available',
    Category: 'Fuel',
    Price_GHS: 650000,
  },
];

describe('normalizeSearch', () => {
  it('trims and lowercases the query', () => {
    expect(normalizeSearch('  Toyota Corolla  ')).toBe('toyota corolla');
  });

  it('handles empty values', () => {
    expect(normalizeSearch()).toBe('');
    expect(normalizeSearch(null)).toBe('');
  });
});

describe('matchesSearch', () => {
  it('returns true for an empty query', () => {
    expect(matchesSearch(VEHICLES[0], '')).toBe(true);
    expect(matchesSearch(VEHICLES[0], '   ')).toBe(true);
  });

  it('matches make, model, variant and stock ID case-insensitively', () => {
    expect(matchesSearch(VEHICLES[0], 'toyota')).toBe(true);
    expect(matchesSearch(VEHICLES[0], 'COROLLA')).toBe(true);
    expect(matchesSearch(VEHICLES[0], 'le')).toBe(true);
    expect(matchesSearch(VEHICLES[0], 'corolla-2022')).toBe(true);
  });

  it('requires every token to match', () => {
    expect(matchesSearch(VEHICLES[0], 'toyota 2022')).toBe(true);
    expect(matchesSearch(VEHICLES[0], 'toyota x5')).toBe(false);
  });
});

describe('filterVehicles', () => {
  it('returns all vehicles for empty filters and query', () => {
    expect(filterVehicles(VEHICLES, FILTERS, '')).toHaveLength(2);
  });

  it('applies the search query', () => {
    const result = filterVehicles(VEHICLES, FILTERS, 'bmw');
    expect(result).toEqual([VEHICLES[1]]);
  });

  it('combines search with the sidebar filters', () => {
    const filters = { ...FILTERS, brands: ['Toyota'] };
    expect(filterVehicles(VEHICLES, filters, 'corolla')).toEqual([VEHICLES[0]]);
    expect(filterVehicles(VEHICLES, filters, 'bmw')).toEqual([]);
  });

  it('applies price and year ranges', () => {
    const filters = { ...FILTERS, priceRange: [0, 200000], yearRange: [2022, 2022] };
    expect(filterVehicles(VEHICLES, filters, '')).toEqual([VEHICLES[0]]);
  });
});
