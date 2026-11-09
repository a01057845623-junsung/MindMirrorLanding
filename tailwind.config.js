/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF9F5', // Background Primary (Warm Ivory)
        sand: '#F3EFEA', // Background Surface (Soft Sand)
        ink: '#1F1E1D', // Text Primary (Deep Charcoal)
        muted: '#6B6862', // Text Secondary (Warm Muted Gray)
        terra: {
          DEFAULT: '#D97757', // Accent Primary (Claude Terracotta)
          dark: '#C15F3E',
        },
        crisis: '#B91C1C', // Safety / Crisis
        line: {
          DEFAULT: 'rgba(31,30,29,0.10)', // Billdr hairline
          strong: 'rgba(31,30,29,0.22)',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        kserif: ['"Noto Serif KR"', 'serif'],
        serif: ['"Instrument Serif"', '"Noto Serif KR"', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { container: '1200px' },
      boxShadow: {
        card: '0 1px 0 rgba(31,30,29,0.04), 0 18px 40px -24px rgba(31,30,29,0.25)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        ripple: {
          '0%': { opacity: '0.55', transform: 'scale(0.6)' },
          '100%': { opacity: '0', transform: 'scale(2.6)' },
        },
        'step-in': {
          from: { opacity: '0', transform: 'translateY(6px) scale(0.6)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.16,.84,.44,1) both',
        ripple: 'ripple 3.2s cubic-bezier(.16,.84,.44,1) infinite',
        'step-in': 'step-in .6s cubic-bezier(.34,1.4,.64,1) both',
      },
    },
  },
  plugins: [],
};
