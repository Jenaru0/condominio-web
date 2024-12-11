import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import AccessFilters from "./FiltrosAccesos";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

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
    return <LoadingSpinner text="Cargando registros de accesos..." />;
  }

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Control de Accesos
        </h1>

        {/* Filtros */}
        <AccessFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={() => console.log("Aplicar filtros")}
            onResetFilters={() =>
                setFilters({ tipoUsuario: "", fechaInicio: "", fechaFin: "", busqueda: "" })
            }
        />

        {/* Estadísticas */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
          <Bar data={dataChart} />
        </div>

        {/* Tabla */}
        <div className="flex justify-end mb-4">
          <Button
              variant="contained"
              onClick={exportarExcel}
              sx={{
                backgroundColor: "#1d4ed8",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#1e40af" },
              }}
          >
            Exportar a Excel
          </Button>
        </div>
        <TableContainer
            component={Paper}
            sx={{
              marginTop: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#1d4ed8" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>
                  Nombre
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>DNI</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Tipo</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Zona</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>
                  Entrada
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>
                  Salida
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAccesos.map((acceso) => (
                  <TableRow
                      key={acceso._id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#e0f2fe" },
                        transition: "background-color 0.3s ease",
                      }}
                  >
                    <TableCell>{acceso.nombre}</TableCell>
                    <TableCell>{acceso.dni}</TableCell>
                    <TableCell>{acceso.tipoUsuario}</TableCell>
                    <TableCell>{acceso.zonaAcceso}</TableCell>
                    <TableCell>
                      {new Date(acceso.fechaEntrada).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {acceso.fechaSalida
                          ? new Date(acceso.fechaSalida).toLocaleString()
                          : "N/A"}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
};

export default ControlAccesos;
