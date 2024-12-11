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

const ListaRoles = ({ roles, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
            marginTop: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Table>
            <TableHead sx={{ backgroundColor: "#9333ea" }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Permisos</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {roles.map((rol) => (
                    <TableRow
                        key={rol.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#f3f4f6" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{rol.id}</TableCell>
                        <TableCell>{rol.name}</TableCell>
                        <TableCell>
                            {rol.assignedPermissions.map((permiso) => (
                                <span
                                    key={permiso}
                                    style={{
                                        backgroundColor: "#e0e7ff",
                                        color: "#4f46e5",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontSize: "0.75rem",
                                        marginRight: "4px",
                                        display: "inline-block",
                                    }}
                                >
                  {permiso}
                </span>
                            ))}
                        </TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(rol)}
                                sx={{ color: "#9333ea", fontWeight: 600 }}
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(rol.id)}
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

export default ListaRoles;
