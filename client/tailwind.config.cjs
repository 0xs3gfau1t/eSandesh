/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Playfair Display", "serif"],
        secondary: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
