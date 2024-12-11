import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TablaFinancieros = ({ datos }) => (
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
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Categoría</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Tipo</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Monto</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {datos.length > 0 ? (
                    datos.map((item) => (
                        <TableRow key={item._id} hover>
                            <TableCell>{item.fecha}</TableCell>
                            <TableCell>{item.categoria}</TableCell>
                            <TableCell>{item.tipo}</TableCell>
                            <TableCell>S/ {item.monto.toFixed(2)}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} align="center">
                            No se encontraron registros con los filtros aplicados.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>
);

export default TablaFinancieros;
