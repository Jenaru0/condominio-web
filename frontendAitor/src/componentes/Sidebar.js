import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaChevronDown } from "react-icons/fa";
import "../estilos/Sidebar.css";
import sidebarConfigAdmin from "../usuarios/administrador/configuracion/sidebarConfigAdmin";
import logo from "../recursos/logo.png";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        setActiveMenu(null); // Cierra todos los submenús al colapsar
    };

    const toggleSubMenu = (index) => {
        setActiveMenu((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
            {/* Botón para expandir/colapsar */}
            <button
                className="toggle-btn-circle"
                onClick={toggleSidebar}
                style={{ left: isCollapsed ? "70px" : "250px" }}
                title={isCollapsed ? "Expandir" : "Colapsar"}
            >
                {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
            </button>

            {/* Sidebar */}
            <div className="sidebar">
                {/* Encabezado */}
                <div className="sidebar-header">
                    <img src={logo} alt="Logo" className="sidebar-logo" />
                    {!isCollapsed && <h3 className="sidebar-title">Parque de la Huaca</h3>}
                </div>

                {/* Opciones de menú */}
                <ul className="nav">
                    {sidebarConfigAdmin.map((item, index) => (
                        <li
                            key={index}
                            className={`nav-item ${item.subItems ? "has-submenu" : ""} ${
                                activeMenu === index ? "active" : ""
                            }`}
                            onMouseEnter={() => isCollapsed && setHoveredItem(index)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() =>
                                item.subItems ? toggleSubMenu(index) : setHoveredItem(null)
                            }
                        >
                            {/* Tooltip para opciones minimizadas */}
                            {isCollapsed && hoveredItem === index && (
                                <div className="tooltip">{item.label}</div>
                            )}

                            <div className="nav-link">
                                <i className="nav-icon">{item.icon}</i>
                                {!isCollapsed && <span className="nav-label">{item.label}</span>}
                                {item.subItems && !isCollapsed && (
                                    <i
                                        className={`submenu-icon ${
                                            activeMenu === index ? "open" : "closed"
                                        }`}
                                    >
                                        <FaChevronDown />
                                    </i>
                                )}
                            </div>

                            {/* Submenú */}
                            {item.subItems && (
                                <ul
                                    className={`${
                                        isCollapsed
                                            ? "collapsed-sub-menu"
                                            : "sub-menu"
                                    } ${activeMenu === index ? "expanded" : ""}`}
                                >
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex} className="sub-menu-item">
                                            <NavLink
                                                to={subItem.path}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "sub-menu-link active"
                                                        : "sub-menu-link"
                                                }
                                            >
                                                {subItem.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
