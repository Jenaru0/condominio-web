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

const ListaInquilinos = ({ inquilinos, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
            marginTop: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Table>
            <TableHead sx={{ backgroundColor: "#f97316" }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>DNI</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {inquilinos.map((inquilino) => (
                    <TableRow
                        key={inquilino._id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#f3f4f6" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{inquilino.name}</TableCell>
                        <TableCell>{inquilino.email}</TableCell>
                        <TableCell>{inquilino.DNI}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(inquilino)}
                                sx={{ color: "#f97316", fontWeight: 600 }}
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(inquilino._id)}
                                sx={{ fontWeight: 600 }}
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

export default ListaInquilinos;
