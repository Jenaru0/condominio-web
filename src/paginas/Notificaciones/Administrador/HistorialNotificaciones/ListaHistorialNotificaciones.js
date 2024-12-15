import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { motion } from "framer-motion";

const ListaHistorialNotificaciones = ({ filteredNotificaciones }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <TableContainer
            component={Paper}
            sx={{
                marginTop: "16px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
            }}
        >
            <Table>
                {/* Encabezado */}
                <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Asunto</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Mensaje</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Audiencia</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha de Envío</TableCell>
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {filteredNotificaciones.map((notificacion) => (
                        <TableRow
                            key={notificacion.id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: "#f3f4f6" },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{notificacion.asunto}</TableCell>
                            <TableCell>{notificacion.mensaje}</TableCell>
                            <TableCell>{notificacion.audiencia}</TableCell>
                            <TableCell>{notificacion.fechaEnvio}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </motion.div>
);

export default ListaHistorialNotificaciones;
