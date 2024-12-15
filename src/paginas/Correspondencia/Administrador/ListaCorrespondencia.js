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
            <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Usuario</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Tipo</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Descripción</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Notificado</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            {/* Cuerpo */}
            <TableBody>
                {correspondencia.map((item) => (
                    <TableRow
                        key={item.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#f3f4f6" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>
                            {users.find((u) => u.id === item.usuario_id)?.name || "N/A"}
                        </TableCell>
                        <TableCell>{item.tipo_correspondencia}</TableCell>
                        <TableCell>{item.descripcion}</TableCell>
                        <TableCell>{item.fecha_recepcion}</TableCell>
                        <TableCell>{item.estado}</TableCell>
                        <TableCell>{item.notificado ? "Sí" : "No"}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => handleEdit(item)}
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
                                onClick={() => handleDelete(item.id)}
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

export default ListaCorrespondencia;
