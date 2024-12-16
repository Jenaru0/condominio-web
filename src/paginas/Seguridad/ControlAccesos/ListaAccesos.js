import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";
import { motion } from "framer-motion";

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    textSecondary: "#6B7280", // Gris oscuro
};

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
                    <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                        <TableRow>
                            {["Nombre", "DNI", "Tipo", "Zona", "Entrada", "Salida"].map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                        color: COLORS.headerText,
                                        fontWeight: 700,
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {/* Cuerpo */}
                    <TableBody>
                        {accesos.map((acceso) => (
                            <TableRow
                                key={acceso._id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: COLORS.hoverBackground },
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
