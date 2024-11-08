// src/components/Sidebar.js
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
import '../styles/Sidebar.css';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <li className={active ? 'active' : ''}>
    <Link to={to}>
      <Icon className="icon" />
      {label}
    </Link>
  </li>
);

const Sidebar = () => {
  const location = useLocation();

  const sidebarLinks = [
    { to: '/dashboard', icon: FaHome, label: 'Panel de Control' },
    { to: '/residentes-inquilinos', icon: FaUserFriends, label: 'Residentes' },
    { to: '/gestion-cocheras', icon: FaCar, label: 'Gestión de Cocheras' },
    { to: '/reportes', icon: FaFileAlt, label: 'Reportes' },
    { to: '/solicitudes-mantenimiento', icon: FaTools, label: 'Solicitudes de Mantenimiento' },
    { to: '/envio-notificaciones', icon: FaBell, label: 'Envío de Notificaciones' },
    { to: '/gestion-correspondencia', icon: FaEnvelope, label: 'Gestión de Correspondencia' },
    { to: '/eventos-condominio', icon: FaCalendarAlt, label: 'Eventos del Condominio' },
    { to: '/control-monitoreo-accesos', icon: FaEye, label: 'Control y Monitoreo de Accesos' },
    { to: '/gestion-contratos', icon: FaFileAlt, label: 'Gestión de Contratos y Documentos' },
  ];

  const supportLinks = [
    { to: '/ayuda-soporte', icon: FaQuestionCircle, label: 'Ayuda y Soporte' },
    { to: '/configuracion', icon: FaCogs, label: 'Configuración' },
    { to: '/usuario', icon: FaUserCircle, label: 'Usuario' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Parques de la Huaca</h2>
      </div>
      <div className="sidebar-menu-wrapper">
        <ul className="sidebar-menu">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={location.pathname === link.to}
            />
          ))}
        </ul>
        <div className="sidebar-separator"></div>
        <ul className="sidebar-menu">
          {supportLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={location.pathname === link.to}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
