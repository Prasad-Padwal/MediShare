/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#F3E8FF',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        pink: {
          100: '#FCE7F3',
          500: '#EC4899',
          600: '#DB2777',
        },
        blue: {
          100: '#E0F2FE',
        },
      },
    },
  },
  plugins: [],
};
