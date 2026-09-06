import { describe, it, expect } from 'vitest';
import {
  sanitizeForUrl,
  sanitizeForDisplay,
  sanitizeWhatsAppMessage,
  validateImageUrl,
  validateWhatsAppNumber,
  sanitizeFormInput,
  validatePriceRange,
  validateYearRange,
  validateVehicle,
} from '../validation';

describe('sanitizeForUrl', () => {
  it('removes XSS characters', () => {
    expect(sanitizeForUrl('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
    expect(sanitizeForUrl('"><img src=x onerror=alert(1)>')).toBe('img src=x onerroralert(1)');
  });

  it('removes javascript: protocol', () => {
    expect(sanitizeForUrl('javascript:alert(1)')).toBe('alert(1)');
  });

  it('handles non-string input', () => {
    expect(sanitizeForUrl(null)).toBe('');
    expect(sanitizeForUrl(123)).toBe('');
  });
});

describe('sanitizeForDisplay', () => {
  it('escapes HTML brackets', () => {
    expect(sanitizeForDisplay('<div>')).toBe('<div>');
    expect(sanitizeForDisplay('>alert<')).toBe('>alert<');
  });
});

describe('sanitizeWhatsAppMessage', () => {
  it('truncates long messages', () => {
    const longMsg = 'a'.repeat(3000);
    expect(sanitizeWhatsAppMessage(longMsg).length).toBeLessThanOrEqual(2000);
  });

  it('removes control characters', () => {
    expect(sanitizeWhatsAppMessage('test\x00\x1F')).toBe('test');
  });
});

describe('validateImageUrl', () => {
  it('allows valid HTTPS image URLs from allowed domains', () => {
    expect(validateImageUrl('https://izzyautobridge.vercel.app/vehicles/test.jpg')).toBe(
      'https://izzyautobridge.vercel.app/vehicles/test.jpg'
    );
    expect(validateImageUrl('https://images.unsplash.com/photo-123.jpg')).toBe(
      'https://images.unsplash.com/photo-123.jpg'
    );
  });

  it('rejects HTTP URLs', () => {
    expect(validateImageUrl('http://example.com/image.jpg')).toBeNull();
  });

  it('rejects disallowed domains', () => {
    expect(validateImageUrl('https://evil.com/image.jpg')).toBeNull();
  });

  it('rejects non-image paths', () => {
    expect(validateImageUrl('https://izzyautobridge.vercel.app/page.html')).toBeNull();
  });

  it('handles invalid URLs', () => {
    expect(validateImageUrl('not-a-url')).toBeNull();
    expect(validateImageUrl(null)).toBeNull();
  });
});

describe('validateWhatsAppNumber', () => {
  it('validates correct Ghana format', () => {
    expect(validateWhatsAppNumber('233536225804')).toBe(true);
    expect(validateWhatsAppNumber('233 53 622 5804')).toBe(true);
  });

  it('rejects invalid formats', () => {
    expect(validateWhatsAppNumber('233123')).toBe(false);
    expect(validateWhatsAppNumber('1234567890')).toBe(false);
    expect(validateWhatsAppNumber('')).toBe(false);
  });
});

describe('sanitizeFormInput', () => {
  it('removes HTML tags', () => {
    expect(sanitizeFormInput('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
  });

  it('removes javascript: protocol', () => {
    expect(sanitizeFormInput('javascript:alert(1)')).toBe('alert(1)');
  }

  it('truncates to maxLength', () => {
    expect(sanitizeFormInput('a'.repeat(100), { maxLength: 50 }).length).toBe(50);
  });

  it('handles non-string input', () => {
    expect(sanitizeFormInput(null)).toBe('');
  });
});

describe('validatePriceRange', () => {
  it('validates correct ranges', () => {
    expect(validatePriceRange(100000, 500000, 0, 1000000)).toEqual({ low: 100000, high: 500000 });
  });

  it('rejects low > high', () => {
    expect(validatePriceRange(500000, 100000)).toBeNull();
  });

  it('rejects out of bounds', () => {
    expect(validatePriceRange(-100, 500000, 0, 1000000)).toBeNull();
    expect(validatePriceRange(100000, 2000000, 0, 1000000)).toBeNull();
  });

  it('handles non-numeric input', () => {
    expect(validatePriceRange('abc', 500000)).toBeNull();
  });
});

describe('validateYearRange', () => {
  it('validates correct ranges', () => {
    const currentYear = new Date().getFullYear();
    expect(validateYearRange(2010, 2020, 1990, currentYear + 2)).toEqual({ low: 2010, high: 2020 });
  });

  it('rejects low > high', () => {
    expect(validateYearRange(2020, 2010)).toBeNull();
  });

  it('rejects out of bounds', () => {
    expect(validateYearRange(1980, 2020, 1990, 2026)).toBeNull();
    expect(validateYearRange(2010, 2030, 1990, 2026)).toBeNull();
  });
});

describe('validateVehicle', () => {
  const validVehicle = {
    ID: 'TEST-001',
    Brand: 'Toyota',
    Model: 'Camry',
    Year: 2022,
    Price_GHS: 180000,
    Price_USD: 12000,
  };

  it('validates correct vehicle', () => {
    expect(validateVehicle(validVehicle)).toEqual({ valid: true });
  });

  it('rejects missing required fields', () => {
    const { Brand, ...invalid } = validVehicle;
    expect(validateVehicle(invalid).valid).toBe(false);
  });

  it('rejects invalid Price_GHS', () => {
    expect(validateVehicle({ ...validVehicle, Price_GHS: -100 }).valid).toBe(false);
    expect(validateVehicle({ ...validVehicle, Price_GHS: 'abc' }).valid).toBe(false);
  });

  it('rejects invalid Year', () => {
    expect(validateVehicle({ ...validVehicle, Year: 1980 }).valid).toBe(false);
    expect(validateVehicle({ ...validVehicle, Year: 2030 }).valid).toBe(false);
  });
});