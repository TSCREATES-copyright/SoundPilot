/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f0f',
        panel: '#181818',
        accent: '#22c55e',
        border: '#2a2a2a'
      }
    }
  },
  plugins: []
}
