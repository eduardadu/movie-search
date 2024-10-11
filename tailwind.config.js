/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    fontFamily: {
      sans: ['Public Sans', 'sans-serif'],
      bold: ['Public Sans', 'bold'],
      mono: ['Space Mono', 'monospace']
    },
    extend: {
      colors: {
        'light-1': '#FCFCFC',
        'light-2': '#f5f5f5',
        'light-5': '#E8E8E8',
        'light-6': '#E2E2E2',
        'light-10': '#858585',
        'light-12': '#171717'
      },
      dropShadow: {
        '2y': '0 2px 4px rgba(0, 0, 0, 0.02)',
        '16y': '0 16px 32px rgba(0, 0, 0, 0.06)',
        'yellow-16y': '0 4px 8px rgba(200, 200, 0, 0.3)'
      },
      transitionProperty: {
        height: 'height'
      }
    }
  },
  plugins: []
};
