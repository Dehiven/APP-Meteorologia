/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90D9',
        secondary: '#6B7280',
        accent: '#F59E0B',
        background: '#F3F4F6',
        card: '#FFFFFF',
        'card-dark': '#1F2937',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'md': '12px',
      },
    },
  },
  plugins: [],
}
