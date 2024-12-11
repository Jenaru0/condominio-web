import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EncabezadoPropietario from "./EncabezadoPropietario";
import ListaPropietarios from "./ListaPropietarios";
import FormularioPropietario from "./FormularioPropietario";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";
import {
  listarPropietarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../../../../api/usuarioService";

const Propietarios = () => {
  const [propietarios, setPropietarios] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPropietario, setSelectedPropietario] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const data = await listarPropietarios();
      setPropietarios(data);
    } catch (error) {
      console.error("Error al cargar propietarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(cargarDatos, 3000); // Simulación de retraso de 3 segundos
  }, []);

  const handleOpenDialog = (propietario = null) => {
    setSelectedPropietario(propietario);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedPropietario(null);
    setDialogOpen(false);
  };

  const handleSave = async (form) => {
    try {
      if (selectedPropietario) {
        await editarUsuario(selectedPropietario._id, form);
      } else {
        await crearUsuario({
          ...form,
          rol: "residente",
          tipo_residente: "propietario",
        });
      }
      await cargarDatos();
    } catch (error) {
      console.error("Error al guardar propietario:", error);
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

  const handleDelete = async () => {
    try {
      if (deleteId) {
        await eliminarUsuario(deleteId);
        await cargarDatos();
      }
    } catch (error) {
      console.error("Error al eliminar propietario:", error);
    } finally {
      closeConfirmDialog();
    }
  };

  if (loading) {
    return <LoadingSpinner text="Cargando propietarios..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        <EncabezadoPropietario onAdd={() => handleOpenDialog()} />
        <ListaPropietarios
            propietarios={propietarios}
            onEdit={handleOpenDialog}
            onDelete={(id) => openConfirmDialog(id)}
        />
        {dialogOpen && (
            <FormularioPropietario
                open={dialogOpen}
                onClose={handleCloseDialog}
                propietario={selectedPropietario}
                onSave={handleSave}
            />
        )}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar este propietario?"
            />
        )}
      </Box>
  );
};

export default Propietarios;
