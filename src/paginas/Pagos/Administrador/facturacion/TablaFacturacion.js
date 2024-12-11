import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const TablaFacturacion = ({ pagos, generarPDF }) => (
    <TableContainer
        component={Paper}
        sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pagos.map((pago) => (
                    <TableRow key={pago._id}>
                        <TableCell>{pago.usuario}</TableCell>
                        <TableCell>S/ {pago.monto.toFixed(2)}</TableCell>
                        <TableCell>{pago.fecha_pago}</TableCell>
                        <TableCell>{pago.concepto}</TableCell>
                        <TableCell>{pago.estado}</TableCell>
                        <TableCell>
                            <Button onClick={() => generarPDF(pago)} variant="contained" sx={{ backgroundColor: "#1d4ed8" }}>
                                Descargar PDF
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default TablaFacturacion;
