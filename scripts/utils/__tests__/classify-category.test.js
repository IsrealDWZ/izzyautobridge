import { describe, it, expect } from 'vitest';
import { classifyCategory } from '../classify-category.js';

describe('classifyCategory', () => {
  it('classifies EV correctly', () => {
    expect(classifyCategory('Pure electric', 'SUV')).toBe('EV');
    expect(classifyCategory('Electric', 'Sedan')).toBe('EV');
    expect(classifyCategory('pure electric', 'hatchback')).toBe('EV');
  });

  it('classifies Hybrid correctly', () => {
    expect(classifyCategory('Hybrid', 'SUV')).toBe('Hybrid');
    expect(classifyCategory('Mild hybrid', 'Sedan')).toBe('Hybrid');
    expect(classifyCategory('PHEV', 'SUV')).toBe('Hybrid');
    expect(classifyCategory('Plug-in hybrid', 'Sedan')).toBe('Hybrid');
    expect(classifyCategory('Plug in hybrid', 'SUV')).toBe('Hybrid');
    expect(classifyCategory('Range extender', 'SUV')).toBe('Hybrid');
    expect(classifyCategory('Range-extender', 'Sedan')).toBe('Hybrid');
    expect(classifyCategory('Self-charging hybrid', 'SUV')).toBe('Hybrid');
    expect(classifyCategory('Self charging hybrid', 'Sedan')).toBe('Hybrid');
  });

  it('classifies Fuel correctly', () => {
    expect(classifyCategory('Petrol', 'SUV')).toBe('Fuel');
    expect(classifyCategory('Gasoline', 'Sedan')).toBe('Fuel');
    expect(classifyCategory('Diesel', 'Pickup')).toBe('Fuel');
    expect(classifyCategory('petrol', 'Hatchback')).toBe('Fuel');
  });

  it('classifies Bus by body', () => {
    expect(classifyCategory('Gasoline', 'Bus')).toBe('Bus');
    expect(classifyCategory('Diesel', 'Mini Bus')).toBe('Bus');
    expect(classifyCategory('Hybrid', 'Coach Bus')).toBe('Bus');
  });

  it('classifies Heavy by body', () => {
    expect(classifyCategory('Diesel', 'Truck')).toBe('Heavy');
    expect(classifyCategory('Diesel', 'Crane')).toBe('Heavy');
    expect(classifyCategory('Diesel', 'Machinery')).toBe('Heavy');
    expect(classifyCategory('Diesel', 'Heavy Truck')).toBe('Heavy');
  });

  it('classifies Other for 2-3 wheelers', () => {
    expect(classifyCategory('Gasoline', 'Motorcycle')).toBe('Other');
    expect(classifyCategory('Electric', 'Scooter')).toBe('Other');
    expect(classifyCategory('Gasoline', 'Tricycle')).toBe('Other');
  });

  it('defaults to Fuel for unknown fuel types', () => {
    expect(classifyCategory('Unknown', 'SUV')).toBe('Fuel');
    expect(classifyCategory('', 'Sedan')).toBe('Fuel');
    expect(classifyCategory(null, 'Hatchback')).toBe('Fuel');
  });

  it('body classification takes precedence over fuel for Bus/Heavy/Other', () => {
    expect(classifyCategory('Pure electric', 'Bus')).toBe('Bus');
    expect(classifyCategory('Electric', 'Truck')).toBe('Heavy');
    expect(classifyCategory('Gasoline', 'Motorcycle')).toBe('Other');
  });
});