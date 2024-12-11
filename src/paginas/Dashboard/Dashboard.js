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
import { motion } from "framer-motion";
import { FaUser, FaBuilding, FaUsers } from "react-icons/fa";
import LoadingSpinner from "../../componentes/comunes/LoadingSpinner";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = {
      totalOwners: 15,
      totalTenants: 25,
      totalEmployees: 8,
      totalProperties: 50,
      totalIncome: 10000,
      totalExpenses: 7000,
      totalDebts: 3000,
    };

    setTimeout(() => {
      setStats(mockData);
      setLoading(false);
    }, 3000); // Tiempo de carga simulado
  }, []);

  if (loading) {
    return <LoadingSpinner text="Cargando Dashboard..." />;
  }

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
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
      },
    ],
  };

  const pieData = {
    labels: ["Ingresos", "Egresos", "Deudas"],
    datasets: [
      {
        data: [stats.totalIncome, stats.totalExpenses, stats.totalDebts],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverOffset: 10,
      },
    ],
  };

  const summaryCards = [
    {
      label: "Propietarios",
      value: stats.totalOwners,
      color: "from-blue-500 to-blue-700",
      icon: <FaUser />,
    },
    {
      label: "Inquilinos",
      value: stats.totalTenants,
      color: "from-green-500 to-green-700",
      icon: <FaUsers />,
    },
    {
      label: "Empleados",
      value: stats.totalEmployees,
      color: "from-yellow-500 to-yellow-700",
      icon: <FaUsers />,
    },
    {
      label: "Propiedades",
      value: stats.totalProperties,
      color: "from-red-500 to-red-700",
      icon: <FaBuilding />,
    },
  ];

  return (
      <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        {/* Título del dashboard */}
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 border-b-4 border-blue-500 pb-2">
            Dashboard de Administrador
          </h1>
        </motion.div>

        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {summaryCards.map((item, index) => (
              <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${item.color} shadow-xl rounded-xl p-6 flex flex-row items-center transform hover:scale-105 hover:brightness-105 transition-transform duration-300`}
              >
                <div className="w-16 h-16 bg-white text-blue-800 rounded-full flex items-center justify-center text-3xl shadow-lg mr-4 border border-gray-200">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                  <p className="text-4xl font-extrabold text-white">{item.value}</p>
                </div>
              </motion.div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
              className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-gray-700 mb-6 text-left">
              Distribución de Usuarios y Propiedades
            </h3>
            <Bar data={barData} />
          </motion.div>
          <motion.div
              className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-pink-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-gray-700 mb-6 text-left">
              Estado Financiero
            </h3>
            <div className="max-w-sm mx-auto">
              <Pie data={pieData} />
            </div>
          </motion.div>
        </div>
      </div>
  );
};

export default Dashboard;
