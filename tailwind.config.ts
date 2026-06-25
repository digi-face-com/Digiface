import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['var(--font-vazir)', 'sans-serif'],
        display: ['var(--font-cormorant)', 'serif'],
      },
      colors: {
        bg: '#080610',
        card: '#130e20',
        card2: '#1a1230',
        border: 'rgba(138,92,246,0.18)',
        border2: 'rgba(138,92,246,0.32)',
        purple: {
          DEFAULT: '#7c3aed',
          2: '#6d28d9',
          light: '#a78bfa',
        },
        gold: {
          DEFAULT: '#c9973a',
          2: '#f0c060',
        },
        muted: '#7a6e96',
        muted2: '#5a5070',
        green: '#34d399',
        red: '#f87171',
        blue: '#60a5fa',
        orange: '#fb923c',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-dot': 'pulse-dot 2s infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
export default config