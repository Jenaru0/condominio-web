import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Importa las rutas definidas

function App() {
  return (
    <Router>
      <AppRoutes /> {/* Aquí cargamos todas las rutas definidas en Routes.js */}
    </Router>
  );
}

export default App;
