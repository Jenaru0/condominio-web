import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaWrench,
  FaUsers,
  FaReceipt,
  FaEnvelope,
  FaCalendarAlt,
  FaClipboardCheck,
  FaBell,
} from "react-icons/fa";

const Dashboard = () => {
  // Datos simulados para el Dashboard (puedes reemplazarlos con datos dinámicos)
  const [dashboardData] = useState({
    incidentesSeguridad: 1,
    solicitudesMantenimiento: 8,
    visitasRecientes: 3,
    boletasPago: 10,
    correspondencia: 2,
    reservasProximas: 5,
    eventosProximos: 2,
  });

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Buenos días, [Usuario]
        </h1>
        <button
          className="flex items-center text-gray-800 py-2 px-4 rounded hover:bg-blue-500 focus:outline-none"
          aria-label="Abrir notificaciones"
        >
          <FaBell className="text-2xl mr-2" /> Notificaciones
        </button>
      </header>

      {/* Dashboard Cards */}
      <section className="w-full max-w-screen-xl mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<FaShieldAlt />}
          title="Incidentes de Seguridad"
          data={`${dashboardData.incidentesSeguridad} Incidente Registrado`}
          link="/incidentes-seguridad"
          linkText="Ver incidentes"
        />
        <DashboardCard
          icon={<FaWrench />}
          title="Solicitudes de Mantenimiento"
          data={`${dashboardData.solicitudesMantenimiento} Pendientes`}
          link="/solicitudes-mantenimiento"
          linkText="Ver todas las solicitudes"
        />
        <DashboardCard
          icon={<FaUsers />}
          title="Visitas Recientes"
          data={`${dashboardData.visitasRecientes} Autorizados`}
          link="/visitas-recientes"
          linkText="Ver detalles de acceso"
        />
        <DashboardCard
          icon={<FaReceipt />}
          title="Boletas de Pago Subidas"
          data={`${dashboardData.boletasPago} Nuevas`}
          link="/boletas-pago"
          linkText="Ver todas las boletas"
        />
        <DashboardCard
          icon={<FaEnvelope />}
          title="Correspondencia Recibida"
          data={`${dashboardData.correspondencia} Paquetes`}
          link="/correspondencia-recibida"
          linkText="Ver toda la correspondencia"
        />
        <DashboardCard
          icon={<FaClipboardCheck />}
          title="Reservas Próximas"
          data={`${dashboardData.reservasProximas} Áreas Comunes Reservadas`}
          link="/reservas-proximas"
          linkText="Gestionar reservas"
        />
        <DashboardCard
          icon={<FaCalendarAlt />}
          title="Eventos del Condominio"
          data={`${dashboardData.eventosProximos} Próximos`}
          link="/eventos-condominio"
          linkText="Ver eventos"
        />
      </section>
    </div>
  );
};

// Componente reutilizable para tarjetas del Dashboard
const DashboardCard = ({ icon, title, data, link, linkText }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className="text-blue-500 text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 text-lg mb-4">{data}</p>
    <Link
      to={link}
      className="text-blue-500 font-semibold hover:underline focus:outline-none"
    >
      {linkText}
    </Link>
  </div>
);

export default Dashboard;
