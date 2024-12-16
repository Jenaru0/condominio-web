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
    textSecondary: "#6B7280", // Gris oscuro
    estadoActivo: "#10B981", // Verde
    estadoInactivo: "#EF4444", // Rojo
};

// Colores para los estados del área
const estadoColores = {
    Activo: COLORS.estadoActivo,
    Inactivo: COLORS.estadoInactivo,
};

const ListaAreas = ({ areas, onEdit, onDelete }) => (
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
                        {["Nombre", "Capacidad", "Ubicación", "Horario", "Estado", "Acciones"].map((header) => (
                            <TableCell key={header} sx={{ color: COLORS.headerText, fontWeight: 700 }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {areas.map((area) => (
                        <TableRow
                            key={area.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: COLORS.hoverBackground },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{area.nombre}</TableCell>
                            <TableCell>{area.capacidad_maxima}</TableCell>
                            <TableCell>{area.ubicacion}</TableCell>
                            <TableCell>
                                {area.horario_inicio} - {area.horario_fin}
                            </TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor: estadoColores[area.estado] || COLORS.textSecondary,
                                        color: COLORS.headerText,
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {area.estado}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(area)}
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
                                    onClick={() => onDelete(area.id)}
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

export default ListaAreas;
