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

const ListaReservas = ({ reservas, users, onEdit, onDelete }) => (
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
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Usuario</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Área</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Hora Inicio</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Hora Fin</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reservas.map((reserva) => (
                    <TableRow key={reserva.id}>
                        <TableCell>{users.find((u) => u.id === reserva.usuario_id)?.name || "N/A"}</TableCell>
                        <TableCell>{reserva.area_comun}</TableCell>
                        <TableCell>{reserva.fecha_reserva}</TableCell>
                        <TableCell>{reserva.hora_inicio}</TableCell>
                        <TableCell>{reserva.hora_fin}</TableCell>
                        <TableCell>{reserva.estado}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(reserva)}
                                sx={{ color: "#3b82f6" }}
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(reserva.id)}
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

export default ListaReservas;
