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
    FaEnvelope, // Añadido para correspondencia
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
        label: "Mantenimiento",
        icon: FaTools,
        children: [
            { to: "/mantenimiento/solicitudes", label: "Solicitudes de Mantenimiento", icon: FaTools },
            { to: "/mantenimiento/historial-solicitudes", label: "Historial de Solicitudes", icon: FaFileAlt },
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
        label: "Seguridad",
        icon: FaShieldAlt,
        children: [
            { to: "/seguridad/control-accesos", label: "Control de Accesos", icon: FaShieldAlt },
            { to: "/seguridad/incidentes-seguridad", label: "Incidentes de Seguridad", icon: FaShieldAlt },
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
        to: "/documentos/gestion-documentos",
        icon: FaFileAlt,
        label: "Documentos",
    },
    {
        to: "/enviar-notificaciones",
        icon: FaBell,
        label: "Enviar notificaciones",
    },
    {
        to: "/eventos",
        icon: FaCalendarAlt,
        label: "Eventos",
    },
    {
        to: "/correspondencia",
        icon: FaEnvelope,
        label: "Correspondencia",
    },
];

export default linksAdministrador;
