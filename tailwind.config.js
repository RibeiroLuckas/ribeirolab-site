/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './politica-de-privacidade/index.html',
    './en/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        papel: '#F4F6FB',
        tinta: '#111633',
        grafite: '#5A6080',
        placa: { DEFAULT: '#1840C8', escura: '#0F2C99', clara: '#E8EEFC' },
        linha: '#DDE2EE',
        sinal: '#FFD23F',
        sol: '#FFD23F',
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
