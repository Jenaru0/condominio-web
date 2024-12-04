import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Datos ficticios para simular una respuesta de API
    const mockData = {
      totalOwners: 15,
      totalTenants: 25,
      totalEmployees: 8,
      totalProperties: 50,
      totalIncome: 10000,
      totalExpenses: 7000,
      totalDebts: 3000,
    };

    // Simular un retraso para cargar datos
    setTimeout(() => {
      setStats(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando datos del dashboard...</p>
      </div>
    );
  }

  // Datos para los gráficos
  const barData = {
    labels: ["Propietarios", "Inquilinos", "Empleados", "Propiedades"],
    datasets: [
      {
        label: "Totales",
        data: [
          stats.totalOwners,
          stats.totalTenants,
          stats.totalEmployees,
          stats.totalProperties,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Ingresos", "Egresos", "Deudas"],
    datasets: [
      {
        data: [stats.totalIncome, stats.totalExpenses, stats.totalDebts],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard de Administrador
      </h1>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Propietarios</h3>
          <p className="text-3xl font-bold text-blue-500">
            {stats.totalOwners}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Inquilinos</h3>
          <p className="text-3xl font-bold text-green-500">
            {stats.totalTenants}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Empleados</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {stats.totalEmployees}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Propiedades</h3>
          <p className="text-3xl font-bold text-red-500">
            {stats.totalProperties}
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Distribución de Usuarios y Propiedades
          </h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Estado Financiero
          </h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
