/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Apple Premium Minimal — semantic tokens (see DESIGN.md)
        primary: 'var(--bg-primary)',
        card: 'var(--bg-card)',
        secondary: 'var(--bg-secondary)',
        main: 'var(--text-main)',
        muted: 'var(--text-muted)',
        subtle: 'var(--border-subtle)',
        // Themed accents via rgb triples so Tailwind opacity
        // modifiers (bg-action/10) keep working in both modes
        action: 'rgb(var(--accent-action-rgb) / <alpha-value>)',
        alert: 'rgb(var(--accent-alert-rgb) / <alpha-value>)',
        'accent-hover': '#6e6e73',
        'accent-surface': 'var(--accent-surface)',
        onsecondary: 'var(--text-inverse)',
        'onsecondary-muted': 'var(--text-inverse-muted)',
        // Legacy aliases remapped to the Apple palette (safety net for stray classes)
        navy: { DEFAULT: '#1d1d1f', deep: '#1d1d1f', dark: '#1d1d1f' },
        panel: '#1d1d1f',
        gold: { DEFAULT: '#0071e3', light: '#2997ff' },
        success: '#047857',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
