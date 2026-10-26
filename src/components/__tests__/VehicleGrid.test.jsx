import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAppStore } from '../../store/useAppStore';
import VehicleGrid from '../VehicleGrid';

const VEHICLE = {
  ID: 'IZZY-TOYOTA-COROLLA-2022',
  Brand: 'Toyota',
  Model: 'Corolla',
  Year: 2022,
  Variant: 'LE',
  Fuel_Type: 'Fuel',
  Body_Type: 'Sedan',
  Drive: 'FWD',
  Color: 'White',
  Status: 'Available',
  Category: 'Fuel',
  Mileage_km: 36000,
  Price_USD: 15000,
  Price_GHS: 180000,
  Key_Specs: '4-seater • FWD • Automatic',
  Image_URLs: '/vehicles/IZZY-TOYOTA-COROLLA-2022-01.jpg',
};

describe('VehicleGrid', () => {
  beforeEach(() => {
    useAppStore.setState({
      compareSelection: [],
      favorites: [],
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

  it('wires the compare action from the store to each card', () => {
    render(
      <MemoryRouter>
        <VehicleGrid vehicles={[VEHICLE]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Showing 1 of 1 vehicles')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Compare'));

    expect(useAppStore.getState().compareSelection).toEqual(['IZZY-TOYOTA-COROLLA-2022']);
  });

  it('wires the favorite action from the store to each card', () => {
    render(
      <MemoryRouter>
        <VehicleGrid vehicles={[VEHICLE]} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText('Save to favorites'));

    expect(useAppStore.getState().favorites).toEqual(['IZZY-TOYOTA-COROLLA-2022']);
  });
});
