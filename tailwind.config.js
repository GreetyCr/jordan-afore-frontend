/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0A1628',
          800: '#0F1E35',
          700: '#152842',
          600: '#1A334F',
        },
        accent: {
          cyan: '#06B6D4',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          green: '#10B981',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      },
    },
  },
  plugins: [],
}
