/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F4ECE0',
          300: '#EBDDC8',
          400: '#DEC9A8'
        },
        champagne: {
          light: '#FBF7EE',
          DEFAULT: '#F5EBD7',
          dark: '#E8D7B8'
        },
        gold: {
          50: '#FAF5EA',
          100: '#F4E9CE',
          200: '#E7D19B',
          300: '#DAB868',
          400: '#C9A45C',
          500: '#B89047',
          600: '#997334',
          700: '#7A5726'
        },
        cocoa: {
          50: '#F6F4F3',
          100: '#E7E2E0',
          200: '#C7BDB9',
          400: '#7E6F68',
          600: '#4D3F38',
          800: '#2C221E',
          900: '#1A1412',
          950: '#0E0B0A'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Abril Fatface"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Satoshi"', '"Assistant"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        drawerSlide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marqueeReverse 32s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'drawer': 'drawerSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }
    },
  },
  plugins: [],
}
