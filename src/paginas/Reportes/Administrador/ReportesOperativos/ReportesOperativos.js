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

// Componente de Filtros Operativos
const OperativosFilters = ({ filters, onFilterChange }) => (
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
    <select
      value={filters.categoria}
      onChange={(e) => onFilterChange("categoria", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Categoría (Todos)</option>
      <option value="Mantenimiento">Mantenimiento</option>
      <option value="Ocupación">Ocupación</option>
      <option value="Eventos">Eventos</option>
    </select>
    <select
      value={filters.estado}
      onChange={(e) => onFilterChange("estado", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Estado (Todos)</option>
      <option value="Pendiente">Pendiente</option>
      <option value="En Proceso">En Proceso</option>
      <option value="Finalizado">Finalizado</option>
    </select>
  </div>
);

const Operativos = () => {
  const [operativos, setOperativos] = useState([]);
  const [filteredOperativos, setFilteredOperativos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    categoria: "",
    estado: "",
  });

  const [summary, setSummary] = useState({
    totalMantenimiento: 0,
    totalOcupacion: 0,
    totalEventos: 0,
  });

  useEffect(() => {
    // Simulación de datos operativos
    const mockOperativos = [
      {
        _id: "1",
        fecha: "2023-12-01",
        categoria: "Mantenimiento",
        estado: "Pendiente",
        descripcion: "Reparar luminaria en pasillo",
      },
      {
        _id: "2",
        fecha: "2023-12-03",
        categoria: "Ocupación",
        estado: "Finalizado",
        descripcion: "Departamento 101 asignado a Juan Pérez",
      },
      {
        _id: "3",
        fecha: "2023-12-05",
        categoria: "Eventos",
        estado: "En Proceso",
        descripcion: "Organización de reunión anual",
      },
    ];

    setTimeout(() => {
      setOperativos(mockOperativos);
      setFilteredOperativos(mockOperativos);
      calcularResumen(mockOperativos);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Aplicar filtros dinámicos
    const filtered = operativos.filter((op) => {
      const matchesFechaInicio =
        !filters.fechaInicio ||
        new Date(op.fecha) >= new Date(filters.fechaInicio);
      const matchesFechaFin =
        !filters.fechaFin || new Date(op.fecha) <= new Date(filters.fechaFin);
      const matchesCategoria =
        !filters.categoria || op.categoria === filters.categoria;
      const matchesEstado = !filters.estado || op.estado === filters.estado;

      return (
        matchesFechaInicio &&
        matchesFechaFin &&
        matchesCategoria &&
        matchesEstado
      );
    });

    setFilteredOperativos(filtered);
    calcularResumen(filtered);
  }, [filters, operativos]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const calcularResumen = (data) => {
    const totalMantenimiento = data.filter(
      (op) => op.categoria === "Mantenimiento"
    ).length;
    const totalOcupacion = data.filter(
      (op) => op.categoria === "Ocupación"
    ).length;
    const totalEventos = data.filter((op) => op.categoria === "Eventos").length;

    setSummary({
      totalMantenimiento,
      totalOcupacion,
      totalEventos,
    });
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOperativos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Operativos");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "reportes_operativos.xlsx"
    );
  };

  const datosGrafico = {
    labels: ["Mantenimiento", "Ocupación", "Eventos"],
    datasets: [
      {
        label: "Operaciones Totales",
        data: [
          summary.totalMantenimiento,
          summary.totalOcupacion,
          summary.totalEventos,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando reportes operativos...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Reportes Operativos
      </h1>

      {/* Filtros */}
      <OperativosFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Resumen */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resumen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="text-lg font-semibold">Mantenimiento</p>
            <p className="text-2xl">{summary.totalMantenimiento}</p>
          </div>
          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
            <p className="text-lg font-semibold">Ocupación</p>
            <p className="text-2xl">{summary.totalOcupacion}</p>
          </div>
          <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
            <p className="text-lg font-semibold">Eventos</p>
            <p className="text-2xl">{summary.totalEventos}</p>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Gráfico Operativo</h2>
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
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {filteredOperativos.length > 0 ? (
              filteredOperativos.map((op) => (
                <tr key={op._id} className="border-t">
                  <td className="px-4 py-2">{op.fecha}</td>
                  <td className="px-4 py-2">{op.categoria}</td>
                  <td className="px-4 py-2">{op.estado}</td>
                  <td className="px-4 py-2">{op.descripcion}</td>
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

export default Operativos;
