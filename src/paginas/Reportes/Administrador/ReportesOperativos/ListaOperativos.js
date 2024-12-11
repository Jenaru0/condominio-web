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

const ListaOperativos = ({ operativos, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Table>
            <TableHead sx={{ backgroundColor: "#1d4ed8" }}>
                <TableRow>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Fecha</TableCell>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Categoría</TableCell>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Estado</TableCell>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Descripción</TableCell>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {operativos.map((op) => (
                    <TableRow key={op._id} hover>
                        <TableCell>{op.fecha}</TableCell>
                        <TableCell>{op.categoria}</TableCell>
                        <TableCell>{op.estado}</TableCell>
                        <TableCell>{op.descripcion}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(op)}
                                sx={{ color: "#1d4ed8" }}
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(op._id)}
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

export default ListaOperativos;
