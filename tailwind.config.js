/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E65A00', // Saffron
          light: '#FF7B25',
          dark: '#B34600',
        },
        secondary: {
          DEFAULT: '#FAF5EC', // Cream
          dark: '#F3E5CD',
        },
        accent: {
          DEFAULT: '#7A1A22', // Deep Maroon
          light: '#A32D36',
          dark: '#520D12',
        },
        gold: {
          DEFAULT: '#D4AF37', // Gold
          light: '#E5C158',
          dark: '#A6841E',
        },
        lightBg: '#FFFDF9',
        darkText: '#2C1819',
        grayText: '#6E5A5B',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Cinzel', 'serif'], // Elegant devotional & premium typography
      },
      boxShadow: {
        premium: '0 10px 30px -10px rgba(122, 26, 34, 0.15)',
        'premium-hover': '0 20px 40px -15px rgba(122, 26, 34, 0.25)',
        glass: '0 8px 32px 0 rgba(122, 26, 34, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
