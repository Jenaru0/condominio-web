import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

// Componente de filtros
const IncidentFilters = ({ filters, onFilterChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <select
      value={filters.estado}
      onChange={(e) => onFilterChange("estado", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Estado (Todos)</option>
      <option value="Pendiente">Pendiente</option>
      <option value="En Proceso">En Proceso</option>
      <option value="Resuelto">Resuelto</option>
    </select>
    <select
      value={filters.prioridad}
      onChange={(e) => onFilterChange("prioridad", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Prioridad (Todas)</option>
      <option value="Alta">Alta</option>
      <option value="Media">Media</option>
      <option value="Baja">Baja</option>
    </select>
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
      value={filters.busqueda}
      onChange={(e) => onFilterChange("busqueda", e.target.value)}
      placeholder="Buscar por descripción..."
      className="border rounded-lg px-4 py-2 w-full"
    />
  </div>
);

// Componente principal
const IncidentesSeguridad = () => {
  const [incidentes, setIncidentes] = useState([]);
  const [filteredIncidentes, setFilteredIncidentes] = useState([]);
  const [filters, setFilters] = useState({
    estado: "",
    prioridad: "",
    fechaInicio: "",
    fechaFin: "",
    busqueda: "",
  });
  const [loading, setLoading] = useState(true);

  // Estadísticas de incidentes
  const [stats, setStats] = useState({
    pendiente: 0,
    enProceso: 0,
    resuelto: 0,
  });

  useEffect(() => {
    // Simulación de datos de incidentes
    const mockIncidentes = [
      {
        _id: "1",
        descripcion: "Robo en el Edificio A, Piso 3",
        fechaIncidente: "2023-12-01",
        prioridad: "Alta",
        estado: "Pendiente",
      },
      {
        _id: "2",
        descripcion: "Daño material en el estacionamiento",
        fechaIncidente: "2023-11-25",
        prioridad: "Media",
        estado: "En Proceso",
      },
      {
        _id: "3",
        descripcion: "Acceso no autorizado en la entrada principal",
        fechaIncidente: "2023-12-05",
        prioridad: "Alta",
        estado: "Resuelto",
      },
    ];

    setTimeout(() => {
      setIncidentes(mockIncidentes);
      setFilteredIncidentes(mockIncidentes);
      calcularEstadisticas(mockIncidentes);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = incidentes.filter((incidente) => {
      const matchesEstado =
        !filters.estado || incidente.estado === filters.estado;
      const matchesPrioridad =
        !filters.prioridad || incidente.prioridad === filters.prioridad;
      const matchesFechaInicio =
        !filters.fechaInicio ||
        new Date(incidente.fechaIncidente) >= new Date(filters.fechaInicio);
      const matchesFechaFin =
        !filters.fechaFin ||
        new Date(incidente.fechaIncidente) <= new Date(filters.fechaFin);
      const matchesBusqueda = incidente.descripcion
        .toLowerCase()
        .includes(filters.busqueda.toLowerCase());

      return (
        matchesEstado &&
        matchesPrioridad &&
        matchesFechaInicio &&
        matchesFechaFin &&
        matchesBusqueda
      );
    });

    setFilteredIncidentes(filtered);
    calcularEstadisticas(filtered);
  }, [filters, incidentes]);

  const calcularEstadisticas = (data) => {
    const pendiente = data.filter((i) => i.estado === "Pendiente").length;
    const enProceso = data.filter((i) => i.estado === "En Proceso").length;
    const resuelto = data.filter((i) => i.estado === "Resuelto").length;

    setStats({ pendiente, enProceso, resuelto });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredIncidentes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Incidentes de Seguridad"
    );
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "incidentes_seguridad.xlsx"
    );
  };

  const dataChart = {
    labels: ["Pendiente", "En Proceso", "Resuelto"],
    datasets: [
      {
        label: "Incidentes por Estado",
        data: [stats.pendiente, stats.enProceso, stats.resuelto],
        backgroundColor: ["#FFC107", "#007BFF", "#28A745"],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando incidentes...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Incidentes de Seguridad
      </h1>

      {/* Filtros */}
      <IncidentFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Estadísticas */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
        <Pie data={dataChart} />
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
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Prioridad</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidentes.map((incidente) => (
              <tr key={incidente._id} className="border-t">
                <td className="px-4 py-2">{incidente.descripcion}</td>
                <td className="px-4 py-2">{incidente.fechaIncidente}</td>
                <td className="px-4 py-2">{incidente.prioridad}</td>
                <td className="px-4 py-2">{incidente.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentesSeguridad;
