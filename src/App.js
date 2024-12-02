// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./componentes/diseño/Navbar";
import Sidebar from "./componentes/diseño/Sidebar";

// Importar las páginas

// Resto del código...

function App() {
  const userRole = "administrador"; // Puedes reemplazarlo con lógica de autenticación real

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Sidebar userRole={userRole} />
        <div className="content">
          <Routes>
            {/* Define las rutas para el administrador */}
            {/* Agrega más rutas según tus páginas */}
            <Route path="*" element={<Navigate to="/usuarios" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
