import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../componentes/comunes/Encabezado";
import Boton from "../../../componentes/comunes/Boton";
import ListaCocheras from "./ListaCocheras";
import FormularioCochera from "./FormularioCochera";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../componentes/comunes/ConfirmacionEliminacion";

const Cocheras = () => {
  const [cocheras, setCocheras] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedCochera, setSelectedCochera] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const cargarDatos = () => {
      const mockParkingSpaces = [
        {
          id: 1,
          numero: "C101",
          nivel: "Subterráneo A",
          edificio: "Edificio A",
          estado: "Disponible",
          usuario_asignado: "",
        },
        {
          id: 2,
          numero: "C102",
          nivel: "Subterráneo B",
          edificio: "Edificio B",
          estado: "Asignado",
          usuario_asignado: "101",
        },
      ];
      const mockUsers = [
        { id: "101", name: "Juan Pérez", rol: "residente" },
        { id: "102", name: "María López", rol: "residente" },
      ];

      setTimeout(() => {
        setCocheras(mockParkingSpaces);
        setUsers(mockUsers);
        setLoading(false);
      }, 3000);
    };

    cargarDatos();
  }, []);

  const handleOpenDialog = (cochera = null) => {
    setSelectedCochera(cochera);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCochera(null);
    setDialogOpen(false);
  };

  const handleSave = (form) => {
    if (selectedCochera) {
      setCocheras((prev) =>
          prev.map((cochera) =>
              cochera.id === selectedCochera.id ? { ...form } : cochera
          )
      );
    } else {
      setCocheras((prev) => [
        ...prev,
        { ...form, id: Date.now() }, // ID temporal
      ]);
    }
    handleCloseDialog();
  };

  const openConfirmDialog = (id) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setDeleteId(null);
    setConfirmDialogOpen(false);
  };

  const handleDelete = () => {
    setCocheras((prev) => prev.filter((cochera) => cochera.id !== deleteId));
    closeConfirmDialog();
  };

  if (loading) {
    return <LoadingSpinner text="Cargando cocheras..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        {/* Encabezado común con el botón reutilizable */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Cocheras" />
          <Boton label="+ Crear Cochera" onClick={() => handleOpenDialog()} />
        </div>

        {/* Lista de cocheras */}
        <ListaCocheras
            cocheras={cocheras}
            users={users}
            onEdit={handleOpenDialog}
            onDelete={openConfirmDialog}
        />

        {/* Formulario para agregar o editar cocheras */}
        {dialogOpen && (
            <FormularioCochera
                open={dialogOpen}
                onClose={handleCloseDialog}
                cochera={selectedCochera}
                onSave={handleSave}
                users={users}
            />
        )}

        {/* Confirmación de eliminación */}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar esta cochera?"
            />
        )}
      </Box>
  );
};

export default Cocheras;
