// src/componentes/Navbar.js
import React from "react";
import "../estilos/Navbar.css"; // Ruta corregida

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Puedes agregar el logo aquí */}
        <a href="/" className="navbar-logo">
          Condominio
        </a>
      </div>
      <div className="navbar-right">
        {/* Icono de mensajería */}
        <div className="navbar-icon">
          <i className="fas fa-envelope"></i>
        </div>
        {/* Icono de notificaciones */}
        <div className="navbar-icon">
          <i className="fas fa-bell"></i>
        </div>
        {/* Icono de usuario */}
        <div className="navbar-profile">
          <img
            src="/ruta/a/tu/foto/perfil.jpg"
            alt="Perfil"
            className="navbar-profile-pic"
          />
          <div className="navbar-profile-menu">
            {/* Menú desplegable de perfil */}
            <a href="/perfil">Perfil</a>
            <a href="/logout">Cerrar Sesión</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
