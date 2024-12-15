import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { motion } from "framer-motion";

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
            }}
        >
            <Table>
                {/* Encabezado */}
                <TableHead sx={{ backgroundColor: "#3b82f6" }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Fecha</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Categoría</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Monto</TableCell>
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
                                    "&:hover": { backgroundColor: "#f3f4f6" },
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
                            <TableCell colSpan={4} align="center" sx={{ fontWeight: 600, color: "#6b7280" }}>
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
