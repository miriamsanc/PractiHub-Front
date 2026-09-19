/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        border: {
          DEFAULT: '#E2E8F0',
          input: '#CBD5E1'
        },
        text: {
          primary: '#1E293B',
          secondary: '#475569',
          muted: '#94A3B8'
        },
        sky: {
          primary: '#7DD3FC',
          hover: '#38BDF8'
        },
        violet: {
          primary: '#C4B5FD',
          hover: '#A78BFA'
        },
        state: {
          pending: { bg: '#FEF3C7', text: '#B45309' },   // Amber
          review: { bg: '#E0F2FE', text: '#0369A1' },    // Sky
          accepted: { bg: '#D1FAE5', text: '#047857' },  // Emerald
          rejected: { bg: '#FCE7F3', text: '#BE185D' }   // Pink
        }
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

