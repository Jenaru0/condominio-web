import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { motion } from "framer-motion";

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    estado: {
        Pendiente: "#F59E0B", // Amarillo
        "En Proceso": "#2563EB", // Azul
        Resuelto: "#10B981", // Verde
    },
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
                <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                    <TableRow>
                        {["Descripción", "Fecha", "Prioridad", "Estado"].map((header) => (
                            <TableCell key={header} sx={{ color: COLORS.headerText, fontWeight: "bold" }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {incidentes.map(({ _id, descripcion, fechaIncidente, prioridad, estado }) => (
                        <TableRow
                            key={_id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: COLORS.hoverBackground },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{descripcion}</TableCell>
                            <TableCell>{fechaIncidente}</TableCell>
                            <TableCell>{prioridad}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor: COLORS.estado[estado] || "#E5E7EB",
                                        color: "#FFFFFF",
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
