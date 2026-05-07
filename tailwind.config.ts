import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1240px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#f4f4f3',
        panel: {
          DEFAULT: '#0a0a0b',
          2: '#0f0f11',
        },
        ink: {
          0: '#ffffff',
          1: 'rgba(255,255,255,0.86)',
          2: 'rgba(255,255,255,0.72)',
          3: 'rgba(255,255,255,0.55)',
          4: 'rgba(255,255,255,0.35)',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          2: 'rgba(255,255,255,0.14)',
        },
        accent: '#E7E2D4',
      },
      borderRadius: {
        '2xl': '1.125rem',
        '3xl': '1.75rem',
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.025em',
      },
      fontSize: {
        'display-xl': ['clamp(2.875rem, 8.5vw, 7.25rem)', { lineHeight: '0.96', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-lg': ['clamp(2rem, 4.4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      boxShadow: {
        soft: '0 30px 80px -30px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        blink: 'blink 1s steps(2) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
