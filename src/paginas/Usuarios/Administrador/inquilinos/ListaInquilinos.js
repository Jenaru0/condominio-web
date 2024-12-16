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
    textSecondary: "#6B7280", // Gris oscuro
};

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
            {/* Encabezado */}
            <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                <TableRow>
                    {[
                        "Nombre",
                        "Email",
                        "DNI",
                        "Propietario",
                        "Departamento",
                        "Piso",
                        "Edificio",
                        "Acciones",
                    ].map((header) => (
                        <TableCell key={header} sx={{ fontWeight: "bold", color: COLORS.headerText }}>
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {inquilinos.map((inquilino) => (
                    <TableRow
                        key={inquilino._id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: COLORS.hoverBackground },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{inquilino.name}</TableCell>
                        <TableCell>{inquilino.email}</TableCell>
                        <TableCell>{inquilino.DNI}</TableCell>
                        <TableCell>{inquilino.propietario_asociado?.name || "Sin propietario"}</TableCell>
                        <TableCell>{inquilino.habitacion_id?.numero || "Sin departamento"}</TableCell>
                        <TableCell>{inquilino.habitacion_id?.piso || "Sin piso"}</TableCell>
                        <TableCell>{inquilino.habitacion_id?.edificio_id?.nombre || "Sin edificio"}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(inquilino)}
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
                                onClick={() => onDelete(inquilino._id)}
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

export default ListaInquilinos;
