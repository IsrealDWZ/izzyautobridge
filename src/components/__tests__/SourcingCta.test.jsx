import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WHATSAPP_NUMBER } from '../../utils/constants';
import SourcingCta from '../SourcingCta';

describe('SourcingCta', () => {
  it('opens WhatsApp with a prefilled sourcing message', () => {
    render(<SourcingCta />);

    const href = screen
      .getByRole('link', { name: /send us a message now/i })
      .getAttribute('href');

    expect(href.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)).toBe(true);
    expect(decodeURIComponent(href)).toContain("can't find the car");
  });

  it('tells the visitor the catalogue is not the whole inventory', () => {
    render(<SourcingCta />);

    expect(screen.getByText(/isn’t the full inventory/)).toBeInTheDocument();
  });
});
