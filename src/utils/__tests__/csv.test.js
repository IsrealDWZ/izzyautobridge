import { describe, expect, it } from 'vitest';

import { escapeCsvCell } from '../../../scripts/utils/csv.js';

describe('escapeCsvCell', () => {
  it('leaves ordinary values untouched', () => {
    expect(escapeCsvCell('Toyota')).toBe('Toyota');
    expect(escapeCsvCell(0)).toBe('0');
    expect(escapeCsvCell(null)).toBe('');
    expect(escapeCsvCell(undefined)).toBe('');
  });

  it('quotes commas, quotes and newlines', () => {
    expect(escapeCsvCell('Corolla, 2019')).toBe('"Corolla, 2019"');
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""');
    expect(escapeCsvCell('line one\nline two')).toBe('"line one\nline two"');
  });

  it('neutralises spreadsheet formulas', () => {
    expect(escapeCsvCell('=SUM(A1:A9)')).toBe("'=SUM(A1:A9)");
    expect(escapeCsvCell('+233536225804')).toBe("'+233536225804");
    expect(escapeCsvCell('-5')).toBe("'-5");
    expect(escapeCsvCell('@user')).toBe("'@user");
    expect(escapeCsvCell('\tpayload')).toBe("'\tpayload");
  });

  it('quotes a formula that also contains a comma', () => {
    expect(escapeCsvCell('=HYPERLINK("http://x","y")')).toBe('"\'=HYPERLINK(""http://x"",""y"")"');
  });
});
