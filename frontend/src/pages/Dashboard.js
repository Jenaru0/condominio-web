import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserFriends,
  FaCar,
  FaFileAlt,
  FaTools,
  FaBell,
  FaEnvelope,
  FaCalendarAlt,
  FaEye,
  FaCogs,
  FaQuestionCircle,
  FaUserCircle,
} from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const location = useLocation(); // Para obtener la ruta actual

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Parques de la Huaca</h2>
        </div>
        <div className="sidebar-menu-wrapper">
          <ul className="sidebar-menu">
            <li className={location.pathname === "/dashboard" ? "active" : ""}>
              <Link to="/dashboard">
                <FaHome className="icon" />
                Panel de Control
              </Link>
            </li>
            <li className={location.pathname === "/residentes-inquilinos" ? "active" : ""}>
              <Link to="/residentes-inquilinos">
                <FaUserFriends className="icon" />
                Residentes
              </Link>
            </li>
            <li className={location.pathname === "/gestion-cocheras" ? "active" : ""}>
              <Link to="/gestion-cocheras">
                <FaCar className="icon" />
                Gestión de Cocheras
              </Link>
            </li>
            <li className={location.pathname === "/reportes" ? "active" : ""}>
              <Link to="/reportes">
                <FaFileAlt className="icon" />
                Reportes
              </Link>
            </li>
            <li className={location.pathname === "/solicitudes-mantenimiento" ? "active" : ""}>
              <Link to="/solicitudes-mantenimiento">
                <FaTools className="icon" />
                Solicitudes de Mantenimiento
              </Link>
            </li>
            <li className={location.pathname === "/envio-notificaciones" ? "active" : ""}>
              <Link to="/envio-notificaciones">
                <FaBell className="icon" />
                Envío de Notificaciones
              </Link>
            </li>
            <li className={location.pathname === "/gestion-correspondencia" ? "active" : ""}>
              <Link to="/gestion-correspondencia">
                <FaEnvelope className="icon" />
                Gestión de Correspondencia
              </Link>
            </li>
            <li className={location.pathname === "/eventos-condominio" ? "active" : ""}>
              <Link to="/eventos-condominio">
                <FaCalendarAlt className="icon" />
                Eventos del Condominio
              </Link>
            </li>
            <li className={location.pathname === "/control-monitoreo-accesos" ? "active" : ""}>
              <Link to="/control-monitoreo-accesos">
                <FaEye className="icon" />
                Control y Monitoreo de Accesos
              </Link>
            </li>
            <li className={location.pathname === "/gestion-contratos" ? "active" : ""}>
              <Link to="/gestion-contratos">
                <FaFileAlt className="icon" />
                Gestión de Contratos y Documentos
              </Link>
            </li>
          </ul>
          <div className="sidebar-separator"></div>
          <ul className="sidebar-menu">
            <li className={location.pathname === "/ayuda-soporte" ? "active" : ""}>
              <Link to="/ayuda-soporte">
                <FaQuestionCircle className="icon" />
                Ayuda y Soporte
              </Link>
            </li>
            <li className={location.pathname === "/configuracion" ? "active" : ""}>
              <Link to="/configuracion">
                <FaCogs className="icon" />
                Configuración
              </Link>
            </li>
            <li className={location.pathname === "/usuario" ? "active" : ""}>
              <Link to="/usuario">
                <FaUserCircle className="icon" />
                Usuario
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Panel de Control</h1>
          <p>Resumen del estado actual del condominio</p>
        </div>
        <div className="cards-container">
          <div className="card">
            <h3>Pagos Pendientes</h3>
            <p>S/.5,000.00</p>
            <Link to="/pagos-pendientes">Ver todos los pagos</Link>
          </div>
          <div className="card">
            <h3>Solicitudes de Mantenimiento</h3>
            <p>8 Pendientes</p>
            <Link to="/solicitudes-mantenimiento">Ver todas las solicitudes</Link>
          </div>
          <div className="card">
            <h3>Visitas Recientes</h3>
            <p>3 Autorizados</p>
            <Link to="/visitas-recientes">Ver detalles de acceso</Link>
          </div>
          <div className="card">
            <h3>Boletas de Pago Subidas</h3>
            <p>10 Nuevas</p>
            <Link to="/boletas-pago">Ver todas las boletas</Link>
          </div>
          <div className="card">
            <h3>Correspondencia Recibida</h3>
            <p>2 Paquetes</p>
            <Link to="/correspondencia-recibida">Ver toda la correspondencia</Link>
          </div>
          <div className="card">
            <h3>Reservas Próximas</h3>
            <p>5 Áreas Comunes Reservadas</p>
            <Link to="/reservas-proximas">Gestionar reservas</Link>
          </div>
          <div className="card">
            <h3>Eventos del Condominio</h3>
            <p>2 Próximos</p>
            <Link to="/eventos-condominio">Ver eventos</Link>
          </div>
          <div className="card">
            <h3>Incidentes de Seguridad</h3>
            <p>1 Incidente Registrado</p>
            <Link to="/incidentes-seguridad">Ver incidentes</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
