import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { motion } from "framer-motion";

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    textSecondary: "#6B7280", // Gris oscuro
};

const ListaFinancieros = ({ datos }) => (
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
                        {["Fecha", "Categoría", "Tipo", "Monto"].map((header) => (
                            <TableCell key={header} sx={{ fontWeight: "bold", color: COLORS.headerText }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {datos.length > 0 ? (
                        datos.map((item) => (
                            <TableRow
                                key={item._id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: COLORS.hoverBackground },
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                <TableCell>{item.fecha}</TableCell>
                                <TableCell>{item.categoria}</TableCell>
                                <TableCell>{item.tipo}</TableCell>
                                <TableCell>S/ {item.monto.toFixed(2)}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ fontWeight: 600, color: COLORS.textSecondary }}>
                                No se encontraron registros con los filtros aplicados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </motion.div>
);

export default ListaFinancieros;
