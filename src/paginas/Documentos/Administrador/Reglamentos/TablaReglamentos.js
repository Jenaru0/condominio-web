import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

const TablaReglamentos = ({ reglamentos, onView, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Table>
            <TableHead sx={{ backgroundColor: "#1d4ed8" }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Fecha de Expiración</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reglamentos.length > 0 ? (
                    reglamentos.map((reglamento) => (
                        <TableRow
                            key={reglamento._id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{reglamento.nombre_documento}</TableCell>
                            <TableCell>{reglamento.estado}</TableCell>
                            <TableCell>{reglamento.fecha_expiracion}</TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<Visibility />}
                                    onClick={() => onView(reglamento.documento_url)}
                                    sx={{ color: "#3b82f6", fontWeight: 600 }}
                                >
                                    Ver
                                </Button>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => onEdit(reglamento)}
                                    sx={{ color: "#f59e0b", fontWeight: 600 }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    startIcon={<Delete />}
                                    onClick={() => onDelete(reglamento._id)}
                                    color="error"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} align="center">
                            No se encontraron reglamentos con los filtros aplicados.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>
);

export default TablaReglamentos;
