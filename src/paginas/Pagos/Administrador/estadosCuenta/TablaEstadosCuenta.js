import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TablaEstadosCuenta = ({ pagos }) => (
    <TableContainer
        component={Paper}
        sx={{
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "16px",
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
                </TableRow>
            </TableHead>
            <TableBody>
                {pagos.map((pago) => (
                    <TableRow key={pago._id} hover>
                        <TableCell>{pago.usuario}</TableCell>
                        <TableCell>S/ {pago.monto.toFixed(2)}</TableCell>
                        <TableCell>{pago.fecha_pago}</TableCell>
                        <TableCell>{pago.concepto}</TableCell>
                        <TableCell>{pago.estado}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default TablaEstadosCuenta;
