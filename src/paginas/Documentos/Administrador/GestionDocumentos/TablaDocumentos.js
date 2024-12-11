import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

const TablaDocumentos = ({ documentos, onView, onEdit, onDelete }) => (
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
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Tipo</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Estado</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Fecha de Expiración</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {documentos.map((doc) => (
                    <TableRow key={doc._id}>
                        <TableCell>{doc.nombre_documento}</TableCell>
                        <TableCell>{doc.tipo}</TableCell>
                        <TableCell>{doc.estado}</TableCell>
                        <TableCell>{doc.fecha_expiracion}</TableCell>
                        <TableCell>
                            <Button
                                startIcon={<Visibility />}
                                onClick={() => onView(doc.documento_url)}
                                sx={{ color: "#22c55e", fontWeight: 600 }}
                            >
                                Ver
                            </Button>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => onEdit(doc._id)}
                                sx={{ color: "#f59e0b", fontWeight: 600 }}
                            >
                                Editar
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => onDelete(doc._id)}
                                sx={{ fontWeight: 600 }}
                            >
                                Eliminar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default TablaDocumentos;
