// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './Routes';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para la página de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas que solo se muestran si el usuario está autenticado */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Sidebar /> {/* Sidebar solo se muestra en rutas protegidas */}
                <main className="main-content">
                  <AppRoutes />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
