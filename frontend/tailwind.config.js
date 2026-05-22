/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'law-primary': '#1a365d',
        'law-secondary': '#2d3748',
        'law-accent': '#b8860b',
        'law-success': '#2f855a',
        'law-warning': '#c05621',
        'law-error': '#9b2c2c',
        'law-bg': '#f7fafc',
        'law-card': '#ffffff',
        'law-border': '#e2e8f0',
        'law-text': '#2d3748',
        'law-text-light': '#718096',
      },
      fontFamily: {
        'law': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
