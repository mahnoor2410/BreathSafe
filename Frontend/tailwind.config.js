/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'serif'],
      },
      fontWeight: {
        light: 100,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        heavy: 800,
      },
      colors:{
      primary:'#1F2937',
      secondary:'#E5E7EB'
      },
    },
  },
  plugins: [],
}

