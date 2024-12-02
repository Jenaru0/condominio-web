import {
  FaUsers,
  FaBuilding,
  FaTools,
  FaTree,
  FaEnvelope,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";

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
  {
    label: "Correspondencia",
    path: "/correspondencia",
    icon: <FaEnvelope />,
  },
  {
    label: "Eventos",
    path: "/eventos",
    icon: <FaCalendarAlt />,
  },
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

export default sidebarConfigAdmin;
