/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './politica-de-privacidade/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        papel: '#F6F7F9',
        tinta: '#1B2440',
        grafite: '#545D72',
        placa: { DEFAULT: '#1F4FD1', escura: '#173CA3', clara: '#E8EEFC' },
        linha: '#D9DEE7',
        sinal: '#F2B705',
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
      },
      maxWidth: { pagina: '1180px' },
      borderRadius: { moldura: '10px' },
    },
  },
  plugins: [],
}
