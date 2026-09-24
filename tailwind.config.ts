import type { Config } from 'tailwindcss'

/**
 * Palette is sampled from the My Health Enrollment logo:
 *   navy  — the heart outline and the "My Health" wordmark
 *   teal  — the inner heart, the figure, the "Enrollment" wordmark
 *   green — the path sweeping up to the door
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef3fb', 100: '#d8e4f6', 200: '#b4c9ed', 300: '#84a5e0',
          400: '#5680d0', 500: '#3560ba', 600: '#26489c', 700: '#1e3a7e',
          800: '#162d63', 900: '#102348', 950: '#0a1730',
        },
        teal: {
          50: '#eefbfc', 100: '#d3f4f7', 200: '#ace9ef', 300: '#72d8e3',
          400: '#34bece', 500: '#17a0b0', 600: '#158294', 700: '#176879',
          800: '#1a5663', 900: '#1a4855', 950: '#0a2e39',
        },
        grass: {
          50: '#f3fbec', 100: '#e2f6d4', 200: '#c6edad', 300: '#a0e07d',
          400: '#7ace51', 500: '#5abb33', 600: '#439524', 700: '#347220',
          800: '#2d5b20', 900: '#274e1f', 950: '#112b0c',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1200px' },
      boxShadow: {
        card: '0 1px 2px rgba(16,35,72,.04), 0 8px 24px -8px rgba(16,35,72,.10)',
        lift: '0 2px 4px rgba(16,35,72,.05), 0 20px 44px -12px rgba(16,35,72,.22)',
        glow: '0 0 0 1px rgba(23,160,176,.18), 0 18px 50px -14px rgba(23,160,176,.45)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(.94)' },
          to: { opacity: '1', transform: 'none' },
        },
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(24px,-30px,0) scale(1.06)' },
          '66%': { transform: 'translate3d(-18px,18px,0) scale(.96)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(-28px,22px,0)' },
        },
        draw: { to: { strokeDashoffset: '0' } },
        'pulse-ring': {
          '0%': { transform: 'scale(.85)', opacity: '.55' },
          '70%': { transform: 'scale(1.35)', opacity: '0' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        shimmer: { to: { backgroundPosition: '200% center' } },
        'bob': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        aurora: {
          '0%,100%': { backgroundPosition: '0% 50%, 100% 50%, 50% 100%' },
          '50%': { backgroundPosition: '100% 50%, 0% 50%, 50% 0%' },
        },
        'grid-drift': { to: { backgroundPosition: '54px 54px' } },
        sweep: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '60%,100%': { transform: 'translateX(320%) skewX(-18deg)' },
        },
        'glow-ring': {
          '0%,100%': { boxShadow: '0 0 0 1px rgba(122,206,81,.25), 0 24px 60px -18px rgba(23,160,176,.55)' },
          '50%': { boxShadow: '0 0 0 1px rgba(122,206,81,.55), 0 30px 80px -18px rgba(90,187,51,.55)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .8s ease both',
        'scale-in': 'scale-in .6s cubic-bezier(.22,1,.36,1) both',
        float: 'float 19s ease-in-out infinite',
        drift: 'drift 15s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.8s cubic-bezier(.24,.6,.35,1) infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        bob: 'bob 4s ease-in-out infinite',
        aurora: 'aurora 22s ease-in-out infinite',
        'grid-drift': 'grid-drift 28s linear infinite',
        sweep: 'sweep 5.5s ease-in-out infinite',
        'glow-ring': 'glow-ring 5s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
