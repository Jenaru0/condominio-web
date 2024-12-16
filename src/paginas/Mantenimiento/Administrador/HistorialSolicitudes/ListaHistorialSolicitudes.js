import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { motion } from "framer-motion";

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    resolved: "#22C55E", // Verde
    canceled: "#EF4444", // Rojo
    textSecondary: "#6B7280", // Gris oscuro
};

const ListaHistorialSolicitudes = ({ solicitudes }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <TableContainer
            component={Paper}
            sx={{
                marginTop: "16px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Table>
                {/* Encabezado */}
                <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                    <TableRow>
                        {[
                            "Residente",
                            "Fecha Solicitud",
                            "Asunto",
                            "Descripción",
                            "Estado",
                            "Fecha Resolución",
                        ].map((header) => (
                            <TableCell key={header} sx={{ color: COLORS.headerText, fontWeight: 700 }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {solicitudes.map((solicitud) => (
                        <TableRow
                            key={solicitud.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: COLORS.hoverBackground },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{solicitud.residente}</TableCell>
                            <TableCell>{solicitud.fechaSolicitud}</TableCell>
                            <TableCell>{solicitud.asunto}</TableCell>
                            <TableCell>{solicitud.descripcion}</TableCell>
                            <TableCell align="left">
                                <span
                                    style={{
                                        backgroundColor:
                                            solicitud.estado === "Resuelto"
                                                ? COLORS.resolved
                                                : COLORS.canceled,
                                        color: "#FFFFFF",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {solicitud.estado}
                                </span>
                            </TableCell>
                            <TableCell>{solicitud.fechaResolucion || "Pendiente"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </motion.div>
);

export default ListaHistorialSolicitudes;
