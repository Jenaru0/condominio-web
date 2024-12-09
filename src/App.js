import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./paginas/Autenticacion/LoginPage"; // Ajusta la ruta a tu estructura
import AppRoutes from "./rutas/Routes"; // Ajusta la ruta a tu estructura
import ProtectedRoute from "./rutas/ProtectedRoute"; // Ajusta la ruta a tu estructura
import "./componentes/estilos/App.css"; // Importación correcta de estilos

// Componente para el contenido de la aplicación
const AppContent = () => {
  return (
    <Routes>
      {/* Ruta pública (login) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

// Componente principal de la aplicación
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
