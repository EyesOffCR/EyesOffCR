/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',      // Black
        'secondary': '#FFD700',    // Yellow
        'accent': '#FF0000',       // Red
        'highlight': '#00CED1',    // Teal
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section': '4rem',
        'header': '6rem',
      },
    },
  },
  plugins: [],
} 