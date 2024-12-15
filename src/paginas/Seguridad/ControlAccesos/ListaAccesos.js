import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";
import { motion } from "framer-motion";

const ListaAccesos = ({ accesos }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                    marginTop: "16px",
                }}
            >
                <Table>
                    {/* Encabezado */}
                    <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Nombre</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>DNI</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Tipo</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Zona</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Entrada</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Salida</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Cuerpo */}
                    <TableBody>
                        {accesos.map((acceso) => (
                            <TableRow
                                key={acceso._id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "#f3f4f6" },
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                <TableCell>{acceso.nombre}</TableCell>
                                <TableCell>{acceso.dni}</TableCell>
                                <TableCell>{acceso.tipoUsuario}</TableCell>
                                <TableCell>{acceso.zonaAcceso}</TableCell>
                                <TableCell>{new Date(acceso.fechaEntrada).toLocaleString()}</TableCell>
                                <TableCell>
                                    {acceso.fechaSalida ? new Date(acceso.fechaSalida).toLocaleString() : "N/A"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
    );
};

export default ListaAccesos;
