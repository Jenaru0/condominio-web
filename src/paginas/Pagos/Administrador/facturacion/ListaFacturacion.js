import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";

// Paleta de colores unificada
const COLORS = {
    headerBackground: "#1D4ED8", // Azul intenso
    headerText: "#FFFFFF", // Blanco
    hoverBackground: "#F3F4F6", // Gris claro
    actionButton: "#2563EB", // Azul intermedio
    actionButtonHover: "#1E40AF", // Azul más oscuro
    estado: {
        Pagado: "#10b981", // Verde
        Pendiente: "#f59e0b", // Amarillo
        Atrasado: "#ef4444", // Rojo
    },
};

const ListaFacturacion = ({ pagos, generarPDF }) => (
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
                        {["Usuario", "Monto", "Fecha de Pago", "Concepto", "Estado", "Acciones"].map((header) => (
                            <TableCell
                                key={header}
                                sx={{
                                    color: COLORS.headerText,
                                    fontWeight: "bold",
                                    textAlign: header === "Acciones" ? "center" : "left",
                                }}
                            >
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
                                        backgroundColor: COLORS.estado[pago.estado],
                                        color: "#ffffff",
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {pago.estado}
                                </span>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    onClick={() => generarPDF(pago)}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: COLORS.actionButton,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": { backgroundColor: COLORS.actionButtonHover },
                                    }}
                                >
                                    Descargar PDF
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </motion.div>
);

export default ListaFacturacion;
