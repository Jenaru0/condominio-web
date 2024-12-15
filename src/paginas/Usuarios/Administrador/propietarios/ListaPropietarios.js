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

const ListaPropietarios = ({ propietarios, onEdit, onDelete }) => (
    <TableContainer
        component={Paper}
        sx={{
          marginTop: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
    >
      <Table>
        {/* Encabezado de la tabla */}
        <TableHead sx={{ backgroundColor: "#3b82f6" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Teléfono</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>DNI</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Departamento</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Piso</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Edificio</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        {/* Cuerpo de la tabla */}
        <TableBody>
          {propietarios.map((propietario) => (
              <TableRow
                  key={propietario._id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f3f4f6" },
                    transition: "background-color 0.3s ease",
                  }}
              >
                <TableCell>{propietario.name}</TableCell>
                <TableCell>{propietario.email}</TableCell>
                <TableCell>{propietario.telefono || "No disponible"}</TableCell>
                <TableCell>{propietario.DNI}</TableCell>
                <TableCell>
                  {propietario.habitacion_id?.numero || "Sin departamento"}
                </TableCell>
                <TableCell>
                  {propietario.habitacion_id?.piso || "Sin piso"}
                </TableCell>
                <TableCell>
                  {propietario.habitacion_id?.edificio_id?.nombre || "Sin edificio"}
                </TableCell>
                <TableCell>
                  <Button
                      startIcon={<Edit />}
                      onClick={() => onEdit(propietario)}
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
                      onClick={() => onDelete(propietario._id)}
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

export default ListaPropietarios;
