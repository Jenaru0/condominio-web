import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { motion } from "framer-motion";

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    estadoPagado: "#10B981", // Verde
    estadoPendiente: "#F59E0B", // Amarillo
    estadoAtrasado: "#EF4444", // Rojo
};

const ListaEstadosCuenta = ({ pagos }) => (
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
                marginTop: "16px",
            }}
        >
            <Table>
                {/* Encabezado */}
                <TableHead sx={{ backgroundColor: COLORS.headerBackground }}>
                    <TableRow>
                        {["Usuario", "Monto", "Fecha de Pago", "Concepto", "Estado"].map((header) => (
                            <TableCell key={header} sx={{ fontWeight: "bold", color: COLORS.headerText }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Cuerpo */}
                <TableBody>
                    {pagos.map((pago) => (
                        <TableRow
                            key={pago._id}
                            hover
                            sx={{
                                "&:hover": { backgroundColor: COLORS.hoverBackground },
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <TableCell>{pago.usuario}</TableCell>
                            <TableCell>S/ {pago.monto.toFixed(2)}</TableCell>
                            <TableCell>{pago.fecha_pago}</TableCell>
                            <TableCell>{pago.concepto}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        backgroundColor:
                                            pago.estado === "Pagado"
                                                ? COLORS.estadoPagado
                                                : pago.estado === "Pendiente"
                                                    ? COLORS.estadoPendiente
                                                    : COLORS.estadoAtrasado,
                                        color: "#FFFFFF",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {pago.estado}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </motion.div>
);

export default ListaEstadosCuenta;
