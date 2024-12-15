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

// Colores para los estados de la reserva
const estadoColores = {
    Pendiente: "#f59e0b", // Amarillo
    Confirmada: "#10b981", // Verde
    Cancelada: "#ef4444", // Rojo
};

const ListaReservas = ({ reservas, users, onEdit, onDelete }) => (
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
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Usuario</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Área</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Hora Inicio</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Hora Fin</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {reservas.map((reserva) => (
                        <TableRow
                            key={reserva.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>
                                {users.find((u) => u.id === reserva.usuario_id)?.name || "N/A"}
                            </TableCell>
                            <TableCell>{reserva.area_comun}</TableCell>
                            <TableCell>{reserva.fecha_reserva}</TableCell>
                            <TableCell>{reserva.hora_inicio}</TableCell>
                            <TableCell>{reserva.hora_fin}</TableCell>
                            <TableCell>
                <span
                    style={{
                        backgroundColor: estadoColores[reserva.estado] || "#e5e7eb",
                        color: "#ffffff",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                    }}
                >
                  {reserva.estado}
                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(reserva)}
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
                                    onClick={() => onDelete(reserva.id)}
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

export default ListaReservas;
