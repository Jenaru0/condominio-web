import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUser,
    FaHome,
    FaChevronDown,
    FaChevronUp,
    FaMoneyBill,
    FaChartBar,
    FaCar,
    FaBuilding,
    FaTools,
    FaCalendarAlt,
    FaCogs,
    FaFileAlt,
    FaBell,
    FaShieldAlt,
    FaEnvelope,
} from "react-icons/fa";

const SidebarOption = ({
                           to,
                           label,
                           isActive,
                           icon: Icon,
                           isDropdown,
                           collapsed,
                           isOpen,
                           onClick,
                           items,
                       }) => {
    const optionRef = useRef(null);

    return (
        <li
            ref={optionRef}
            className={`relative flex items-center py-2 px-2 rounded-lg transition-colors duration-300 ${
                isActive ? "bg-blue-600 font-semibold" : ""
            } ${collapsed ? "justify-center" : "justify-start"} 
            ${!isActive && !isDropdown ? "hover:bg-blue-500" : ""} 
            ${isDropdown && !isActive ? "hover:bg-blue-500" : ""}`}
            onClick={isDropdown ? onClick : undefined}
            style={{ cursor: isDropdown ? "pointer" : "default" }}
        >
            <div className="flex items-center space-x-2">
                <Icon className="text-lg text-white" />
                {!collapsed && <span className="text-sm text-white">{label}</span>}
            </div>
            {isDropdown && !collapsed && (
                <div className="ml-auto text-white">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            )}
            {!isDropdown && to && (
                <Link to={to} className="absolute inset-0" aria-label={label} />
            )}
            {collapsed && isDropdown && isOpen && (
                <div
                    className="absolute left-full bg-blue-700 text-white rounded-lg shadow-lg w-48 z-50"
                    style={{
                        top: optionRef.current ? optionRef.current.offsetTop : 0,
                        marginLeft: "8px",
                    }}
                >
                    <ul className="space-y-1 p-2">
                        {items?.map((item, index) => (
                            <li
                                key={index}
                                className="hover:bg-blue-600 rounded-md p-2 flex items-center justify-start transition-colors duration-200 w-full"
                            >
                                <Link
                                    to={item.to}
                                    className="flex items-center space-x-3 text-sm text-white no-underline w-full"
                                >
                                    <item.icon className="text-lg" />
                                    <span className="flex-1">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

const SidebarDropdown = ({
                             label,
                             icon: Icon,
                             items,
                             collapsed,
                             isActive,
                             isOpen,
                             onClick,
                         }) => {
    return (
        <div className="relative">
            <SidebarOption
                label={label}
                icon={Icon}
                isDropdown
                isOpen={isOpen}
                onClick={onClick}
                isActive={isActive}
                collapsed={collapsed}
                items={items}
            />
            {!collapsed && isOpen && (
                <ul className="pl-8 mt-1 space-y-1">
                    {items.map((item, index) => (
                        <SidebarOption
                            key={item.to || index}
                            to={item.to}
                            label={item.label}
                            icon={item.icon}
                            collapsed={collapsed}
                            isActive={item.isActive}
                            isOpen={false}
                            isDropdown={false}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

const Sidebar = ({ collapsed }) => {
    const location = useLocation();

    const [openDropdownExpanded, setOpenDropdownExpanded] = useState(null);
    const [openDropdownCollapsed, setOpenDropdownCollapsed] = useState(null);

    const handleDropdownClick = (index) => {
        if (collapsed) {
            setOpenDropdownCollapsed(
                openDropdownCollapsed === index ? null : index
            );
        } else {
            setOpenDropdownExpanded(
                openDropdownExpanded === index ? null : index
            );
        }
    };

    useEffect(() => {
        if (collapsed) {
            setOpenDropdownExpanded(null);
        } else {
            setOpenDropdownCollapsed(null);
        }
    }, [collapsed]);

    const sidebarLinks = [
        { to: "/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
        {
            dropdown: true,
            label: "Usuarios",
            icon: FaUser,
            children: [
                { to: "/usuarios/propietarios", label: "Propietarios", icon: FaUser },
                { to: "/usuarios/inquilinos", label: "Inquilinos", icon: FaUser },
                { to: "/usuarios/empleados", label: "Empleados", icon: FaUser },
                { to: "/usuarios/roles-permisos", label: "Roles y Permisos", icon: FaUser },
            ],
        },
        {
            dropdown: true,
            label: "Propiedades",
            icon: FaHome,
            children: [
                { to: "/propiedades/departamentos", label: "Departamentos", icon: FaBuilding },
                { to: "/propiedades/cocheras", label: "Cocheras", icon: FaCar },
            ],
        },
        {
            dropdown: true,
            label: "Mantenimiento",
            icon: FaTools,
            children: [
                { to: "/mantenimiento/solicitudes-servicio", label: "Solicitudes de Servicio", icon: FaTools },
            ],
        },
        {
            dropdown: true,
            label: "Áreas Comunes",
            icon: FaBuilding,
            children: [
                { to: "/areas-comunes/reservas", label: "Reservas", icon: FaCalendarAlt },
                { to: "/areas-comunes/configuracion", label: "Configuración de Áreas", icon: FaCogs },
            ],
        },
        { to: "/correspondencia", icon: FaEnvelope, label: "Correspondencia" },
        { to: "/eventos", icon: FaCalendarAlt, label: "Eventos" },
        {
            dropdown: true,
            label: "Pagos",
            icon: FaMoneyBill,
            children: [
                { to: "/pagos/verificacion-pagos", label: "Verificación de Pagos", icon: FaMoneyBill },
                { to: "/pagos/estados-de-cuenta", label: "Estados de Cuenta", icon: FaFileAlt },
                { to: "/pagos/facturacion", label: "Facturación", icon: FaFileAlt },
            ],
        },
        {
            dropdown: true,
            label: "Documentos",
            icon: FaFileAlt,
            children: [
                { to: "/documentos/gestion-documentos", label: "Gestión de Documentos", icon: FaFileAlt },
            ],
        },
        {
            dropdown: true,
            label: "Reportes",
            icon: FaChartBar,
            children: [
                { to: "/reportes/financieros", label: "Financieros", icon: FaChartBar },
                { to: "/reportes/operativos", label: "Operativos", icon: FaChartBar },
            ],
        },
        {
            dropdown: true,
            label: "Notificaciones",
            icon: FaBell,
            children: [
                { to: "/notificaciones/enviar", label: "Enviar Notificaciones", icon: FaBell },
                { to: "/notificaciones/historial", label: "Historial de Notificaciones", icon: FaBell },
            ],
        },
        {
            dropdown: true,
            label: "Seguridad",
            icon: FaShieldAlt,
            children: [
                { to: "/seguridad/control-accesos", label: "Control de Accesos", icon: FaShieldAlt },
                { to: "/seguridad/incidentes-seguridad", label: "Incidentes de Seguridad", icon: FaShieldAlt },
            ],
        },
        {
            dropdown: true,
            label: "Configuración",
            icon: FaCogs,
            children: [
                { to: "/configuracion/perfil", label: "Perfil de Administrador", icon: FaCogs },
                { to: "/configuracion/preferencias", label: "Preferencias del Sistema", icon: FaCogs },
            ],
        },
    ];

    const processedLinks = sidebarLinks.map((link) => {
        if (link.dropdown) {
            const childrenProcessed = link.children.map((child) => ({
                ...child,
                isActive: location.pathname === child.to,
            }));
            const anyChildActive = childrenProcessed.some((child) => child.isActive);
            return { ...link, children: childrenProcessed, isActive: anyChildActive };
        } else {
            return { ...link, isActive: link.to && location.pathname === link.to };
        }
    });

    return (
        <div
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-blue-700 text-white shadow-lg transition-all duration-300 ${
                collapsed ? "w-20" : "w-64"
            }`}
        >
            <ul className="space-y-1 pt-2 px-2">
                {processedLinks.map((link, index) =>
                    link.dropdown ? (
                        <SidebarDropdown
                            key={index}
                            label={link.label}
                            icon={link.icon}
                            items={link.children}
                            collapsed={collapsed}
                            isActive={link.isActive}
                            isOpen={
                                collapsed
                                    ? openDropdownCollapsed === index
                                    : openDropdownExpanded === index
                            }
                            onClick={() => handleDropdownClick(index)}
                        />
                    ) : (
                        <SidebarOption
                            key={index}
                            to={link.to}
                            label={link.label}
                            icon={link.icon}
                            isActive={link.isActive}
                            collapsed={collapsed}
                            isDropdown={false}
                        />
                    )
                )}
            </ul>
        </div>
    );
};

export default Sidebar;