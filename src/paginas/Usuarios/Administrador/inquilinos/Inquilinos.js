import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EncabezadoInquilinos from "./EncabezadoInquilinos";
import ListaInquilinos from "./ListaInquilinos";
import FormularioInquilino from "./FormularioInquilino";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";
import {
  listarInquilinos,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../../../../api/usuarioService";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const Inquilinos = () => {
  const [inquilinos, setInquilinos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedInquilino, setSelectedInquilino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const cargarInquilinos = async () => {
    try {
      setLoading(true);
      // Simulación de retraso de 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await listarInquilinos();
      setInquilinos(data);
    } catch (error) {
      console.error("Error al cargar los inquilinos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (inquilino = null) => {
    setSelectedInquilino(inquilino);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedInquilino(null);
    setDialogOpen(false);
  };

  const handleSave = async (form) => {
    try {
      if (selectedInquilino) {
        await editarUsuario(selectedInquilino._id, form);
      } else {
        await crearUsuario({
          ...form,
          rol: "residente",
          tipo_residente: "inquilino",
        });
      }
      await cargarInquilinos();
    } catch (error) {
      console.error("Error al guardar el inquilino:", error);
    } finally {
      handleCloseDialog();
    }
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
        await cargarInquilinos();
      }
    } catch (error) {
      console.error("Error al eliminar el inquilino:", error);
    } finally {
      closeConfirmDialog();
    }
  };

  useEffect(() => {
    cargarInquilinos();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Cargando inquilinos..." />;
  }

  return (
      <Box
          sx={{
            padding: 4,
            backgroundColor: "#f3f4f6",
            minHeight: "100vh",
            borderRadius: "12px",
            fontFamily: "'Montserrat', sans-serif",
          }}
      >
        <EncabezadoInquilinos onAdd={() => handleOpenDialog()} />
        <ListaInquilinos
            inquilinos={inquilinos}
            onEdit={handleOpenDialog}
            onDelete={(id) => openConfirmDialog(id)}
        />
        {dialogOpen && (
            <FormularioInquilino
                open={dialogOpen}
                onClose={handleCloseDialog}
                inquilino={selectedInquilino}
                onSave={handleSave}
            />
        )}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar este inquilino?"
            />
        )}
      </Box>
  );
};

export default Inquilinos;
