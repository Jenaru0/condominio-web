import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const estadoColores = {
    Pagado: "#10b981", // Verde
    Pendiente: "#f59e0b", // Amarillo
    Atrasado: "#ef4444", // Rojo
};

const ListaPagos = ({ pagos }) => {
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
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Usuario</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Monto</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha de Pago</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Concepto</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Método de Pago</TableCell>
                            <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Factura</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Cuerpo */}
                    <TableBody>
                        {pagos.length > 0 ? (
                            pagos.map((pago) => (
                                <TableRow
                                    key={pago._id}
                                    hover
                                    sx={{
                                        "&:hover": { backgroundColor: "#f3f4f6" },
                                        transition: "background-color 0.3s ease",
                                    }}
                                >
                                    <TableCell>{pago.usuario || "No asignado"}</TableCell>
                                    <TableCell>S/ {pago.monto.toFixed(2)}</TableCell>
                                    <TableCell>{pago.fecha_pago}</TableCell>
                                    <TableCell>{pago.concepto}</TableCell>
                                    <TableCell>
                    <span
                        style={{
                            backgroundColor: estadoColores[pago.estado],
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
                                    <TableCell>{pago.metodo_pago}</TableCell>
                                    <TableCell>
                                        <a
                                            href={pago.factura_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "#3b82f6",
                                                textDecoration: "underline",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Ver Factura
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No se encontraron pagos con los filtros aplicados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
    );
};

export default ListaPagos;