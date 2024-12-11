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

const ListaAccesos = ({ accesos }) => (
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
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Nombre</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>DNI</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Tipo</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Zona</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Entrada</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Salida</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {accesos.map((acceso) => (
                    <TableRow
                        key={acceso._id}
                        hover
                        sx={{
                            "&:hover": { backgroundColor: "#e0f2fe" },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <TableCell>{acceso.nombre}</TableCell>
                        <TableCell>{acceso.dni}</TableCell>
                        <TableCell>{acceso.tipoUsuario}</TableCell>
                        <TableCell>{acceso.zonaAcceso}</TableCell>
                        <TableCell>{new Date(acceso.fechaEntrada).toLocaleString()}</TableCell>
                        <TableCell>
                            {acceso.fechaSalida
                                ? new Date(acceso.fechaSalida).toLocaleString()
                                : "N/A"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default ListaAccesos;
