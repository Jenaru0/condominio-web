import {
    FaTachometerAlt,
    FaUser,
    FaHome,
    FaTools,
    FaBuilding,
    FaMoneyBill,
    FaFileAlt,
    FaChartBar,
    FaBell,
    FaShieldAlt,
    FaCogs,
    FaCalendarAlt,
    FaCar,
} from "react-icons/fa";

const linksAdministrador = [
    {
        to: "/dashboard",
        icon: FaTachometerAlt,
        label: "Dashboard",
    },
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
            { to: "/mantenimiento/solicitudes", label: "Solicitudes de Servicio", icon: FaTools },
            { to: "/mantenimiento/historial", label: "Historial de Solicitudes", icon: FaFileAlt },
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
    {
        dropdown: true,
        label: "Pagos",
        icon: FaMoneyBill,
        children: [
            { to: "/pagos/verificacion", label: "Verificación de Pagos", icon: FaMoneyBill },
            { to: "/pagos/estados-cuenta", label: "Estados de Cuenta", icon: FaFileAlt },
            { to: "/pagos/facturacion", label: "Facturación", icon: FaFileAlt },
        ],
    },
    {
        dropdown: true,
        label: "Documentos",
        icon: FaFileAlt,
        children: [
            { to: "/documentos/gestion", label: "Gestión de Documentos", icon: FaFileAlt },
            { to: "/documentos/reglamentos", label: "Reglamentos", icon: FaFileAlt },
        ],
    },
    {
        dropdown: true,
        label: "Reportes",
        icon: FaChartBar,
        children: [
            { to: "/reportes/financieros", label: "Reportes Financieros", icon: FaChartBar },
            { to: "/reportes/operativos", label: "Reportes Operativos", icon: FaChartBar },
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
            { to: "/seguridad/incidentes", label: "Incidentes de Seguridad", icon: FaShieldAlt },
        ],
    },
];

export default linksAdministrador;
