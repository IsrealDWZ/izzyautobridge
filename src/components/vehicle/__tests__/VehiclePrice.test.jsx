import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { VehiclePrice } from '../VehiclePrice';

const vehicle = {
  ID: 1,
  Price_USD: 15000,
  Price_GHS: 176700, // 15000 × 11.78, as the render-time pricing computes
};

// 15000 × 11.78 = 176700 festive; (15000 + 700) × 11.78 = 184946 pre-festive.
const at = (iso) => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(`${iso}T00:00:00Z`));
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('VehiclePrice festive window', () => {
  it('shows only the plain USD line outside the season', () => {
    at('2026-11-06');
    render(<VehiclePrice vehicle={vehicle} />);

    expect(screen.getByText(/15,000 • 11.78 GHS\/USD/)).toBeInTheDocument();
    expect(screen.queryByText(/Festive:/)).not.toBeInTheDocument();
  });

  it('shows the strike anchor and honest savings during the festive phase', () => {
    at('2026-12-25');
    render(<VehiclePrice vehicle={vehicle} />);

    const strike = screen.getByText(/184,946/);
    expect(strike.closest('s')).toBeTruthy();
    expect(screen.getByText(/GH₵8,246 less/)).toBeInTheDocument();
  });

  it('reverts cleanly during the January winddown', () => {
    at('2027-01-01');
    render(<VehiclePrice vehicle={vehicle} />);

    expect(screen.queryByText(/Festive:/)).not.toBeInTheDocument();
    expect(screen.getByText(/15,000 • 11.78 GHS\/USD/)).toBeInTheDocument();
  });
});
