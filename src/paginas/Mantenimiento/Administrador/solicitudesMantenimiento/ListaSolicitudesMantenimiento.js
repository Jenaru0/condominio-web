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

const estadoColores = {
    Pendiente: "#f59e0b", // Amarillo
    "En Progreso": "#3b82f6", // Azul
    Resuelto: "#10b981", // Verde
    Cancelado: "#ef4444", // Rojo
};

const ListaSolicitudesMantenimiento = ({ solicitudes, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
            marginTop: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Table>
            <TableHead sx={{ backgroundColor: "#1d4ed8" }}>
                <TableRow>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Residente</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Asunto</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Descripción</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }} align="center">
                        Estado
                    </TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {solicitudes.map((solicitud) => (
                    <TableRow
                        key={solicitud.id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#e0f2fe" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{solicitud.residente}</TableCell>
                        <TableCell>{solicitud.fecha}</TableCell>
                        <TableCell>{solicitud.asunto}</TableCell>
                        <TableCell>{solicitud.descripcion}</TableCell>
                        <TableCell align="center">
              <span
                  style={{
                      backgroundColor: estadoColores[solicitud.estado],
                      color: "#ffffff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: 600,
                      fontFamily: "'Montserrat', sans-serif",
                  }}
              >
                {solicitud.estado}
              </span>
                        </TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(solicitud)}
                                sx={{ color: "#2563eb", fontWeight: 600 }}
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(solicitud)}
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

export default ListaSolicitudesMantenimiento;
