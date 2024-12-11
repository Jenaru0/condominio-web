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

const ListaAreas = ({ areas, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
            marginTop: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Table>
            <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                <TableRow>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Nombre</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Capacidad</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Ubicación</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Horario</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {areas.map((area) => (
                    <TableRow
                        key={area.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#f3f4f6" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{area.nombre}</TableCell>
                        <TableCell>{area.capacidad_maxima}</TableCell>
                        <TableCell>{area.ubicacion}</TableCell>
                        <TableCell>
                            {area.horario_inicio} - {area.horario_fin}
                        </TableCell>
                        <TableCell>{area.estado}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(area)}
                                sx={{
                                    color: "#3b82f6",
                                    fontWeight: 600,
                                    textTransform: "none",
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(area.id)}
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
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

export default ListaAreas;
