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
            <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>ID Evento</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Nombre del Evento</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Asistencia</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }} align="center">
                        Acciones
                    </TableCell>
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {eventos.map((evento) => (
                    <TableRow
                        key={evento.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#f3f4f6" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{evento.id}</TableCell>
                        <TableCell>{evento.nombreEvento}</TableCell>
                        <TableCell>{evento.fecha}</TableCell>
                        <TableCell>
                            <span className="flex items-center gap-2">
                                {evento.asistencia}
                                <Visibility sx={{ color: "#6b7280" }} />
                            </span>
                        </TableCell>
                        <TableCell>
                            <span
                                style={{
                                    backgroundColor:
                                        evento.estado === "Confirmado"
                                            ? "#10b981"
                                            : "#ef4444", // Verde o Rojo según el estado
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
                                onClick={() => onDelete(evento.id)}
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
);

export default ListaEventos;
