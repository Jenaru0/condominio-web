import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Componente para los filtros
const FinanceFilters = ({ filters, onFilterChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <input
      type="date"
      value={filters.fechaInicio}
      onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    />
    <input
      type="date"
      value={filters.fechaFin}
      onChange={(e) => onFilterChange("fechaFin", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    />
    <input
      type="text"
      value={filters.categoria}
      onChange={(e) => onFilterChange("categoria", e.target.value)}
      placeholder="Buscar por categoría..."
      className="border rounded-lg px-4 py-2 w-full"
    />
    <input
      type="text"
      value={filters.monto}
      onChange={(e) => onFilterChange("monto", e.target.value)}
      placeholder="Rango de monto..."
      className="border rounded-lg px-4 py-2 w-full"
    />
  </div>
);

const Financieros = () => {
  const [finanzas, setFinanzas] = useState([]);
  const [filteredFinanzas, setFilteredFinanzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    categoria: "",
    monto: "",
  });

  const [summary, setSummary] = useState({
    totalIngresos: 0,
    totalEgresos: 0,
    balance: 0,
  });

  useEffect(() => {
    // Simulación de datos de reportes financieros
    const mockFinanzas = [
      {
        _id: "1",
        fecha: "2023-12-01",
        categoria: "Mantenimiento",
        tipo: "Ingreso",
        monto: 350.0,
      },
      {
        _id: "2",
        fecha: "2023-12-05",
        categoria: "Servicio de Limpieza",
        tipo: "Egreso",
        monto: 120.0,
      },
      {
        _id: "3",
        fecha: "2023-12-10",
        categoria: "Renta de Cocheras",
        tipo: "Ingreso",
        monto: 500.0,
      },
    ];

    setTimeout(() => {
      setFinanzas(mockFinanzas);
      setFilteredFinanzas(mockFinanzas);
      calcularResumen(mockFinanzas);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Aplicar filtros
    const filtered = finanzas.filter((finanza) => {
      const matchesFechaInicio =
        !filters.fechaInicio ||
        new Date(finanza.fecha) >= new Date(filters.fechaInicio);
      const matchesFechaFin =
        !filters.fechaFin ||
        new Date(finanza.fecha) <= new Date(filters.fechaFin);
      const matchesCategoria =
        !filters.categoria ||
        finanza.categoria
          .toLowerCase()
          .includes(filters.categoria.toLowerCase());
      const matchesMonto =
        !filters.monto ||
        parseFloat(finanza.monto) <= parseFloat(filters.monto);

      return (
        matchesFechaInicio &&
        matchesFechaFin &&
        matchesCategoria &&
        matchesMonto
      );
    });

    setFilteredFinanzas(filtered);
    calcularResumen(filtered);
  }, [filters, finanzas]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const calcularResumen = (data) => {
    const totalIngresos = data
      .filter((finanza) => finanza.tipo === "Ingreso")
      .reduce((sum, finanza) => sum + finanza.monto, 0);
    const totalEgresos = data
      .filter((finanza) => finanza.tipo === "Egreso")
      .reduce((sum, finanza) => sum + finanza.monto, 0);

    setSummary({
      totalIngresos,
      totalEgresos,
      balance: totalIngresos - totalEgresos,
    });
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredFinanzas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Financieros");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "reportes_financieros.xlsx"
    );
  };

  const datosGrafico = {
    labels: ["Ingresos", "Egresos"],
    datasets: [
      {
        label: "Resumen Financiero",
        data: [summary.totalIngresos, summary.totalEgresos],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Cargando reportes financieros...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Reportes Financieros
      </h1>

      {/* Filtros */}
      <FinanceFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Resumen */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resumen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="text-lg font-semibold">Total Ingresos</p>
            <p className="text-2xl">S/ {summary.totalIngresos.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            <p className="text-lg font-semibold">Total Egresos</p>
            <p className="text-2xl">S/ {summary.totalEgresos.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
            <p className="text-lg font-semibold">Balance</p>
            <p className="text-2xl">S/ {summary.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Gráfico Financiero</h2>
        <Bar data={datosGrafico} />
      </div>

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4 flex justify-end">
          <button
            onClick={exportarExcel}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Exportar a Excel
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Categoría</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Monto</th>
            </tr>
          </thead>
          <tbody>
            {filteredFinanzas.length > 0 ? (
              filteredFinanzas.map((finanza) => (
                <tr key={finanza._id} className="border-t">
                  <td className="px-4 py-2">{finanza.fecha}</td>
                  <td className="px-4 py-2">{finanza.categoria}</td>
                  <td className="px-4 py-2">{finanza.tipo}</td>
                  <td className="px-4 py-2">S/ {finanza.monto.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No se encontraron registros con los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financieros;
