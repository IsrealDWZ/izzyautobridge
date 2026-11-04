import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export function mergePersistedState(persisted, current) {
  return {
    ...current,
    ...(persisted || {}),
    filters: { ...current.filters, ...(persisted?.filters || {}) },
  };
}

export const useAppStore = create(
  persist(
    set => ({
      theme: 'light',
      toggleTheme: () =>
        set(s => {
          const next = s.theme === 'light' ? 'dark' : 'light';
          return { theme: next };
        }),

      filters: {
        brands: [],
        fuel: [],
        body: [],
        status: [],
        category: [],
        priceRange: [0, 10000000],
        yearRange: [1900, 2030],
      },
      setFilter: (key, value) => set(s => ({ filters: { ...s.filters, [key]: value } })),
      setFilters: newFilters => set(s => ({ filters: { ...s.filters, ...newFilters } })),
      resetFilters: dynamicDefaults =>
        set({
          filters: {
            brands: [],
            fuel: [],
            body: [],
            status: [],
            category: [],
            priceRange: dynamicDefaults?.priceRange || [0, 10000000],
            yearRange: dynamicDefaults?.yearRange || [1900, 2030],
          },
        }),

      compareSelection: [],
      toggleCompare: id =>
        set(s => {
          if (s.compareSelection.includes(id)) {
            return { compareSelection: s.compareSelection.filter(x => x !== id) };
          }
          if (s.compareSelection.length >= 2) return s;
          return { compareSelection: [...s.compareSelection, id] };
        }),
      clearCompare: () => set({ compareSelection: [] }),

      favorites: [],
      toggleFavorite: id =>
        set(s => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter(x => x !== id)
            : [...s.favorites, id],
        })),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'izzyauto-storage',
      partialize: state => ({
        favorites: state.favorites,
        compareSelection: state.compareSelection,
        theme: state.theme,
      }),
      // Older builds persisted `filters`. A shallow merge would replace the
      // whole object with a partial one and crash filterVehicles on
      // `filters.brands.length`, so merge key-by-key over the defaults.
      merge: mergePersistedState,
    }
  )
);
