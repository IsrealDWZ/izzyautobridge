import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import InventorySearch from '../InventorySearch';

describe('InventorySearch', () => {
  it('calls onChange while typing', () => {
    const onChange = vi.fn();
    render(<InventorySearch value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Search inventory'), {
      target: { value: 'toyota' },
    });

    expect(onChange).toHaveBeenCalledWith('toyota');
  });

  it('renders an explicit Search button', () => {
    render(<InventorySearch value="" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('clears the query from the clear button', () => {
    const onChange = vi.fn();
    render(<InventorySearch value="toyota" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('hides the clear button when the query is empty', () => {
    render(<InventorySearch value="" onChange={() => {}} />);

    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });
});
