/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        recipe: {
          primary: '#32936F',     // Verde menta - frescura
          secondary: '#FA8334',   // Naranja cálido - creatividad
          accent1: '#E2D686',     // Amarillo mantequilla - destacados
          accent2: '#BE5A38',     // Marrón cálido - elementos secundarios
          dark: '#4A2545',        // Berenjena - contraste y profundidad
          light: '#F2F7F2',       // Blanco verdoso claro - fondo principal
          paper: '#FDFAF0',       // Blanco hueso - paneles y tarjetas
          text: '#2A3D45'         // Gris azulado oscuro - texto principal
        }
      },
      fontFamily: {
        'baloo': ['Moodcake', '"Baloo Bhaijaan 2"', 'cursive'],
        'moodcake': ['Moodcake', 'cursive'],
      },
    },
  },
  plugins: [],
}
