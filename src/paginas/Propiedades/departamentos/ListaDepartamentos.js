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

const ListaDepartamentos = ({ departamentos, onEdit, onDelete }) => (
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
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Piso</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Edificio</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Propietario</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Inquilino</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {departamentos.map((dep) => (
                    <TableRow
                        key={dep._id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#f3f4f6" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{dep.numero}</TableCell>
                        <TableCell>{dep.piso}</TableCell>
                        <TableCell>{dep.edificio_id?.nombre || "N/A"}</TableCell>
                        <TableCell>{dep.propietario_asociado?.name || "N/A"}</TableCell>
                        <TableCell>{dep.inquilino_asociado?.name || "N/A"}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(dep)}
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
                                onClick={() => onDelete(dep._id)}
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

export default ListaDepartamentos;
