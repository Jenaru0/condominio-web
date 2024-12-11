import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Colores por estado
const estadoColores = {
  Pendiente: "#FFC107", // Amarillo
  "En Proceso": "#007BFF", // Azul
  Resuelto: "#28A745", // Verde
};

// Encabezado
const EncabezadoIncidentes = () => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-2">
        Incidentes de Seguridad
      </h1>
    </motion.div>
);

// Filtros
const IncidentFilters = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
    <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
    >
      <Box sx={{ minWidth: "200px" }}>
        <Typography>Estado</Typography>
        <select
            value={filters.estado}
            onChange={(e) => onFilterChange("estado", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Resuelto">Resuelto</option>
        </select>
      </Box>
      <Box sx={{ minWidth: "200px" }}>
        <Typography>Prioridad</Typography>
        <select
            value={filters.prioridad}
            onChange={(e) => onFilterChange("prioridad", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </Box>
      <Box sx={{ minWidth: "200px" }}>
        <Typography>Fecha Inicio</Typography>
        <input
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        />
      </Box>
      <Box sx={{ minWidth: "200px" }}>
        <Typography>Fecha Fin</Typography>
        <input
            type="date"
            value={filters.fechaFin}
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        />
      </Box>
      <Box sx={{ minWidth: "200px" }}>
        <Typography>Buscar</Typography>
        <input
            type="text"
            value={filters.busqueda}
            onChange={(e) => onFilterChange("busqueda", e.target.value)}
            placeholder="Buscar descripción..."
            className="border rounded-lg px-4 py-2 w-full"
        />
      </Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Button
            variant="contained"
            onClick={onApplyFilters}
            sx={{ backgroundColor: "#1d4ed8", textTransform: "none" }}
        >
          Aplicar
        </Button>
        <Button
            variant="outlined"
            onClick={onResetFilters}
            sx={{ color: "#1d4ed8", borderColor: "#1d4ed8", textTransform: "none" }}
        >
          Limpiar
        </Button>
      </Box>
    </Box>
);

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
    const mockIncidentes = [
      { _id: "1", descripcion: "Robo en el Edificio A", fechaIncidente: "2023-12-01", prioridad: "Alta", estado: "Pendiente" },
      { _id: "2", descripcion: "Daño en estacionamiento", fechaIncidente: "2023-11-25", prioridad: "Media", estado: "En Proceso" },
      { _id: "3", descripcion: "Acceso no autorizado", fechaIncidente: "2023-12-05", prioridad: "Alta", estado: "Resuelto" },
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
      const matchesEstado = !filters.estado || incidente.estado === filters.estado;
      const matchesPrioridad = !filters.prioridad || incidente.prioridad === filters.prioridad;
      const matchesFechaInicio =
          !filters.fechaInicio || new Date(incidente.fechaIncidente) >= new Date(filters.fechaInicio);
      const matchesFechaFin =
          !filters.fechaFin || new Date(incidente.fechaIncidente) <= new Date(filters.fechaFin);
      const matchesBusqueda = incidente.descripcion.toLowerCase().includes(filters.busqueda.toLowerCase());

      return matchesEstado && matchesPrioridad && matchesFechaInicio && matchesFechaFin && matchesBusqueda;
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incidentes de Seguridad");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "incidentes_seguridad.xlsx");
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
    return <LoadingSpinner text="Cargando incidentes de seguridad..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        <EncabezadoIncidentes />

        {/* Filtros */}
        <IncidentFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={() => console.log("Aplicar filtros")}
            onResetFilters={() => setFilters({ estado: "", prioridad: "", fechaInicio: "", fechaFin: "", busqueda: "" })}
        />

        {/* Estadísticas */}
        <Box className="bg-white shadow rounded-lg p-6 mb-6" sx={{ maxWidth: "600px", margin: "auto" }}>
          <Typography variant="h6" className="text-xl font-semibold mb-4">Estadísticas</Typography>
          <Pie data={dataChart} />
        </Box>

        {/* Tabla */}
        <TableContainer
            component={Paper}
            sx={{
              marginTop: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
          <Box className="flex justify-end p-4">
            <Button
                variant="contained"
                onClick={exportarExcel}
                sx={{ backgroundColor: "#1d4ed8", textTransform: "none", "&:hover": { backgroundColor: "#1e40af" } }}
            >
              Exportar a Excel
            </Button>
          </Box>
          <Table>
            <TableHead sx={{ backgroundColor: "#1d4ed8" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Descripción</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Prioridad</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncidentes.map((incidente) => (
                  <TableRow
                      key={incidente._id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#e0f2fe" },
                        transition: "background-color 0.3s ease",
                      }}
                  >
                    <TableCell>{incidente.descripcion}</TableCell>
                    <TableCell>{incidente.fechaIncidente}</TableCell>
                    <TableCell>{incidente.prioridad}</TableCell>
                    <TableCell>
                  <span
                      style={{
                        backgroundColor: estadoColores[incidente.estado],
                        color: "#ffffff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontWeight: 600,
                      }}
                  >
                    {incidente.estado}
                  </span>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
};

export default IncidentesSeguridad;
