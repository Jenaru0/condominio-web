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

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    actionView: "#10b981", // Verde
    actionEdit: "#2563EB", // Azul intermedio
    actionDelete: "#EF4444", // Rojo intenso
    actionViewHover: "#059669", // Verde más oscuro
    actionEditHover: "#1E40AF", // Azul más oscuro
    actionDeleteHover: "#B91C1C", // Rojo más oscuro
    textSecondary: "#6B7280", // Gris oscuro
    stateVigente: "#10b981", // Verde para Vigente
    stateExpirado: "#EF4444", // Rojo para Expirado
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
                <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                    <TableRow>
                        {["Nombre", "Tipo", "Estado", "Fecha de Expiración", "Acciones"].map((header) => (
                            <TableCell
                                key={header}
                                sx={{ color: COLORS.headerText, fontWeight: 700 }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {documentos.map((doc) => (
                        <TableRow
                            key={doc._id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: COLORS.hoverBackground },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{doc.nombre_documento}</TableCell>
                            <TableCell>{doc.tipo}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor: doc.estado === "Vigente" ? COLORS.stateVigente : COLORS.stateExpirado,
                                        color: COLORS.headerText,
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
                                        color: COLORS.actionView,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { color: COLORS.actionViewHover },
                                    }}
                                >
                                    Ver
                                </Button>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(doc._id)}
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
                                    onClick={() => onDelete(doc._id)}
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

export default ListaDocumentos;
