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

const estadoColores = {
    Pagado: "#10b981",
    Pendiente: "#f59e0b",
    Atrasado: "#ef4444",
};

const TablaPagos = ({ pagos }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
            }}
        >
            <Table>
                <TableHead sx={{ backgroundColor: "#1d4ed8" }}>
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
                <TableBody>
                    {pagos.length > 0 ? (
                        pagos.map((pago) => (
                            <TableRow key={pago._id} hover>
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
                          borderRadius: "4px",
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
                                        style={{ color: "#2563eb", textDecoration: "underline" }}
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
    );
};

export default TablaPagos;
