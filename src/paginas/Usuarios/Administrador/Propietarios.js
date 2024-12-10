import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../componentes/propietarios/Encabezado";
import ListaPropietarios from "../../../componentes/propietarios/ListaPropietarios";
import FormularioPropietario from "../../../componentes/propietarios/FormularioPropietario";
import {
  listarPropietarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../../../api/usuarioService";

const Propietarios = () => {
  const [propietarios, setPropietarios] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPropietario, setSelectedPropietario] = useState(null);

  const cargarPropietarios = async () => {
    const data = await listarPropietarios();
    setPropietarios(data);
  };

  const handleOpenDialog = (propietario = null) => {
    setSelectedPropietario(propietario);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedPropietario(null);
    setDialogOpen(false);
  };

  const handleSave = async (form) => {
    if (selectedPropietario) {
      await editarUsuario(selectedPropietario._id, form);
    } else {
      await crearUsuario({
        ...form,
        rol: "residente",
        tipo_residente: "propietario",
      });
    }
    await cargarPropietarios();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este propietario?")) {
      await eliminarUsuario(id);
      await cargarPropietarios();
    }
  };

  useEffect(() => {
    cargarPropietarios();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Encabezado onAdd={() => handleOpenDialog()} />
      <ListaPropietarios
        propietarios={propietarios}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />
      {dialogOpen && (
        <FormularioPropietario
          open={dialogOpen}
          onClose={handleCloseDialog}
          propietario={selectedPropietario}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default Propietarios;
