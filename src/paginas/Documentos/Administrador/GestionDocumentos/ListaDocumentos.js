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
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { motion } from "framer-motion";

const estadoColores = {
    Vigente: "#10b981", // Verde
    Expirado: "#ef4444", // Rojo
};

const ListaDocumentos = ({ documentos, onView, onEdit, onDelete }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
            }}
        >
            <Table>
                {/* Encabezado */}
                <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Nombre</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Tipo</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha de Expiración</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {documentos.map((doc) => (
                        <TableRow
                            key={doc._id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{doc.nombre_documento}</TableCell>
                            <TableCell>{doc.tipo}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor: estadoColores[doc.estado],
                                        color: "#ffffff",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontWeight: 600,
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    {doc.estado}
                                </span>
                            </TableCell>
                            <TableCell>{doc.fecha_expiracion}</TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<Visibility />}
                                    onClick={() => onView(doc.documento_url)}
                                    sx={{
                                        color: "#10b981",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { color: "#059669" },
                                    }}
                                >
                                    Ver
                                </Button>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(doc._id)}
                                    sx={{
                                        color: "#f59e0b",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { color: "#d97706" },
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    startIcon={<Delete />}
                                    onClick={() => onDelete(doc._id)}
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

export default ListaDocumentos;
