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
};

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
            <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                <TableRow>
                    {["Número", "Piso", "Edificio", "Propietario", "Inquilino", "Acciones"].map(
                        (header) => (
                            <TableCell key={header} sx={{ fontWeight: "bold", color: COLORS.headerText }}>
                                {header}
                            </TableCell>
                        )
                    )}
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {departamentos.map((dep) => (
                    <TableRow
                        key={dep._id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: COLORS.hoverBackground },
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
                                onClick={() => onDelete(dep._id)}
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

export default ListaDepartamentos;
