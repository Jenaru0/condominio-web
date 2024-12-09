/** @type {import('tailwindcss').Config} */
const plugin = require("tailwind-scrollbar");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        scrollbarTrack: "transparent", // Track transparente
        scrollbarThumb: "#b0bec5", // Gris claro para el thumb
        scrollbarThumbHover: "#90a4ae", // Gris más oscuro en hover
        scrollbarThumbActive: "#78909c", // Gris aún más oscuro al hacer click
      },
      borderRadius: {
        scrollbar: "9999px", // Bordes completamente redondeados
      },
    },
  },
  plugins: [
    plugin({ nocompatible: true }), // Activa el plugin del scrollbar
    require("tailwind-scrollbar"), // Asegúrate de incluir esto
  ],
};
