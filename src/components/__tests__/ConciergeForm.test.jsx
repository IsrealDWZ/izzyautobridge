import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ConciergeForm from '../ConciergeForm';

describe('ConciergeForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('advances through all three steps and shows the confirmation modal', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<ConciergeForm vehicles={[]} whatsappNumber="233536225804" />);

    // Step 1 — essentials
    fireEvent.change(screen.getByLabelText('Brand'), { target: { value: 'Toyota' } });
    fireEvent.click(screen.getByRole('button', { name: 'Find My Vehicle' }));

    // Step 2 — details (the brand field is gone, so it must not have advanced
    // mid-typing; regression for the stale-state autoAdvance bug)
    expect(screen.queryByLabelText('Brand')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Model'), { target: { value: 'Corolla' } });
    fireEvent.click(screen.getByRole('button', { name: 'Find My Vehicle' }));

    // Step 3 — submit
    fireEvent.click(screen.getByRole('button', { name: 'Send Request on WhatsApp' }));

    // Regression: the confirmation modal used to throw
    // `ReferenceError: waLink is not defined` here.
    expect(screen.getByRole('dialog', { name: 'Request submitted' })).toBeInTheDocument();
    const continueLink = screen.getByRole('link', { name: /Continue on WhatsApp/ });
    expect(continueLink.getAttribute('href')).toContain('https://wa.me/233536225804');
    expect(open).toHaveBeenCalledTimes(1);
  });

  it('keeps the full brand while the user is typing', () => {
    render(<ConciergeForm vehicles={[]} whatsappNumber="233536225804" />);

    const brand = screen.getByLabelText('Brand');
    for (const value of ['T', 'To', 'Toy', 'Toyo', 'Toyot', 'Toyota']) {
      fireEvent.change(brand, { target: { value } });
    }

    expect(screen.getByLabelText('Brand')).toHaveValue('Toyota');
    expect(screen.queryByLabelText('Model')).not.toBeInTheDocument();
  });
});
