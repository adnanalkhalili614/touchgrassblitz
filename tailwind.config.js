/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grass: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#4CAF50', // Primary grass green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#6EC6FF', // Primary sky blue
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sunlight: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#FFEB3B', // Primary sunlight yellow
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'caveat': ['Caveat', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'sway-reverse': 'sway-reverse 5s ease-in-out infinite',
        'grow': 'grow 2s ease-out forwards',
        'grow-delayed': 'grow 2s ease-out forwards 0.5s',
        'spin-slow': 'spin 20s linear infinite',
        'sketch-in': 'sketch-in 2s ease-out forwards',
        'page-flip': 'page-flip 1s ease-in-out forwards',
        'drift': 'drift 15s ease-in-out infinite',
        'sprout': 'sprout 3s ease-out forwards',
        'text-reveal': 'text-reveal 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'bounce-in': 'bounce-in 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(10px) rotate(2deg)' },
        },
        'sway-reverse': {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(-10px) rotate(-2deg)' },
        },
        grow: {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: '100%', opacity: '1' },
        },
        'sketch-in': {
          '0%': { strokeDasharray: '0 100', opacity: '0' },
          '100%': { strokeDasharray: '100 0', opacity: '1' },
        },
        'page-flip': {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '50%': { transform: 'perspective(1000px) rotateY(-90deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(0deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(20px) translateY(-10px)' },
          '50%': { transform: 'translateX(-10px) translateY(-5px)' },
          '75%': { transform: 'translateX(15px) translateY(5px)' },
        },
        sprout: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '60%': { transform: 'scaleY(1.1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sky-grass': 'linear-gradient(to bottom, #6EC6FF, #4CAF50)',
        'manifest-page': 'linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%)',
      },
    },
  },
  plugins: [],
};