/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F1E7',
        foreground: '#1F2937',
        matcha: '#6B8E23',
        sakura: '#D8A7B1',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
