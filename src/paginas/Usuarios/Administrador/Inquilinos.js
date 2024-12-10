import React, { useState } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../componentes/inquilinos/Encabezado";
import ListaInquilinos from "../../../componentes/inquilinos/ListaInquilinos";
import FormularioInquilino from "../../../componentes/inquilinos/FormularioInquilino";
import {
  listarInquilinos,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../../../api/usuarioService";

const Inquilinos = () => {
  const [inquilinos, setInquilinos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInquilino, setSelectedInquilino] = useState(null);

  const cargarInquilinos = async () => {
    const data = await listarInquilinos();
    setInquilinos(data);
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
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este inquilino?")) {
      await eliminarUsuario(id);
      await cargarInquilinos();
    }
  };

  React.useEffect(() => {
    cargarInquilinos();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Encabezado onAdd={() => handleOpenDialog()} />
      <ListaInquilinos
        inquilinos={inquilinos}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />
      {dialogOpen && (
        <FormularioInquilino
          open={dialogOpen}
          onClose={handleCloseDialog}
          inquilino={selectedInquilino}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default Inquilinos;
