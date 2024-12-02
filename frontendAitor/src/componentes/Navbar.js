// src/componentes/Navbar.js
import React from 'react';
import { FaEnvelope, FaBell, FaUserCircle } from 'react-icons/fa';
import '../estilos/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* Logo o título */}
                <a href="/" className="navbar-logo">
                    Condominio
                </a>
            </div>
            <div className="navbar-right">
                {/* Icono de mensajería */}
                <div className="navbar-icon">
                    <FaEnvelope />
                </div>
                {/* Icono de notificaciones */}
                <div className="navbar-icon">
                    <FaBell />
                </div>
                {/* Icono de usuario con menú desplegable */}
                <div className="navbar-profile">
                    <FaUserCircle className="navbar-profile-icon" />
                    <div className="navbar-profile-menu">
                        <a href="/perfil">Perfil</a>
                        <a href="/logout">Cerrar Sesión</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
