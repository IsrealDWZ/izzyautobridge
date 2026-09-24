/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0F1A',
          elevated: '#111827',
          hover: '#1A2332',
        },
        border: {
          DEFAULT: '#1E2A3A',
          strong: '#2D3E50',
        },
        text: {
          DEFAULT: '#F0F4F8',
          muted: '#8B9CB3',
          dim: '#5A6D82',
        },
        accent: {
          DEFAULT: '#D4A843',
          dim: '#B8903A',
          glow: 'rgba(212, 168, 67, 0.35)',
          strong: '#E8C46B',
        },
        success: {
          DEFAULT: '#00C896',
          dim: '#00A87A',
        },
        warning: '#F5A623',
        danger: '#E04B4B',
        info: '#2D9CDB',
        whatsapp: '#25D366',
        container: '#141D2B',
        'container-hover': '#1C2838',
        input: {
          bg: '#0E1624',
          border: '#253347',
          focus: '#D4A843',
        },
        overlay: 'rgba(10, 15, 26, 0.85)',
        'overlay-strong': 'rgba(10, 15, 26, 0.95)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Syne', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glow: '0 0 40px rgba(212, 168, 67, 0.15)',
        'glow-strong': '0 0 60px rgba(212, 168, 67, 0.25)',
        'inner-glow': 'inset 0 0 40px rgba(212, 168, 67, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 168, 67, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(45, 156, 219, 0.1) 0%, transparent 50%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(10, 15, 26, 0) 0%, rgba(10, 15, 26, 0.6) 60%, #0A0F1A 100%)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};