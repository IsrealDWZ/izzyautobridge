import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import VehicleCard from '../../VehicleCard';

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
  Mileage_km: 36000,
  Price_USD: 15000,
  Price_GHS: 180000,
  Key_Specs: '4-seater • FWD • Automatic',
  Image_URLs: '/vehicles/IZZY-TOYOTA-COROLLA-2022-01.jpg',
};

describe('VehicleCard', () => {
  const onToggleCompare = vi.fn();
  const onToggleFavorite = vi.fn();

  beforeEach(() => {
    onToggleCompare.mockReset();
    onToggleFavorite.mockReset();
  });

  it('renders vehicle details correctly', () => {
    render(
      <MemoryRouter>
        <VehicleCard
          vehicle={VEHICLE}
          isComparing={false}
          isFavorite={false}
          onToggleCompare={onToggleCompare}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Toyota Corolla 2022')).toBeInTheDocument();
    expect(screen.getByText('GH₵180,000')).toBeInTheDocument();
    expect(screen.getByLabelText('Save to favorites')).toBeInTheDocument();
    expect(screen.getByLabelText('Compare')).toBeInTheDocument();
  });

  it('toggles favorite on button click', () => {
    render(
      <MemoryRouter>
        <VehicleCard
          vehicle={VEHICLE}
          isComparing={false}
          isFavorite={false}
          onToggleCompare={onToggleCompare}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText('Save to favorites'));
    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith('IZZY-TOYOTA-COROLLA-2022');
  });

  it('toggles compare on button click', () => {
    render(
      <MemoryRouter>
        <VehicleCard
          vehicle={VEHICLE}
          isComparing={false}
          isFavorite={false}
          onToggleCompare={onToggleCompare}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Compare/ }));
    expect(onToggleCompare).toHaveBeenCalledTimes(1);
    expect(onToggleCompare).toHaveBeenCalledWith('IZZY-TOYOTA-COROLLA-2022');
  });

  it('renders loading skeleton when loading prop is true', () => {
    render(
      <VehicleCard
        vehicle={VEHICLE}
        loading
      />
    );

    expect(screen.queryByText('IZZY-TOYOTA-COROLLA-2022')).not.toBeInTheDocument();
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('navigates to vehicle detail page when clicking title', () => {
    render(
      <MemoryRouter>
        <VehicleCard
          vehicle={VEHICLE}
          isComparing={false}
          isFavorite={false}
          onToggleCompare={onToggleCompare}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    );

    const link = screen.getByText('Toyota Corolla 2022').closest('a');
    expect(link).toHaveAttribute('href', '/vehicle/IZZY-TOYOTA-COROLLA-2022');
  });
});
