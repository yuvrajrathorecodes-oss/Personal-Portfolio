/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#112532',
          950: '#081219',
          900: '#0B1922',
          800: '#112532',
          700: '#162E3D',
          600: '#1C3B4E',
          500: '#254A61',
        },
        gold: {
          DEFAULT: '#F4B044',
          light: '#F8C36E',
          dark: '#D8942A',
          glow: 'rgba(244, 176, 68, 0.35)',
        },
        orange: {
          DEFAULT: '#E0680E',
          light: '#EB7E2B',
          dark: '#B85307',
          glow: 'rgba(224, 104, 14, 0.35)',
        },
        slateBlue: {
          DEFAULT: '#88A5B7',
          light: '#A3BDCD',
          dark: '#6D8C9E',
        },
        soft: {
          DEFAULT: '#CBD5C0',
          muted: '#9FB098',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(244, 176, 68, 0.2)',
        'gold-md': '0 0 25px rgba(244, 176, 68, 0.3)',
        'gold-lg': '0 0 40px rgba(244, 176, 68, 0.45)',
        'orange-sm': '0 0 15px rgba(224, 104, 14, 0.25)',
        'orange-md': '0 0 25px rgba(224, 104, 14, 0.4)',
        'orange-lg': '0 0 45px rgba(224, 104, 14, 0.55)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
