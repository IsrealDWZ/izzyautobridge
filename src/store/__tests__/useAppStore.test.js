import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from '../useAppStore';

// Mock document.documentElement.classList
const mockClassList = {
  toggle: vi.fn(),
  contains: vi.fn(),
  add: vi.fn(),
  remove: vi.fn(),
};

Object.defineProperty(document, 'documentElement', {
  value: { classList: mockClassList },
  writable: true,
});

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useAppStore.setState({
      theme: 'light',
      filters: {
        brands: [],
        fuel: [],
        body: [],
        status: [],
        priceRange: [150000, 600000],
        yearRange: [2016, 2026],
      },
      compareSelection: [],
      favorites: [],
    });
    vi.clearAllMocks();
  });

  describe('theme', () => {
    it('initializes with light theme', () => {
      expect(useAppStore.getState().theme).toBe('light');
    });

    it('toggles theme', () => {
      useAppStore.getState().toggleTheme();
      expect(useAppStore.getState().theme).toBe('dark');
      expect(mockClassList.toggle).toHaveBeenCalledWith('dark', true);
    });

    it('toggles back to light', () => {
      useAppStore.getState().toggleTheme();
      useAppStore.getState().toggleTheme();
      expect(useAppStore.getState().theme).toBe('light');
      expect(mockClassList.toggle).toHaveBeenCalledWith('dark', false);
    });
  });

  describe('filters', () => {
    it('initializes with default filters', () => {
      const state = useAppStore.getState();
      expect(state.filters.brands).toEqual([]);
      expect(state.filters.fuel).toEqual([]);
      expect(state.filters.body).toEqual([]);
      expect(state.filters.status).toEqual([]);
      expect(state.filters.priceRange).toEqual([150000, 600000]);
      expect(state.filters.yearRange).toEqual([2016, 2026]);
    });

    it('sets individual filter', () => {
      useAppStore.getState().setFilter('brands', ['Toyota', 'Honda']);
      expect(useAppStore.getState().filters.brands).toEqual(['Toyota', 'Honda']);
    });

    it('sets multiple filters at once', () => {
      useAppStore.getState().setFilters({
        brands: ['Toyota'],
        fuel: ['Electric'],
      });
      expect(useAppStore.getState().filters.brands).toEqual(['Toyota']);
      expect(useAppStore.getState().filters.fuel).toEqual(['Electric']);
      // Other filters should remain unchanged
      expect(useAppStore.getState().filters.body).toEqual([]);
    });

    it('resets filters with dynamic defaults', () => {
      useAppStore.getState().setFilter('brands', ['Toyota']);
      useAppStore.getState().resetFilters({ priceRange: [100000, 500000], yearRange: [2020, 2024] });
      
      expect(useAppStore.getState().filters.brands).toEqual([]);
      expect(useAppStore.getState().filters.priceRange).toEqual([100000, 500000]);
      expect(useAppStore.getState().filters.yearRange).toEqual([2020, 2024]);
    });

    it('resets filters with fallback defaults when no dynamic defaults provided', () => {
      useAppStore.getState().setFilter('brands', ['Toyota']);
      useAppStore.getState().resetFilters();
      
      expect(useAppStore.getState().filters.brands).toEqual([]);
      expect(useAppStore.getState().filters.priceRange).toEqual([150000, 600000]);
      expect(useAppStore.getState().filters.yearRange).toEqual([2016, 2026]);
    });
  });

  describe('compareSelection', () => {
    it('initializes empty', () => {
      expect(useAppStore.getState().compareSelection).toEqual([]);
    });

    it('adds vehicle to comparison', () => {
      useAppStore.getState().toggleCompare('VEH-001');
      expect(useAppStore.getState().compareSelection).toEqual(['VEH-001']);
    });

    it('removes vehicle from comparison', () => {
      useAppStore.getState().toggleCompare('VEH-001');
      useAppStore.getState().toggleCompare('VEH-001');
      expect(useAppStore.getState().compareSelection).toEqual([]);
    });

    it('enforces max 2 vehicles', () => {
      useAppStore.getState().toggleCompare('VEH-001');
      useAppStore.getState().toggleCompare('VEH-002');
      useAppStore.getState().toggleCompare('VEH-003');
      expect(useAppStore.getState().compareSelection).toEqual(['VEH-001', 'VEH-002']);
    });

    it('clears comparison', () => {
      useAppStore.getState().toggleCompare('VEH-001');
      useAppStore.getState().clearCompare();
      expect(useAppStore.getState().compareSelection).toEqual([]);
    });
  });

  describe('favorites', () => {
    it('initializes empty', () => {
      expect(useAppStore.getState().favorites).toEqual([]);
    });

    it('adds vehicle to favorites', () => {
      useAppStore.getState().toggleFavorite('VEH-001');
      expect(useAppStore.getState().favorites).toEqual(['VEH-001']);
    });

    it('removes vehicle from favorites', () => {
      useAppStore.getState().toggleFavorite('VEH-001');
      useAppStore.getState().toggleFavorite('VEH-001');
      expect(useAppStore.getState().favorites).toEqual([]);
    });

    it('clears favorites', () => {
      useAppStore.getState().toggleFavorite('VEH-001');
      useAppStore.getState().clearFavorites();
      expect(useAppStore.getState().favorites).toEqual([]);
    });
  });
});