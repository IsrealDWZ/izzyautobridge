import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { USD_GHS_RATE } from '../../../utils/constants';
import { festiveAnchorGhs, ghsFromUsd } from '../../../utils/pricing';
import { VehiclePrice } from '../VehiclePrice';

const vehicle = {
  ID: 1,
  Price_USD: 15000,
  Price_GHS: ghsFromUsd(15000),
};

// Derived from the live rate so a bot rate refresh never breaks these tests.
const usdLine = new RegExp(`15,000 • ${USD_GHS_RATE} GHS\\/USD`);
const anchor = festiveAnchorGhs(15000).toLocaleString();
const savings = (festiveAnchorGhs(15000) - ghsFromUsd(15000)).toLocaleString();

const at = iso => {
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

    expect(screen.getByText(usdLine)).toBeInTheDocument();
    expect(screen.queryByText(/Festive:/)).not.toBeInTheDocument();
  });

  it('shows the strike anchor and honest savings during the festive phase', () => {
    at('2026-12-25');
    render(<VehiclePrice vehicle={vehicle} />);

    const strike = screen.getByText(new RegExp(anchor));
    expect(strike.closest('s')).toBeTruthy();
    expect(screen.getByText(new RegExp(`GH₵${savings} less`))).toBeInTheDocument();
  });

  it('reverts cleanly during the January winddown', () => {
    at('2027-01-01');
    render(<VehiclePrice vehicle={vehicle} />);

    expect(screen.queryByText(/Festive:/)).not.toBeInTheDocument();
    expect(screen.getByText(usdLine)).toBeInTheDocument();
  });

  it('labels forced previews so stale data is never mistaken for the deal', () => {
    at('2026-11-06'); // real date is off-season...
    window.history.replaceState(null, '', '?season=festive'); // ...but forced
    render(<VehiclePrice vehicle={vehicle} />);

    expect(screen.getByText(new RegExp(`GH₵${savings} less \\(preview\\)`))).toBeInTheDocument();
    window.history.replaceState(null, '', window.location.pathname);
  });
});
