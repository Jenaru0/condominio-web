import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

// Encabezado
const EncabezadoHistorial = () => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-2">
            Historial de Notificaciones
        </h1>
    </motion.div>
);

// Filtros
const FiltrosNotificaciones = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
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
        <TextField
            label="Buscar por asunto o mensaje"
            value={filters.busqueda}
            onChange={(e) => onFilterChange("busqueda", e.target.value)}
            placeholder="Ejemplo: Pago pendiente"
            sx={{ minWidth: "200px" }}
        />
        <Select
            value={filters.audiencia}
            onChange={(e) => onFilterChange("audiencia", e.target.value)}
            displayEmpty
            sx={{ minWidth: "200px" }}
        >
            <MenuItem value="">
                <em>Audiencia (Todos)</em>
            </MenuItem>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Residentes">Residentes</MenuItem>
            <MenuItem value="Personal de Seguridad">Personal de Seguridad</MenuItem>
            <MenuItem value="Técnicos">Técnicos</MenuItem>
        </Select>
        <TextField
            label="Fecha Inicio"
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: "200px" }}
        />
        <TextField
            label="Fecha Fin"
            type="date"
            value={filters.fechaFin}
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: "200px" }}
        />
        <Box sx={{ display: "flex", gap: "8px" }}>
            <Button
                variant="contained"
                onClick={onApplyFilters}
                sx={{ backgroundColor: "#1d4ed8" }}
            >
                Aplicar
            </Button>
            <Button
                variant="outlined"
                onClick={onResetFilters}
                sx={{ color: "#1d4ed8", borderColor: "#1d4ed8" }}
            >
                Limpiar
            </Button>
        </Box>
    </Box>
);

// Historial de Notificaciones
const HistorialNotificaciones = () => {
    const [loading, setLoading] = useState(true);
    const [notificaciones, setNotificaciones] = useState([]);
    const [filteredNotificaciones, setFilteredNotificaciones] = useState([]);
    const [filters, setFilters] = useState({
        busqueda: "",
        audiencia: "",
        fechaInicio: "",
        fechaFin: "",
    });

    useEffect(() => {
        // Simulación de datos
        const mockNotificaciones = [
            {
                id: "1",
                asunto: "Recordatorio de Pago",
                mensaje: "Por favor, realiza el pago antes del 10 de diciembre.",
                audiencia: "Residentes",
                fechaEnvio: "2023-12-05",
            },
            {
                id: "2",
                asunto: "Aviso de Seguridad",
                mensaje: "Se ha reportado un acceso no autorizado.",
                audiencia: "Todos",
                fechaEnvio: "2023-12-03",
            },
            {
                id: "3",
                asunto: "Evento Especial",
                mensaje: "Te invitamos al evento de fin de año el 20 de diciembre.",
                audiencia: "Residentes",
                fechaEnvio: "2023-12-01",
            },
        ];

        setTimeout(() => {
            setNotificaciones(mockNotificaciones);
            setFilteredNotificaciones(mockNotificaciones);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const filtered = notificaciones.filter((notificacion) => {
            const matchesBusqueda =
                notificacion.asunto.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
                notificacion.mensaje.toLowerCase().includes(filters.busqueda.toLowerCase());
            const matchesAudiencia =
                !filters.audiencia || notificacion.audiencia === filters.audiencia;
            const matchesFechaInicio =
                !filters.fechaInicio || new Date(notificacion.fechaEnvio) >= new Date(filters.fechaInicio);
            const matchesFechaFin =
                !filters.fechaFin || new Date(notificacion.fechaEnvio) <= new Date(filters.fechaFin);

            return matchesBusqueda && matchesAudiencia && matchesFechaInicio && matchesFechaFin;
        });

        setFilteredNotificaciones(filtered);
    }, [filters, notificaciones]);

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const handleApplyFilters = () => {
        console.log("Filtros aplicados:", filters);
    };

    const handleResetFilters = () => {
        setFilters({
            busqueda: "",
            audiencia: "",
            fechaInicio: "",
            fechaFin: "",
        });
    };

    if (loading) {
        return <LoadingSpinner text="Cargando historial de notificaciones..." />;
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            <EncabezadoHistorial />

            <FiltrosNotificaciones
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />

            {/* Tabla de notificaciones */}
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
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Asunto</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Mensaje</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Audiencia</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha de Envío</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredNotificaciones.map((notificacion) => (
                            <TableRow
                                key={notificacion.id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "#e0f2fe" },
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                <TableCell>{notificacion.asunto}</TableCell>
                                <TableCell>{notificacion.mensaje}</TableCell>
                                <TableCell>{notificacion.audiencia}</TableCell>
                                <TableCell>{notificacion.fechaEnvio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default HistorialNotificaciones;
