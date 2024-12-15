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

// Definir colores para cada estado
const estadoColores = {
    Resuelto: "#22c55e", // Verde
    Cancelado: "#ef4444", // Rojo
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
                <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Residente</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha Solicitud</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Asunto</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Descripción</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }} align="center">
                            Estado
                        </TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha Resolución</TableCell>
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {solicitudes.map((solicitud) => (
                        <TableRow
                            key={solicitud.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{solicitud.residente}</TableCell>
                            <TableCell>{solicitud.fechaSolicitud}</TableCell>
                            <TableCell>{solicitud.asunto}</TableCell>
                            <TableCell>{solicitud.descripcion}</TableCell>
                            <TableCell align="center">
                <span
                    style={{
                        backgroundColor: estadoColores[solicitud.estado],
                        color: "#ffffff",
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
