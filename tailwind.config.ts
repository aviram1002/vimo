import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal:    '#3BD1C6',
          purple:  '#6C3BFF',
          pink:    '#FF4FA3',
          bg:      '#F7F8FC',
          surface: '#FFFFFF',
          text:    '#1E1F2B',
          muted:   '#8A8FA3',
          border:  '#E8EAF2',
        },
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'Heebo', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6C3BFF, #3BD1C6)',
        'brand-gradient-r': 'linear-gradient(135deg, #3BD1C6, #6C3BFF)',
        'hero-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(108,59,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,209,198,0.1) 0%, transparent 60%)',
      },
      boxShadow: {
        'card':  '0 4px 24px rgba(30,31,43,0.06)',
        'card-hover': '0 8px 40px rgba(108,59,255,0.14)',
        'primary': '0 4px 18px rgba(108,59,255,0.35)',
        'primary-hover': '0 6px 26px rgba(108,59,255,0.48)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
export default config
