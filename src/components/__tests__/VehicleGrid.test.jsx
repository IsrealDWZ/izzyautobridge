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

const OTHER_VEHICLE = {
  ...VEHICLE,
  ID: 'IZZY-BMW-X5-2022',
  Brand: 'BMW',
  Model: 'X5',
  Variant: 'xDrive40i',
  Body_Type: 'SUV',
  Price_GHS: 650000,
  Image_URLs: '/vehicles/IZZY-BMW-X5-2022-01.jpg',
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

  it('filters the grid by the search query', () => {
    render(
      <MemoryRouter>
        <VehicleGrid vehicles={[VEHICLE, OTHER_VEHICLE]} searchQuery="bmw" />
      </MemoryRouter>
    );

    expect(screen.getByText('Showing 1 of 2 vehicles')).toBeInTheDocument();
    expect(screen.getByText('BMW X5 2022')).toBeInTheDocument();
    expect(screen.queryByText('Toyota Corolla 2022')).not.toBeInTheDocument();
  });
});
