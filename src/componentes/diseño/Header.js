// Header.jsx
import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaCog, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ onLogout, onToggleSidebar }) => (
    <header className="w-full fixed top-0 left-0 bg-blue-700 text-white h-16 flex items-center justify-between px-6 shadow-md z-10">
        <div className="flex items-center">
            <button
                onClick={onToggleSidebar}
                className="text-white hover:text-gray-300 transition-all duration-150 mr-4"
                aria-label="Toggle Sidebar"
            >
                <FaBars size={24} />
            </button>
            <Link
                to="/dashboard"
                className="text-xl font-bold text-white hover:text-gray-300 transition-all duration-150 no-underline"
            >
                Parque de la Huaca
            </Link>
        </div>

        <div className="flex items-center space-x-6">
            <Link
                to="/configuracion"
                className="text-white hover:text-gray-300 transition-all duration-150"
                aria-label="Configuración"
            >
                <FaCog size={24} />
            </Link>

            <Link
                to="/notificaciones"
                className="text-white hover:text-gray-300 transition-all duration-150"
                aria-label="Notificaciones"
            >
                <FaBell size={24} />
            </Link>

            <Link
                to="/perfil"
                className="text-white hover:text-gray-300 transition-all duration-150"
                aria-label="Perfil"
            >
                <FaUserCircle size={24} />
            </Link>

            <button
                onClick={onLogout}
                className="text-white hover:text-gray-300 transition-all duration-150"
                aria-label="Cerrar sesión"
            >
                <FaSignOutAlt size={24} />
            </button>
        </div>
    </header>
);

export default Header;
