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
import { Edit, Delete } from "@mui/icons-material";

const ListaInquilinos = ({ inquilinos, onEdit, onDelete }) => (
  <TableContainer
    component={Paper}
    sx={{ marginTop: "16px", borderRadius: "8px" }}
  >
    <Table>
      <TableHead sx={{ backgroundColor: "#4CAF50", color: "#FFF" }}>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>
            Nombre
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>
            Email
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>DNI</TableCell>
          <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>
            Acciones
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inquilinos.map((inquilino) => (
          <TableRow key={inquilino._id}>
            <TableCell>{inquilino.name}</TableCell>
            <TableCell>{inquilino.email}</TableCell>
            <TableCell>{inquilino.DNI}</TableCell>
            <TableCell>
              <Button
                startIcon={<Edit />}
                onClick={() => onEdit(inquilino)}
                sx={{ marginRight: "8px" }}
              >
                Editar
              </Button>
              <Button
                startIcon={<Delete />}
                color="error"
                onClick={() => onDelete(inquilino._id)}
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

export default ListaInquilinos;
