import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAppStore } from '../../store/useAppStore';
import FilterSidebar from '../FilterSidebar';

const VEHICLES = [
  {
    Brand: 'Toyota',
    Fuel_Type: 'Fuel',
    Body_Type: 'Sedan',
    Status: 'Available',
    Price_GHS: 180000,
    Year: 2022,
  },
];

describe('FilterSidebar', () => {
  beforeEach(() => {
    useAppStore.setState({
      filters: {
        brands: [],
        fuel: [],
        body: [],
        status: [],
        category: [],
        priceRange: [0, 10000000],
        yearRange: [1900, 2030],
      },
    });
  });

  it('opens the mobile filter drawer without an invalid ref error', () => {
    render(<FilterSidebar vehicles={VEHICLES} />);

    fireEvent.click(screen.getByRole('button', { name: /Filters/ }));

    const dialog = screen.getByRole('dialog', { name: 'Filters' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close filters' })).toBeInTheDocument();
    expect(screen.getAllByText('Brand').length).toBeGreaterThan(0);
  });
});
