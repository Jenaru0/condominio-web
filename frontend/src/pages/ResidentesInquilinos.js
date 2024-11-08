// src/pages/ResidentesInquilinos.js
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
  FaPlus,
  FaSearch,
  FaTrashAlt,
  FaEdit,
} from 'react-icons/fa';
import '../styles/Dashboard.css';
import '../styles/ResidentesInquilinos.css';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <li className={active ? 'active' : ''}>
    <Link to={to}>
      <Icon className="icon" />
      {label}
    </Link>
  </li>
);

const ResidentesInquilinos = () => {
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
    <div className="dashboard-container">
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
      <div className="main-content">
        <div className="header">
          <h1>Residentes</h1>
          <p>Gestiona los residentes del condominio</p>
        </div>
        <div className="residentes-container">
          <div className="filter-section">
            <button className="add-resident-btn">
              <FaPlus /> Añadir Nuevo Residente
            </button>
            <div className="filters">
              {['Edificio', 'Piso'].map((filter) => (
                <div className="filter" key={filter}>
                  <select className="filter-select">
                    <option>Filtrar por {filter}:</option>
                    {/* Opciones dinámicas */}
                  </select>
                </div>
              ))}
              <div className="filter search-filter">
                <input type="text" className="search-input" placeholder="Buscar por nombre..." />
                <button className="search-btn">
                  <FaSearch /> Buscar
                </button>
              </div>
            </div>
          </div>
          <div className="table-section">
            <table className="residentes-table">
              <thead>
                <tr>
                  {['ID', 'Nombre', 'Email', 'Teléfono', 'Tipo', 'Propietario Asociado', 'Departamento', 'Piso', 'Número de Departamento', 'Estado/Notas', 'Acciones'].map((heading) => (
                    <th key={heading}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[{
                  id: 'P12345', nombre: 'Juan Pérez', email: 'juan.perez@gmail.com', telefono: '+51 987 654 321', tipo: 'Propietario', propietario: '-', departamento: 'Edificio A', piso: '2', numero: '203', estado: 'Al día con pagos'
                }, {
                  id: 'I67890', nombre: 'María García', email: 'maria.garcia@gmail.com', telefono: '+51 987 654 322', tipo: 'Inquilino', propietario: 'Juan Pérez', departamento: 'Edificio A', piso: '2', numero: '203', estado: 'Pago pendiente'
                }].map((residente) => (
                  <tr key={residente.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.id}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.nombre}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.email}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.telefono}</td>
                    <td>
                      <span className={`tag ${residente.tipo.toLowerCase()}`}>{residente.tipo}</span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.propietario}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.departamento}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.piso}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.numero}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{residente.estado}</td>
                    <td>
                      <button className="action-btn edit-btn">
                        <FaEdit />
                      </button>
                      <button className="action-btn delete-btn">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentesInquilinos;