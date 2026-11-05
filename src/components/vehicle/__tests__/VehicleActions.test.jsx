import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { VehicleActions } from '../VehicleActions';

const VEHICLE = { ID: 42, Brand: 'Toyota', Model: 'Corolla', Year: 2022 };

describe('VehicleActions', () => {
  it('passes vehicle.ID to onToggleFavorite (regression: click event was stored as the id)', () => {
    const onToggleFavorite = vi.fn();
    render(
      <VehicleActions
        vehicle={VEHICLE}
        isComparing={false}
        isFavorite={false}
        onToggleCompare={vi.fn()}
        onToggleFavorite={onToggleFavorite}
      />
    );
    fireEvent.click(screen.getByLabelText('Save to favorites'));
    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith(42);
  });

  it('passes vehicle.ID to onToggleCompare', () => {
    const onToggleCompare = vi.fn();
    render(
      <VehicleActions
        vehicle={VEHICLE}
        isComparing={false}
        isFavorite={false}
        onToggleCompare={onToggleCompare}
        onToggleFavorite={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Compare/ }));
    expect(onToggleCompare).toHaveBeenCalledWith(42);
  });

  it('exposes the compare and favourite state with aria-pressed', () => {
    const props = {
      vehicle: VEHICLE,
      onToggleCompare: vi.fn(),
      onToggleFavorite: vi.fn(),
    };
    const { rerender } = render(
      <VehicleActions {...props} isComparing={false} isFavorite={false} />
    );

    expect(screen.getByRole('button', { name: 'Compare' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(screen.getByRole('button', { name: 'Save to favorites' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );

    rerender(<VehicleActions {...props} isComparing isFavorite />);

    expect(screen.getByRole('button', { name: 'Compare' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Save to favorites' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});
