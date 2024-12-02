import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronDown,
  FaUsers,
  FaBuilding,
  FaTools,
  FaTree,
  FaEnvelope,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";
import logo from "../recursos/logo.png";

// Configuración del menú del Sidebar
const sidebarConfigAdmin = [
  {
    label: "Usuarios",
    path: "/usuarios",
    icon: <FaUsers />,
    subItems: [
      { label: "Propietarios", path: "/usuarios/propietarios" },
      { label: "Inquilinos", path: "/usuarios/inquilinos" },
      { label: "Empleados", path: "/usuarios/empleados" },
      { label: "Roles y Permisos", path: "/usuarios/roles-permisos" },
    ],
  },
  {
    label: "Propiedades",
    path: "/propiedades",
    icon: <FaBuilding />,
    subItems: [
      { label: "Departamentos", path: "/propiedades/departamentos" },
      { label: "Cocheras", path: "/propiedades/cocheras" },
    ],
  },
  {
    label: "Mantenimiento",
    path: "/mantenimiento",
    icon: <FaTools />,
    subItems: [
      { label: "Solicitudes de Servicio", path: "/mantenimiento/solicitudes" },
      { label: "Historial de Solicitudes", path: "/mantenimiento/historial" },
    ],
  },
  {
    label: "Áreas",
    path: "/areas-comunes",
    icon: <FaTree />,
    subItems: [
      { label: "Reservas", path: "/areas-comunes/reservas" },
      { label: "Configuración de Áreas", path: "/areas-comunes/configuracion" },
    ],
  },
  { label: "Correspondencia", path: "/correspondencia", icon: <FaEnvelope /> },
  { label: "Eventos", path: "/eventos", icon: <FaCalendarAlt /> },
  {
    label: "Pagos",
    path: "/pagos",
    icon: <FaMoneyBillWave />,
    subItems: [
      { label: "Verificación de Pagos", path: "/pagos/verificacion" },
      { label: "Estados de Cuenta", path: "/pagos/estados" },
      { label: "Facturación", path: "/pagos/facturacion" },
    ],
  },
  {
    label: "Documentos",
    path: "/documentos",
    icon: <FaFileAlt />,
    subItems: [
      {
        label: "Contratos y Documentos Legales",
        path: "/documentos/contratos",
      },
      { label: "Reglamentos", path: "/documentos/reglamentos" },
    ],
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setActiveMenu(null); // Cierra todos los submenús al colapsar
  };

  const toggleSubMenu = (index) => {
    setActiveMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      className={`bg-blue-900 text-white h-screen fixed top-0 left-0 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Botón para expandir/colapsar */}
      <button
        className={`absolute top-4 -right-4 bg-blue-800 text-yellow-400 p-2 rounded-full shadow-lg transition-transform duration-300 ${
          isCollapsed ? "translate-x-0" : "-translate-x-6"
        }`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
      </button>

      {/* Encabezado */}
      <div className="flex items-center space-x-4 p-4 border-b border-white/10">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        {!isCollapsed && (
          <h3 className="text-lg font-semibold">Parque de la Huaca</h3>
        )}
      </div>

      {/* Menú */}
      <nav className="mt-4">
        <ul>
          {sidebarConfigAdmin.map((item, index) => (
            <li key={index} className="relative group">
              <div
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-700 ${
                  activeMenu === index ? "bg-blue-700" : ""
                }`}
                onClick={() => (item.subItems ? toggleSubMenu(index) : null)}
              >
                <div className="text-xl">{item.icon}</div>
                {!isCollapsed && (
                  <span className="ml-4 flex-1 text-sm font-medium">
                    {item.label}
                  </span>
                )}
                {item.subItems && (
                  <FaChevronDown
                    className={`ml-auto transition-transform ${
                      activeMenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* Submenú */}
              {item.subItems && activeMenu === index && (
                <ul className="pl-8 mt-2 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded text-sm hover:bg-blue-600 ${
                            isActive ? "bg-blue-700 font-semibold" : ""
                          }`
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
      </nav>
    </div>
  );
};

export default Sidebar;
