/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nomad + Terracotta Energy — semantic tokens (see DESIGN.md)
        primary: 'var(--bg-primary)',
        card: 'var(--bg-card)',
        secondary: 'var(--bg-secondary)',
        main: 'var(--text-main)',
        muted: 'var(--text-muted)',
        subtle: 'var(--border-subtle)',
        // Constant accents as literal hex so opacity modifiers (bg-action/10) work
        action: '#c86b45',
        alert: '#b85329',
        'accent-hover': '#8a7b70',
        onsecondary: '#ebe9e7',
        // Legacy aliases remapped to the new palette (safety net for stray classes)
        navy: { DEFAULT: '#3c2411', deep: '#3c2411', dark: '#3c2411' },
        panel: '#4f3928',
        gold: { DEFAULT: '#c86b45', light: '#f0c9b3' },
        success: '#047857',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
