const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 1.8s linear infinite',
      },
      backgroundImage: {
        stars: "url('../public/bg-stars.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
