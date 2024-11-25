import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// Componente SidebarLink
const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <li
    className={`my-1 ${
      active
        ? "bg-[#80BAE4] text-white font-semibold"
        : "hover:bg-[#80BAE4] text-white"
    } rounded transition-all duration-200`}
  >
    <Link
      to={to}
      className="flex items-center p-2 rounded no-underline transition-all duration-200 text-white"
    >
      <Icon className="mr-2" />
      <span>{label}</span>
    </Link>
  </li>
);

// Componente SidebarDropdown
const SidebarDropdown = ({ label, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <li className="my-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center w-full p-2 rounded ${
          isOpen ? "bg-[#80BAE4] font-semibold" : "hover:bg-[#80BAE4]"
        } text-white transition-all duration-200`}
      >
        <Icon className="mr-2" />
        <span>{label}</span>
        {isOpen ? (
          <FaChevronUp className="ml-auto" />
        ) : (
          <FaChevronDown className="ml-auto" />
        )}
      </button>
      {isOpen && (
        <ul className="pl-6 mt-2 space-y-1">
          {children.map((child, index) => {
            const isActive = location.pathname === child.to;
            return (
              <li key={index}>
                <Link
                  to={child.to}
                  className={`block p-2 rounded no-underline transition-all duration-200 ${
                    isActive
                      ? "bg-[#80BAE4] text-white font-semibold"
                      : "text-white hover:bg-[#80BAE4]"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

// Componente Sidebar
const Sidebar = () => {
  const location = useLocation();

  const sidebarLinks = [
    {
      items: [
        { to: "/dashboard", icon: FaHome, label: "Panel de Control" },
        { to: "/residentes-inquilinos", icon: FaUserFriends, label: "Residentes" },
        { to: "/gestion-cocheras", icon: FaCar, label: "Gestión de Cocheras" },
        {
          dropdown: true,
          label: "Reportes",
          icon: FaFileAlt,
          children: [
            { to: "/reporte-pagos", label: "Reportes de Pagos" },
            { to: "/reporte-mantenimiento", label: "Reportes de Mantenimiento" },
            { to: "/reporte-correspondencia", label: "Reportes de Correspondencia" },
          ],
        },
        { to: "/solicitudes-mantenimiento", icon: FaTools, label: "Solicitudes de Mantenimiento" },
        { to: "/envio-notificaciones", icon: FaBell, label: "Envío de Notificaciones" },
        { to: "/gestion-correspondencia", icon: FaEnvelope, label: "Gestión de Correspondencia" },
        { to: "/eventos-condominio", icon: FaCalendarAlt, label: "Eventos del Condominio" },
        { to: "/control-monitoreo-accesos", icon: FaEye, label: "Control y Monitoreo de Accesos" },
      ],
    },
    {
      items: [
        { to: "/ayuda-soporte", icon: FaQuestionCircle, label: "Ayuda y Soporte" },
        { to: "/configuracion", icon: FaCogs, label: "Configuración" },
        { to: "/usuario", icon: FaUserCircle, label: "Usuario" },
      ],
    },
  ];

  const renderLinks = (links) =>
    links.map((section, index) => (
      <div key={index}>
        <ul>
          {section.items.map((link) =>
            link.dropdown ? (
              <SidebarDropdown
                key={link.label}
                label={link.label}
                icon={link.icon}
                children={link.children}
              />
            ) : (
              <SidebarLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                active={location.pathname === link.to}
              />
            )
          )}
        </ul>
        {index < links.length - 1 && (
          <div className="border-t border-[#80BAE4] my-4"></div>
        )}
      </div>
    ));

  return (
    <div className="w-64 bg-[#2869A7] text-white h-screen flex flex-col p-4 shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Parques de la Huaca</h2>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        {renderLinks(sidebarLinks)}
      </div>
    </div>
  );
};

export default Sidebar;