/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inset-shadow': 'inset 0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
      },
       colors: {
        customGold: '#D89F5F'
      },
      fontFamily: {
        irish: ['"Irish Grover"', 'cursive'], // Add the font family with a fallback
      },
    },
  },
  plugins: [],
}