import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
    FaTachometerAlt, FaUsers, FaParking, FaFileAlt, FaTools, FaBell,
    FaEnvelope, FaCalendarAlt, FaShieldAlt, FaFileContract, FaQuestionCircle,
    FaCog, FaUser, FaBuilding, FaUserTie, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import './SidebarAdmin.css';
import logo from '../../assets/logo.png';
import { FaUserEdit } from "react-icons/fa";



const SidebarAdmin = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();

    const renderTooltip = (text) => (
        <Tooltip id="button-tooltip" className="custom-tooltip">{text}</Tooltip>
    );

    const navItems = [
        { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FaUsers />, label: 'Residentes', path: '/residentes' },
        { icon: <FaParking />, label: 'Cocheras', path: '/cocheras' },
        { icon: <FaFileAlt />, label: 'Reportes', path: '/reportes' },
        { icon: <FaTools />, label: 'Mantenimiento', path: '/mantenimiento' },
        { icon: <FaBell />, label: 'Notificaciones', path: '/notificaciones' },
        { icon: <FaEnvelope />, label: 'Correspondencia', path: '/correspondencia' },
        { icon: <FaCalendarAlt />, label: 'Eventos', path: '/eventos' },
        { icon: <FaShieldAlt />, label: 'Accesos', path: '/accesos' },
        { icon: <FaFileContract />, label: 'Documentos', path: '/documentos' },
        { icon: <FaBuilding />, label: 'Áreas comunes', path: '/areas-comunes' },
        { icon: <FaUserTie />, label: 'Empleados', path: '/empleados' },
        { icon: <FaUserEdit />, label: 'Usuarios', path: '/usuarios' },
    ];

    const footerItems = [
        { icon: <FaQuestionCircle />, label: 'Soporte', path: '/soporte' },
        { icon: <FaCog />, label: 'Configuración', path: '/configuracion' },
        { icon: <FaUser />, label: 'Usuario', path: '/usuario' },
    ];

    return (
        <>
            <div className="sidebar-container">
                {/* Sidebar */}
                <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="sidebar-header">
                        <img src={logo} alt="Parques de la Huaca Logo" className="sidebar-logo" />
                        {!isCollapsed && <h3>Parques de la Huaca</h3>}
                    </div>
                    <div className="sidebar-main-content">
                        <ul className="nav">
                            {navItems.map((item, index) => (
                                <OverlayTrigger
                                    key={index}
                                    placement="right"
                                    overlay={isCollapsed ? renderTooltip(item.label) : <></>}
                                    delay={{ show: 200, hide: 100 }}
                                    offset={[0, 10]}
                                >
                                    <li
                                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                    >
                                        <Link to={item.path} className="nav-link">
                                            <span className="nav-icon">{item.icon}</span>
                                            {!isCollapsed && (
                                                <span className="nav-label">{item.label}</span>
                                            )}
                                        </Link>
                                    </li>
                                </OverlayTrigger>
                            ))}
                        </ul>
                    </div>
                    <div className="sidebar-footer">
                        <ul className="nav">
                            {footerItems.map((item, index) => (
                                <OverlayTrigger
                                    key={index}
                                    placement="right"
                                    overlay={isCollapsed ? renderTooltip(item.label) : <></>}
                                    delay={{ show: 200, hide: 100 }}
                                    offset={[0, 10]}
                                >
                                    <li
                                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                    >
                                        <Link to={item.path} className="nav-link">
                                            <span className="nav-icon">{item.icon}</span>
                                            {!isCollapsed && (
                                                <span className="nav-label">{item.label}</span>
                                            )}
                                        </Link>
                                    </li>
                                </OverlayTrigger>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Botón de toggle en un círculo al costado del sidebar */}
                <button
                    className="toggle-btn-circle"
                    onClick={toggleSidebar}
                    style={{ left: isCollapsed ? '75px' : '255px' }}
                >
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            </div>
        </>
    );
};

export default SidebarAdmin;
