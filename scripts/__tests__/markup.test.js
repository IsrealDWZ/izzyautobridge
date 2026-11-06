import { describe, expect, it } from 'vitest';

import { currentMarkupUsd, currentMarkupWindow } from '../markup.js';

const at = (iso) => new Date(`${iso}T00:00:00Z`);

describe('currentMarkupUsd (festive pricing ladder)', () => {
  it('keeps the legacy $1,000 markup before the festive window', () => {
    expect(currentMarkupUsd(at('2026-11-06'))).toBe(1000);
    expect(currentMarkupUsd(at('2026-11-30'))).toBe(1000);
  });

  it('drops to the $300 festive markup for the whole of December 2026', () => {
    expect(currentMarkupUsd(at('2026-12-01'))).toBe(300);
    expect(currentMarkupUsd(at('2026-12-25'))).toBe(300);
    expect(currentMarkupUsd(at('2026-12-31'))).toBe(300);
  });

  it('lands on the permanent $550 markup from 1 Jan 2027', () => {
    expect(currentMarkupUsd(at('2027-01-01'))).toBe(550);
    expect(currentMarkupUsd(at('2028-06-15'))).toBe(550);
  });

  it('matches the documented window labels', () => {
    expect(currentMarkupWindow(at('2026-11-06'))).toBe('legacy');
    expect(currentMarkupWindow(at('2026-12-25'))).toBe('festive');
    expect(currentMarkupWindow(at('2027-01-01'))).toBe('standard');
  });
});
