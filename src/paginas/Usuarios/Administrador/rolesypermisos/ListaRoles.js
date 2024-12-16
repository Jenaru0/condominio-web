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

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    actionEdit: "#2563EB", // Azul intermedio
    actionDelete: "#EF4444", // Rojo intenso
    actionEditHover: "#1E40AF", // Azul más oscuro
    actionDeleteHover: "#B91C1C", // Rojo más oscuro
    badgeBackground: "#E0F2FE", // Azul claro
    badgeText: "#2563EB", // Azul intermedio
};

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
            {/* Encabezado */}
            <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                <TableRow>
                    {["ID", "Nombre", "Permisos", "Acciones"].map((header) => (
                        <TableCell key={header} sx={{ fontWeight: "bold", color: COLORS.headerText }}>
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {roles.map((rol) => (
                    <TableRow
                        key={rol.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: COLORS.hoverBackground },
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
                                        backgroundColor: COLORS.badgeBackground,
                                        color: COLORS.badgeText,
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
                                onClick={() => onDelete(rol.id)}
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

export default ListaRoles;
