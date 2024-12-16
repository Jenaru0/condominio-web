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
    textSecondary: "#FFFFFF", // Gris oscuro
    estados: {
        Pendiente: "#EAB308", // Amarillo
        "En Progreso": "#2563EB", // Azul intermedio
        Resuelto: "#10B981", // Verde
        Cancelado: "#EF4444", // Rojo
    },
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
                <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                    <TableRow>
                        {[
                            "Residente",
                            "Fecha",
                            "Asunto",
                            "Descripción",
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
                            <TableCell>{solicitud.fecha}</TableCell>
                            <TableCell>{solicitud.asunto}</TableCell>
                            <TableCell>{solicitud.descripcion}</TableCell>
                            <TableCell align="left">
                                <span
                                    style={{
                                        backgroundColor: COLORS.estados[solicitud.estado],
                                        color: solicitud.estado === "Cancelado" ? "#FFFFFF" : COLORS.textSecondary,
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
                                    onClick={() => onDelete(solicitud.id)}
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

export default ListaSolicitudesMantenimiento;
