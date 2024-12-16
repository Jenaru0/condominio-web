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
    estadoDisponibleBackground: "#E0F2FE", // Azul claro
    estadoDisponibleText: "#2563EB", // Azul intermedio
    estadoOcupadoBackground: "#FEF3C7", // Amarillo claro
    estadoOcupadoText: "#B45309", // Amarillo intermedio
    textSecondary: "#6B7280", // Gris oscuro
};

const ListaCocheras = ({ cocheras, users, onEdit, onDelete }) => (
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
                        {["Número", "Nivel", "Edificio", "Estado", "Usuario Asignado", "Acciones"].map(
                            (header) => (
                                <TableCell key={header} sx={{ fontWeight: "bold", color: COLORS.headerText }}>
                                    {header}
                                </TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {cocheras.map((cochera) => (
                        <TableRow
                            key={cochera.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: COLORS.hoverBackground },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{cochera.numero}</TableCell>
                            <TableCell>{cochera.nivel}</TableCell>
                            <TableCell>{cochera.edificio}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor:
                                            cochera.estado === "Disponible"
                                                ? COLORS.estadoDisponibleBackground
                                                : COLORS.estadoOcupadoBackground,
                                        color:
                                            cochera.estado === "Disponible"
                                                ? COLORS.estadoDisponibleText
                                                : COLORS.estadoOcupadoText,
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {cochera.estado}
                                </span>
                            </TableCell>
                            <TableCell>
                                {users.find((user) => user.id === cochera.usuario_asignado)?.name || "N/A"}
                            </TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(cochera)}
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
                                    onClick={() => onDelete(cochera.id)}
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

export default ListaCocheras;
