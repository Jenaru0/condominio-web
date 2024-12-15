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
    Activo: "#10b981", // Verde
    Inactivo: "#ef4444", // Rojo
    Pendiente: "#f59e0b", // Amarillo
};

const ListaOperativos = ({ operativos, onEdit, onDelete }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
            }}
        >
            <Table>
                {/* Encabezado */}
                <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Fecha</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Categoría</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Estado</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Descripción</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {operativos.map((op) => (
                        <TableRow
                            key={op._id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{op.fecha}</TableCell>
                            <TableCell>{op.categoria}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor: estadoColores[op.estado] || "#e5e7eb",
                                        color: "#ffffff",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontWeight: 600,
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    {op.estado}
                                </span>
                            </TableCell>
                            <TableCell>{op.descripcion}</TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(op)}
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
                                    onClick={() => onDelete(op._id)}
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

export default ListaOperativos;
