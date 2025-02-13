/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./about.html",
    "./media_package.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',      // Black
        'secondary': '#9D9D9D',    // Light gray with better contrast
        'secondary-dark': '#7A7A7A',
        'accent': '#FF0000',       // Red
        'highlight': '#008080',    // Teal
        'text-primary': '#FFFFFF', // White text
        'text-secondary': '#9D9D9D', // Updated for better contrast
        'heading-text': '#FFFFFF',  // White for maximum contrast
        'background': '#000000',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section': '5rem',
        'header': '6rem',
      },
    },
  },
  plugins: [],
} 