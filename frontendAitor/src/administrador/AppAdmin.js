import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarAdmin from './componentes/SidebarAdmin';
import Dashboard from './paginas/Dashboard';
import Residentes from './paginas/Residentes';
import Cocheras from './paginas/Cocheras'; // Importamos la página de Cocheras
import './AppAdmin.css';
import Mantenimiento from "./paginas/Mantenimiento";
import Notificaciones from "./paginas/Notificaciones";

const AppAdmin = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Función para alternar el estado del Sidebar
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Router>
            <div className={`app-container ${isCollapsed ? 'collapsed' : ''}`}>
                {/* Sidebar */}
                <SidebarAdmin isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

                {/* Contenido Principal */}
                <div className="main-content">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/residentes" element={<Residentes />} />
                        <Route path="/cocheras" element={<Cocheras />} />
                        <Route path="/mantenimiento" element={<Mantenimiento />} />
                        <Route path="/notificaciones" element={<Notificaciones />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default AppAdmin;
