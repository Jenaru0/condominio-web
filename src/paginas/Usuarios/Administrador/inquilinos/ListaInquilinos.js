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
        sx={{
          marginTop: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
      <Table>
        {/* Encabezado */}
        <TableHead sx={{ backgroundColor: "#3b82f6" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>DNI</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Propietario</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Departamento</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Piso</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Edificio</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        {/* Cuerpo */}
        <TableBody>
          {inquilinos.map((inquilino) => (
              <TableRow
                  key={inquilino._id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f3f4f6" },
                    transition: "background-color 0.3s ease",
                  }}
              >
                <TableCell>{inquilino.name}</TableCell>
                <TableCell>{inquilino.email}</TableCell>
                <TableCell>{inquilino.DNI}</TableCell>
                <TableCell>{inquilino.propietario_asociado?.name || "Sin propietario"}</TableCell>
                <TableCell>{inquilino.habitacion_id?.numero || "Sin departamento"}</TableCell>
                <TableCell>{inquilino.habitacion_id?.piso || "Sin piso"}</TableCell>
                <TableCell>{inquilino.habitacion_id?.edificio_id?.nombre || "Sin edificio"}</TableCell>
                <TableCell>
                  <Button
                      startIcon={<Edit />}
                      onClick={() => onEdit(inquilino)}
                      sx={{
                        color: "#3b82f6",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": { color: "#2563eb" },
                      }}
                  >
                    Editar
                  </Button>
                  <Button
                      startIcon={<Delete />}
                      onClick={() => onDelete(inquilino._id)}
                      sx={{
                        color: "#ef4444",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": { color: "#dc2626" },
                      }}
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
