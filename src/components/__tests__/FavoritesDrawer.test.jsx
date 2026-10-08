import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import FavoritesDrawer from '../FavoritesDrawer';
import { useAppStore } from '../../store/useAppStore';

const VEHICLES = [
  { ID: 42, Brand: 'Toyota', Model: 'Corolla', Year: 2022, Price_GHS: 250000 },
  { ID: 7, Brand: 'BYD', Model: 'Atto 3', Year: 2024, Price_GHS: 320000 },
];

describe('FavoritesDrawer', () => {
  beforeEach(() => {
    useAppStore.setState({ favorites: [] });
  });

  it('renders the saved button with an empty list', () => {
    render(<FavoritesDrawer vehicles={VEHICLES} whatsappNumber="233536225804" />);
    expect(screen.getByRole('button', { name: /0 Saved/ })).toBeInTheDocument();
  });

  it('resolves favorites against the vehicles prop (regression: undeclared vehicles ReferenceError)', () => {
    useAppStore.setState({ favorites: [42] });
    render(<FavoritesDrawer vehicles={VEHICLES} whatsappNumber="233536225804" />);
    fireEvent.click(screen.getByRole('button', { name: /1 Saved/ }));
    expect(screen.getByText('Toyota Corolla 2022')).toBeInTheDocument();
    expect(screen.getByText('GH₵250,000')).toBeInTheDocument();
  });

  it('removes a vehicle when its trash button is clicked', () => {
    useAppStore.setState({ favorites: [42, 7] });
    render(<FavoritesDrawer vehicles={VEHICLES} whatsappNumber="233536225804" />);
    fireEvent.click(screen.getByRole('button', { name: /2 Saved/ }));
    expect(screen.getByText('Toyota Corolla 2022')).toBeInTheDocument();
    expect(screen.getByText('BYD Atto 3 2024')).toBeInTheDocument();

    fireEvent.click(screen.getAllByLabelText('Remove')[0]);
    expect(useAppStore.getState().favorites).toEqual([7]);
  });
});
