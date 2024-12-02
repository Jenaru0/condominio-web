// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Sidebar from './componentes/Sidebar';

// Importar las páginas
import Usuarios from './usuarios/administrador/paginas/Usuarios';
import Propiedades from './usuarios/administrador/paginas/Propiedades';

// Importar el archivo CSS principal
import './estilos/App.css';

function App() {
    const userRole = 'administrador'; // Puedes reemplazarlo con lógica de autenticación real

    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Sidebar userRole={userRole} />
                <div className="content">
                    <Routes>
                        {/* Define las rutas para el administrador */}
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/propiedades" element={<Propiedades />} />
                        {/* Agrega más rutas según tus páginas */}
                        <Route path="*" element={<Navigate to="/usuarios" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
