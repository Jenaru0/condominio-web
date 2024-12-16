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
    estadoPendiente: "#F59E0B", // Amarillo
    estadoEntregado: "#10B981", // Verde
};

const ListaCorrespondencia = ({
                                  correspondencia,
                                  users,
                                  handleEdit,
                                  handleDelete,
                              }) => (
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
                        "Usuario",
                        "Tipo",
                        "Descripción",
                        "Fecha",
                        "Estado",
                        "Notificado",
                        "Acciones",
                    ].map((header) => (
                        <TableCell
                            key={header}
                            sx={{ fontWeight: "bold", color: COLORS.headerText }}
                        >
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {correspondencia.map((item) => (
                    <TableRow
                        key={item.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: COLORS.hoverBackground },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>
                            {users.find((u) => u.id === item.usuario_id)?.name || "N/A"}
                        </TableCell>
                        <TableCell>{item.tipo_correspondencia}</TableCell>
                        <TableCell>{item.descripcion}</TableCell>
                        <TableCell>{item.fecha_recepcion}</TableCell>
                        <TableCell>
                            {/* Estado con colores */}
                            <span
                                style={{
                                    backgroundColor:
                                        item.estado === "Pendiente"
                                            ? COLORS.estadoPendiente
                                            : item.estado === "Entregado"
                                                ? COLORS.estadoEntregado
                                                : COLORS.textSecondary,
                                    color: "#FFFFFF",
                                    padding: "4px 8px",
                                    borderRadius: "8px",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                }}
                            >
                                {item.estado}
                            </span>
                        </TableCell>
                        <TableCell>{item.notificado ? "Sí" : "No"}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => handleEdit(item)}
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
                                onClick={() => handleDelete(item.id)}
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

export default ListaCorrespondencia;
