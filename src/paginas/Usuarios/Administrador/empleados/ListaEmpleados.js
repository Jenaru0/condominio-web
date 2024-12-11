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

const ListaEmpleados = ({ empleados, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
            marginTop: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Table>
            <TableHead sx={{ backgroundColor: "#fbbf24" }}> {/* Ajuste de amarillo más cálido */}
                <TableRow>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>ID</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Nombre</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>DNI</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Correo</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Teléfono</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Rol</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {empleados.map((empleado) => (
                    <TableRow
                        key={empleado.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#fef3c7" }, // Fondo amarillo claro al hover
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{empleado.id}</TableCell>
                        <TableCell>{empleado.name}</TableCell>
                        <TableCell>{empleado.dni}</TableCell>
                        <TableCell>{empleado.email}</TableCell>
                        <TableCell>{empleado.phone}</TableCell>
                        <TableCell>{empleado.role}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(empleado)}
                                sx={{ color: "#d97706", fontWeight: 600 }} // Botón naranja oscuro
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(empleado.id)}
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

export default ListaEmpleados;
