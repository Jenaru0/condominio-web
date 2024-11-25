module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Archivos donde se usarán las clases de Tailwind
    "./public/index.html", // Otras rutas relevantes
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#2869A7',
        selected: '#80BAE4',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
