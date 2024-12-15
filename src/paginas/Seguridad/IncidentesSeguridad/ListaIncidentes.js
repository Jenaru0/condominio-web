import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { motion } from "framer-motion";

// Colores por estado
const estadoColores = {
    Pendiente: "#f59e0b", // Amarillo
    "En Proceso": "#2563eb", // Azul
    Resuelto: "#10b981", // Verde
};

const ListaIncidentes = ({ incidentes }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                marginTop: "16px",
            }}
        >
            <Table>
                {/* Encabezado */}
                <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Descripción</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Prioridad</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {incidentes.map(({ _id, descripcion, fechaIncidente, prioridad, estado }) => (
                        <TableRow
                            key={_id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{descripcion}</TableCell>
                            <TableCell>{fechaIncidente}</TableCell>
                            <TableCell>{prioridad}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor: estadoColores[estado],
                                        color: "#ffffff",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontWeight: 600,
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    {estado}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </motion.div>
);

export default ListaIncidentes;
