import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import Encabezado from "../../../componentes/comunes/Encabezado";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

// Colores por estado
const estadoColores = {
  Pendiente: "#FFC107", // Amarillo
  "En Proceso": "#007BFF", // Azul
  Resuelto: "#28A745", // Verde
};

// Filtros
const IncidentFilters = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: "8px", boxShadow: 1, mb: 2, display: "flex", gap: 2 }}>
      <select value={filters.estado} onChange={(e) => onFilterChange("estado", e.target.value)} className="border rounded-lg px-4 py-2">
        <option value="">Estado (Todos)</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En Proceso">En Proceso</option>
        <option value="Resuelto">Resuelto</option>
      </select>
      <select value={filters.prioridad} onChange={(e) => onFilterChange("prioridad", e.target.value)} className="border rounded-lg px-4 py-2">
        <option value="">Prioridad (Todas)</option>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <input type="date" value={filters.fechaInicio} onChange={(e) => onFilterChange("fechaInicio", e.target.value)} className="border rounded-lg px-4 py-2" />
      <input type="date" value={filters.fechaFin} onChange={(e) => onFilterChange("fechaFin", e.target.value)} className="border rounded-lg px-4 py-2" />
      <input type="text" value={filters.busqueda} placeholder="Buscar descripción..." onChange={(e) => onFilterChange("busqueda", e.target.value)} className="border rounded-lg px-4 py-2" />
      <Button variant="contained" onClick={onApplyFilters} sx={{ backgroundColor: "#1d4ed8" }}>
        Aplicar
      </Button>
      <Button variant="outlined" onClick={onResetFilters} sx={{ borderColor: "#1d4ed8", color: "#1d4ed8" }}>
        Limpiar
      </Button>
    </Box>
);

const IncidentesSeguridad = () => {
  const [incidentes, setIncidentes] = useState([]);
  const [filteredIncidentes, setFilteredIncidentes] = useState([]);
  const [filters, setFilters] = useState({ estado: "", prioridad: "", fechaInicio: "", fechaFin: "", busqueda: "" });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pendiente: 0, enProceso: 0, resuelto: 0 });

  useEffect(() => {
    const mockIncidentes = [
      { _id: "1", descripcion: "Robo en Edificio A", fechaIncidente: "2023-12-01", prioridad: "Alta", estado: "Pendiente" },
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

  const calcularEstadisticas = (data) => {
    const pendiente = data.filter((i) => i.estado === "Pendiente").length;
    const enProceso = data.filter((i) => i.estado === "En Proceso").length;
    const resuelto = data.filter((i) => i.estado === "Resuelto").length;
    setStats({ pendiente, enProceso, resuelto });
  };

  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredIncidentes.map(({ _id, ...rest }) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incidentes");
    saveAs(new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })]), "incidentes_seguridad.xlsx");
  };

  const chartData = {
    labels: ["Pendiente", "En Proceso", "Resuelto"],
    datasets: [{ label: "Incidentes", data: [stats.pendiente, stats.enProceso, stats.resuelto], backgroundColor: ["#FFC107", "#007BFF", "#28A745"] }],
  };

  if (loading) return <LoadingSpinner text="Cargando incidentes de seguridad..." />;

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        <Encabezado titulo="Incidentes de Seguridad" />
        <IncidentFilters filters={filters} onFilterChange={handleFilterChange} onApplyFilters={() => {}} onResetFilters={() => setFilters({})} />

        <Box sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: 1, p: 3, mb: 3, maxWidth: "600px", margin: "auto" }}>
          <Typography variant="h6">Estadísticas</Typography>
          <Pie data={chartData} />
        </Box>

        <Box className="flex justify-end mb-2">
          <Button variant="contained" onClick={exportarExcel} sx={{ backgroundColor: "#1d4ed8" }}>
            Exportar a Excel
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1d4ed8" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Descripción</TableCell>
                <TableCell sx={{ color: "#fff" }}>Fecha</TableCell>
                <TableCell sx={{ color: "#fff" }}>Prioridad</TableCell>
                <TableCell sx={{ color: "#fff" }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncidentes.map(({ _id, descripcion, fechaIncidente, prioridad, estado }) => (
                  <TableRow key={_id}>
                    <TableCell>{descripcion}</TableCell>
                    <TableCell>{fechaIncidente}</TableCell>
                    <TableCell>{prioridad}</TableCell>
                    <TableCell>
                      <span style={{ backgroundColor: estadoColores[estado], color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>{estado}</span>
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
