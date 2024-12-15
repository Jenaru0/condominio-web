import React from "react";
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
import { Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";

const estadoColores = {
    Pendiente: "#eab308", // Amarillo
    "En Progreso": "#3b82f6", // Azul
    Resuelto: "#22c55e", // Verde
    Cancelado: "#ef4444", // Rojo
};

const ListaSolicitudesMantenimiento = ({ solicitudes, onEdit, onDelete }) => (
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
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Asunto</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Descripción</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }} align="center">
                            Estado
                        </TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
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
                            <TableCell>{solicitud.fecha}</TableCell>
                            <TableCell>{solicitud.asunto}</TableCell>
                            <TableCell>{solicitud.descripcion}</TableCell>
                            <TableCell align="center">
                <span
                    style={{
                        backgroundColor: estadoColores[solicitud.estado],
                        color: solicitud.estado === "Cancelado" ? "#ffffff" : "#1f2937",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        display: "inline-block",
                    }}
                >
                  {solicitud.estado}
                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(solicitud)}
                                    sx={{
                                        color: "#3b82f6",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { color: "#2563eb" },
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    startIcon={<Delete />}
                                    onClick={() => onDelete(solicitud.id)}
                                    sx={{
                                        color: "#ef4444",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { color: "#dc2626" },
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </motion.div>
);

export default ListaSolicitudesMantenimiento;
