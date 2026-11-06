import { afterEach, describe, expect, it } from 'vitest';

import { currentSeason, daysToFestive, isSeasonOverridden, seasonHeroLine, seasonMarqueeItems, uiNow } from '../season.js';

const at = (iso) => new Date(`${iso}T00:00:00Z`);

function setSearch(search) {
  window.history.replaceState(null, '', `${window.location.pathname}${search}`);
}

describe('currentSeason (festive phase boundaries)', () => {
  it('is off before 24 Nov and from 3 Jan', () => {
    expect(currentSeason(at('2026-11-06'))).toBe('off');
    expect(currentSeason(at('2026-11-23'))).toBe('off');
    expect(currentSeason(at('2027-01-03'))).toBe('off');
  });

  it('teases from 24 Nov through 30 Nov', () => {
    expect(currentSeason(at('2026-11-24'))).toBe('anticipation');
    expect(currentSeason(at('2026-11-30'))).toBe('anticipation');
  });

  it('runs the full festive look for December', () => {
    expect(currentSeason(at('2026-12-01'))).toBe('festive');
    expect(currentSeason(at('2026-12-25'))).toBe('festive');
    expect(currentSeason(at('2026-12-31'))).toBe('festive');
  });

  it('winds down on 1–2 Jan, then cleans up', () => {
    expect(currentSeason(at('2027-01-01'))).toBe('winddown');
    expect(currentSeason(at('2027-01-02'))).toBe('winddown');
  });
});

describe('daysToFestive', () => {
  it('counts down to 1 December', () => {
    expect(daysToFestive(at('2026-11-24'))).toBe(7);
    expect(daysToFestive(at('2026-11-30'))).toBe(1);
  });

  it('clamps at zero from the festive window onward', () => {
    expect(daysToFestive(at('2026-12-01'))).toBe(0);
    expect(daysToFestive(at('2026-12-25'))).toBe(0);
  });
});

describe('seasonMarqueeItems', () => {
  it('is empty outside the season', () => {
    expect(seasonMarqueeItems(at('2026-11-06'))).toEqual([]);
  });

  it('counts down during anticipation and never says "one days"', () => {
    const items = seasonMarqueeItems(at('2026-11-30'));
    expect(items).toHaveLength(3);
    expect(items.some((item) => item.includes('1 day'))).toBe(true);
    expect(items.some((item) => item.includes('days'))).toBe(false);
  });

  it('carries the deadline during the festive phase', () => {
    const items = seasonMarqueeItems(at('2026-12-25'));
    expect(items.some((item) => item.includes('ends 31 December'))).toBe(true);
  });

  it('closes the loop during winddown', () => {
    expect(seasonMarqueeItems(at('2027-01-01'))).toEqual([
      'Festive prices have ended — standard pricing is back',
    ]);
  });
});

describe('seasonHeroLine', () => {
  it('only speaks while festive prices are real', () => {
    expect(seasonHeroLine(at('2026-11-25'))).toBe('');
    expect(seasonHeroLine(at('2026-12-25'))).toContain('31 December');
    expect(seasonHeroLine(at('2027-01-01'))).toBe('');
  });
});

describe('preview overrides (?season= param)', () => {
  afterEach(() => setSearch(''));

  it('maps ?season= to a mid-phase sample date', () => {
    setSearch('?season=festive');
    expect(uiNow().toISOString().slice(0, 10)).toBe('2026-12-15');
    expect(currentSeason(uiNow())).toBe('festive');
    expect(isSeasonOverridden()).toBe(true);
  });

  it('anticipation override resolves to late November', () => {
    setSearch('?season=anticipation');
    expect(currentSeason(uiNow())).toBe('anticipation');
  });

  it('stays on the real date with no param, marking nothing as overridden', () => {
    setSearch('');
    expect(isSeasonOverridden()).toBe(false);
    expect(uiNow(new Date('2026-11-06T12:00:00Z')).toISOString().slice(0, 10)).toBe(
      '2026-11-06'
    );
  });

  it('ignores unknown phases instead of breaking', () => {
    setSearch('?season=halloween');
    expect(currentSeason(uiNow(at('2026-11-06')))).toBe('off');
  });
});
