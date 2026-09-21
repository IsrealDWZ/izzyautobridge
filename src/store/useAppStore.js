import { create } from 'zustand';

export const useAppStore = create((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === 'light' ? 'dark' : 'light';
      return { theme: next };
    }),

  filters: {
    brands: [],
    fuel: [],
    body: [],
    status: [],
    category: [],
    priceRange: [150000, 600000],
    yearRange: [2016, 2026],
  },
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  setFilters: (newFilters) =>
    set((s) => ({ filters: { ...s.filters, ...newFilters } })),
  resetFilters: (dynamicDefaults) =>
    set({
      filters: {
        brands: [], fuel: [], body: [], status: [],
        priceRange: dynamicDefaults?.priceRange || [150000, 600000],
        yearRange: dynamicDefaults?.yearRange || [2016, 2026],
      },
    }),

  compareSelection: [],
  toggleCompare: (id) =>
    set((s) => {
      if (s.compareSelection.includes(id)) {
        return { compareSelection: s.compareSelection.filter((x) => x !== id) };
      }
      if (s.compareSelection.length >= 2) return s;
      return { compareSelection: [...s.compareSelection, id] };
    }),
  clearCompare: () => set({ compareSelection: [] }),

  favorites: [],
  toggleFavorite: (id) =>
    set((s) => ({
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((x) => x !== id)
        : [...s.favorites, id],
    })),
  clearFavorites: () => set({ favorites: [] }),
}));