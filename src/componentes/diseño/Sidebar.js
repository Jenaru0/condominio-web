// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaHome,
  FaCar,
  FaChevronDown,
  FaChevronUp,
  FaBuilding,
  FaTools,
  FaCalendarAlt,
  FaCogs,
  FaFileAlt,
  FaBell,
  FaShieldAlt,
  FaEnvelope,
  FaMoneyBill,
  FaChartBar,
} from "react-icons/fa";

const SidebarLink = ({ to, icon: Icon, label, collapsed, location }) => {
  const isActive = location.pathname === to;

  return (
    <li
      className={`rounded-lg transition-all duration-200 ${
        isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-blue-500"
      }`}
    >
      <Link
        to={to}
        className={`flex items-center ${
          collapsed ? "justify-center" : ""
        } pl-1 pr-2 py-3 text-sm no-underline text-white`}
      >
        {Icon && <Icon className="text-xl" />}
        {!collapsed && <span className="ml-1">{label}</span>}
      </Link>
    </li>
  );
};

const SidebarDropdown = ({
  label,
  icon: Icon,
  children = [],
  collapsed,
  location,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!collapsed) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`flex items-center ${
          collapsed ? "justify-center" : ""
        } w-full pl-1 pr-2 py-3 rounded-lg transition-all duration-200 ${
          isOpen ? "bg-blue-600 font-semibold" : "hover:bg-blue-500"
        } text-white text-sm`}
      >
        {Icon && <Icon className="text-xl" />}
        {!collapsed && <span className="ml-1">{label}</span>}
        {!collapsed &&
          (isOpen ? (
            <FaChevronUp className="ml-auto text-sm" />
          ) : (
            <FaChevronDown className="ml-auto text-sm" />
          ))}
      </button>
      {isOpen && !collapsed && children.length > 0 && (
        <ul className="pl-4 mt-2 space-y-1">
          {children.map((child, index) =>
            child.dropdown ? (
              <SidebarDropdown
                key={child.label || index}
                label={child.label}
                icon={child.icon}
                children={child.children}
                collapsed={collapsed}
                location={location}
              />
            ) : (
              <SidebarLink
                key={child.to || index}
                to={child.to}
                label={child.label}
                icon={child.icon}
                collapsed={collapsed}
                location={location}
              />
            )
          )}
        </ul>
      )}
    </li>
  );
};

const Sidebar = ({ onExpand, onCollapse, collapsed }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onExpand) onExpand();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onCollapse) onCollapse();
  };

  useEffect(() => {
    if (isHovered) {
      if (onExpand) onExpand();
    } else {
      if (onCollapse) onCollapse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  const sidebarLinks = [
    {
      items: [
        { to: "/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
        {
          dropdown: true,
          label: "Usuarios",
          icon: FaUser,
          children: [
            {
              to: "/usuarios/propietarios",
              label: "Propietarios",
              icon: FaUser,
            },
            { to: "/usuarios/inquilinos", label: "Inquilinos", icon: FaUser },
            { to: "/usuarios/empleados", label: "Empleados", icon: FaUser },
            {
              to: "/usuarios/roles-permisos",
              label: "Roles y Permisos",
              icon: FaUser,
            },
          ],
        },
        {
          dropdown: true,
          label: "Propiedades",
          icon: FaHome,
          children: [
            {
              to: "/propiedades/departamentos",
              label: "Departamentos",
              icon: FaBuilding,
            },
            {
              to: "/propiedades/cocheras",
              label: "Cocheras",
              icon: FaCar,
            },
          ],
        },
        {
          dropdown: true,
          label: "Mantenimiento",
          icon: FaTools,
          children: [
            {
              to: "/mantenimiento/solicitudes",
              label: "Solicitudes de Servicio",
              icon: FaTools,
            },
            {
              to: "/mantenimiento/historial",
              label: "Historial de Solicitudes",
              icon: FaTools,
            },
          ],
        },
        {
          dropdown: true,
          label: "Áreas Comunes",
          icon: FaBuilding,
          children: [
            {
              to: "/areas-comunes/reservas",
              label: "Reservas",
              icon: FaCalendarAlt,
            },
            {
              to: "/areas-comunes/configuracion",
              label: "Configuración de Áreas",
              icon: FaCogs,
            },
          ],
        },
        {
          to: "/correspondencia",
          icon: FaEnvelope,
          label: "Correspondencia",
        },
        {
          to: "/eventos",
          icon: FaCalendarAlt,
          label: "Eventos",
        },
        {
          dropdown: true,
          label: "Pagos",
          icon: FaMoneyBill,
          children: [
            {
              to: "/pagos/verificacion",
              label: "Verificación de Pagos",
              icon: FaMoneyBill,
            },
            {
              to: "/pagos/estados-de-cuenta",
              label: "Estados de Cuenta",
              icon: FaFileAlt,
            },
            {
              to: "/pagos/facturacion",
              label: "Facturación",
              icon: FaFileAlt,
            },
          ],
        },
        {
          dropdown: true,
          label: "Documentos",
          icon: FaFileAlt,
          children: [
            {
              to: "/documentos/contratos",
              label: "Contratos y Documentos Legales",
              icon: FaFileAlt,
            },
            {
              to: "/documentos/reglamentos",
              label: "Reglamentos",
              icon: FaFileAlt,
            },
          ],
        },
        {
          dropdown: true,
          label: "Reportes",
          icon: FaChartBar,
          children: [
            {
              to: "/reportes/financieros",
              label: "Financieros",
              icon: FaChartBar,
            },
            {
              to: "/reportes/mantenimiento",
              label: "Mantenimiento",
              icon: FaChartBar,
            },
            {
              to: "/reportes/ocupacion",
              label: "Ocupación",
              icon: FaChartBar,
            },
            {
              to: "/reportes/eventos-reservas",
              label: "Eventos y Reservas",
              icon: FaChartBar,
            },
          ],
        },
        {
          dropdown: true,
          label: "Notificaciones",
          icon: FaBell,
          children: [
            {
              to: "/notificaciones/enviar",
              label: "Enviar Notificaciones",
              icon: FaBell,
            },
            {
              to: "/notificaciones/historial",
              label: "Historial de Notificaciones",
              icon: FaBell,
            },
          ],
        },
        {
          dropdown: true,
          label: "Seguridad",
          icon: FaShieldAlt,
          children: [
            {
              to: "/seguridad/control-accesos",
              label: "Control de Accesos",
              icon: FaShieldAlt,
            },
            {
              to: "/seguridad/incidentes",
              label: "Incidentes de Seguridad",
              icon: FaShieldAlt,
            },
          ],
        },
        {
          dropdown: true,
          label: "Configuración",
          icon: FaCogs,
          children: [
            {
              to: "/configuracion/perfil",
              label: "Perfil de Administrador",
              icon: FaCogs,
            },
            {
              to: "/configuracion/preferencias",
              label: "Preferencias del Sistema",
              icon: FaCogs,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] pt-4 bg-blue-700 text-white overflow-y-auto transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="space-y-1 pl-0">
        {sidebarLinks.map((section, index) => (
          <React.Fragment key={index}>
            {section.items.map((link) =>
              link.dropdown ? (
                <SidebarDropdown
                  key={link.label}
                  label={link.label}
                  icon={link.icon}
                  children={link.children}
                  collapsed={collapsed}
                  location={location}
                />
              ) : (
                <SidebarLink
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  collapsed={collapsed}
                  location={location}
                />
              )
            )}
            {index < sidebarLinks.length - 1 && (
              <div className="border-t border-blue-500 my-3"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
