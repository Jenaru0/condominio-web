import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import Encabezado from "../../../componentes/comunes/Encabezado";
import AccessFilters from "./FiltrosAccesos";
import EstadisticasAccesos from "./EstadisticasAccesos";
import ListaAccesos from "./ListaAccesos";

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
  const [stats, setStats] = useState({ entradas: 0, salidas: 0 });

  useEffect(() => {
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

  const calcularEstadisticas = (data) => {
    const entradas = data.filter((acceso) => acceso.fechaEntrada).length;
    const salidas = data.filter((acceso) => acceso.fechaSalida).length;
    setStats({ entradas, salidas });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    const filtered = accesos.filter((acceso) => {
      const matchesTipoUsuario =
          !newFilters.tipoUsuario || acceso.tipoUsuario === newFilters.tipoUsuario;
      const matchesBusqueda =
          acceso.nombre.toLowerCase().includes(newFilters.busqueda.toLowerCase()) ||
          acceso.dni.includes(newFilters.busqueda);
      return matchesTipoUsuario && matchesBusqueda;
    });

    setFilteredAccesos(filtered);
    calcularEstadisticas(filtered);
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAccesos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Control de Accesos");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "control_accesos.xlsx");
  };

  if (loading) return <LoadingSpinner text="Cargando registros de accesos..." />;

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <Encabezado titulo="Control de Accesos" />
        <AccessFilters filters={filters} onFilterChange={handleFilterChange} />
        <EstadisticasAccesos stats={stats} />
        <div className="flex justify-end my-4">
          <button onClick={exportarExcel} className="bg-blue-600 text-white px-4 py-2 rounded">
            Exportar a Excel
          </button>
        </div>
        <ListaAccesos accesos={filteredAccesos} />
      </div>
  );
};

export default ControlAccesos;
