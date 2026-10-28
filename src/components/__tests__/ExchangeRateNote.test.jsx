import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import rateData from '../../data/exchange-rate.json';
import { formatRateDate } from '../../utils/formatRateDate';
import ExchangeRateNote from '../ExchangeRateNote';

describe('formatRateDate', () => {
  it('formats timestamps as a readable UTC date', () => {
    expect(formatRateDate('2026-10-26T10:42:08.097Z')).toBe('26 Oct 2026');
  });

  it('returns null for invalid input', () => {
    expect(formatRateDate('not-a-date')).toBeNull();
  });
});

describe('ExchangeRateNote', () => {
  it('shows the applied rate and update date', () => {
    render(<ExchangeRateNote />);

    expect(
      screen.getByText(`USD/GHS ${Number(rateData.rate).toFixed(2)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(/Rate updated/)).toBeInTheDocument();
  });
});
