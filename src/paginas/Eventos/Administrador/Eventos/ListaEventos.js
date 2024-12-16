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
    confirmed: "#10B981", // Verde para estado "Confirmado"
    pending: "#F59E0B", // Amarillo para estado "Pendiente"
};

const ListaEventos = ({ eventos, onEdit, onDelete }) => (
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
                        "ID Evento",
                        "Nombre del Evento",
                        "Fecha",
                        "Asistencia",
                        "Estado",
                        "Acciones",
                    ].map((header) => (
                        <TableCell
                            key={header}
                            sx={{
                                fontWeight: "bold",
                                color: COLORS.headerText,
                            }}
                            align={header === "Acciones" ? "center" : "left"}
                        >
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {eventos.map((evento) => (
                    <TableRow
                        key={evento.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: COLORS.hoverBackground },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{evento.id}</TableCell>
                        <TableCell>{evento.nombreEvento}</TableCell>
                        <TableCell>{evento.fecha}</TableCell>
                        <TableCell>
                            <span className="flex items-center gap-2">
                                {evento.asistencia}
                                <Visibility sx={{ color: COLORS.textSecondary }} />
                            </span>
                        </TableCell>
                        <TableCell>
                            <span
                                style={{
                                    backgroundColor:
                                        evento.estado === "Confirmado"
                                            ? COLORS.confirmed
                                            : COLORS.pending,
                                    color: "#FFF",
                                    padding: "4px 8px",
                                    borderRadius: "8px",
                                    fontWeight: 600,
                                }}
                            >
                                {evento.estado}
                            </span>
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(evento)}
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
                                onClick={() => onDelete(evento.id)}
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
);

export default ListaEventos;
