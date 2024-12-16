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

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    actionEdit: "#2563EB", // Azul intermedio
    actionDelete: "#EF4444", // Rojo intenso
    actionEditHover: "#1E40AF", // Azul más oscuro
    actionDeleteHover: "#B91C1C", // Rojo más oscuro
    estadoPendiente: "#F59E0B", // Amarillo
    estadoConfirmada: "#10B981", // Verde
    estadoCancelada: "#EF4444", // Rojo
};

// Estados de la reserva
const estadoColores = {
    Pendiente: COLORS.estadoPendiente,
    Confirmada: COLORS.estadoConfirmada,
    Cancelada: COLORS.estadoCancelada,
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
                <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                    <TableRow>
                        {[
                            "Usuario",
                            "Área",
                            "Fecha",
                            "Hora Inicio",
                            "Hora Fin",
                            "Estado",
                            "Acciones",
                        ].map((header) => (
                            <TableCell key={header} sx={{ color: COLORS.headerText, fontWeight: 700 }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {reservas.map((reserva) => (
                        <TableRow
                            key={reserva.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: COLORS.hoverBackground },
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
                                        backgroundColor: estadoColores[reserva.estado] || "#E5E7EB",
                                        color: "#FFFFFF",
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
                                        color: COLORS.actionEdit,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { color: COLORS.actionEditHover },
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    startIcon={<Delete />}
                                    onClick={() => onDelete(reserva.id)}
                                    sx={{
                                        color: COLORS.actionDelete,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { color: COLORS.actionDeleteHover },
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
