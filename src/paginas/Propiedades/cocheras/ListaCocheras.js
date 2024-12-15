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
                <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Número</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Nivel</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Edificio</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Usuario Asignado</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {cocheras.map((cochera) => (
                        <TableRow
                            key={cochera.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
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
                            cochera.estado === "Disponible" ? "#e0f2fe" : "#fef3c7",
                        color: cochera.estado === "Disponible" ? "#2563eb" : "#b45309",
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
                                    onClick={() => onDelete(cochera.id)}
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

export default ListaCocheras;
