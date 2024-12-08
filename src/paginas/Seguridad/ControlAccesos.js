import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Componente de filtros
const AccessFilters = ({ filters, onFilterChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <select
      value={filters.tipoUsuario}
      onChange={(e) => onFilterChange("tipoUsuario", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Tipo de Usuario (Todos)</option>
      <option value="Residente">Residente</option>
      <option value="Visitante">Visitante</option>
      <option value="Empleado">Empleado</option>
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
      placeholder="Buscar por DNI, nombre, zona..."
      className="border rounded-lg px-4 py-2 w-full"
    />
  </div>
);

// Componente principal
const ControlAccesos = () => {
  const [accesos, setAccesos] = useState([]);
  const [filteredAccesos, setFilteredAccesos] = useState([]);
  const [filters, setFilters] = useState({
    tipoUsuario: "",
    fechaInicio: "",
    fechaFin: "",
    busqueda: "",
  });
  const [loading, setLoading] = useState(true);

  // Estadísticas de accesos
  const [stats, setStats] = useState({ entradas: 0, salidas: 0 });

  useEffect(() => {
    // Simulación de datos de accesos
    const mockAccesos = [
      {
        _id: "1",
        nombre: "Juan Pérez",
        dni: "12345678",
        tipoUsuario: "Residente",
        zonaAcceso: "Edificio A, Piso 2",
        fechaEntrada: "2023-12-01T08:30:00Z",
        fechaSalida: "2023-12-01T18:00:00Z",
      },
      {
        _id: "2",
        nombre: "María López",
        dni: "87654321",
        tipoUsuario: "Visitante",
        zonaAcceso: "Edificio B, Piso 1",
        fechaEntrada: "2023-12-02T10:00:00Z",
        fechaSalida: "2023-12-02T14:00:00Z",
      },
      {
        _id: "3",
        nombre: "Carlos Ramírez",
        dni: "11223344",
        tipoUsuario: "Empleado",
        zonaAcceso: "Edificio A, Administración",
        fechaEntrada: "2023-12-03T09:00:00Z",
        fechaSalida: "",
      },
    ];

    setTimeout(() => {
      setAccesos(mockAccesos);
      setFilteredAccesos(mockAccesos);
      calcularEstadisticas(mockAccesos);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = accesos.filter((acceso) => {
      const matchesTipoUsuario =
        !filters.tipoUsuario || acceso.tipoUsuario === filters.tipoUsuario;
      const matchesFechaInicio =
        !filters.fechaInicio ||
        new Date(acceso.fechaEntrada) >= new Date(filters.fechaInicio);
      const matchesFechaFin =
        !filters.fechaFin ||
        new Date(acceso.fechaEntrada) <= new Date(filters.fechaFin);
      const matchesBusqueda =
        acceso.nombre.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
        acceso.dni.includes(filters.busqueda) ||
        acceso.zonaAcceso
          .toLowerCase()
          .includes(filters.busqueda.toLowerCase());

      return (
        matchesTipoUsuario &&
        matchesFechaInicio &&
        matchesFechaFin &&
        matchesBusqueda
      );
    });

    setFilteredAccesos(filtered);
    calcularEstadisticas(filtered);
  }, [filters, accesos]);

  const calcularEstadisticas = (data) => {
    const entradas = data.filter((acceso) => acceso.fechaEntrada).length;
    const salidas = data.filter((acceso) => acceso.fechaSalida).length;
    setStats({ entradas, salidas });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAccesos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Control de Accesos");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "control_accesos.xlsx"
    );
  };

  const dataChart = {
    labels: ["Entradas", "Salidas"],
    datasets: [
      {
        label: "Estadísticas de Accesos",
        data: [stats.entradas, stats.salidas],
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Cargando registros de accesos...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Control de Accesos
      </h1>

      {/* Filtros */}
      <AccessFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Estadísticas */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
        <Bar data={dataChart} />
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
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Zona</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Salida</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccesos.map((acceso) => (
              <tr key={acceso._id} className="border-t">
                <td className="px-4 py-2">{acceso.nombre}</td>
                <td className="px-4 py-2">{acceso.dni}</td>
                <td className="px-4 py-2">{acceso.tipoUsuario}</td>
                <td className="px-4 py-2">{acceso.zonaAcceso}</td>
                <td className="px-4 py-2">
                  {new Date(acceso.fechaEntrada).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {acceso.fechaSalida
                    ? new Date(acceso.fechaSalida).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlAccesos;
