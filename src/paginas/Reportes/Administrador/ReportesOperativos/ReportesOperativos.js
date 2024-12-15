import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import FormularioOperativo from "./FormularioOperativo";
import ListaOperativos from "./ListaOperativos";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const Operativos = () => {
  const [operativos, setOperativos] = useState([]);
  const [selectedOperativo, setSelectedOperativo] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setOperativos([
        {
          _id: "1",
          fecha: "2023-12-01",
          categoria: "Mantenimiento",
          estado: "Pendiente",
          descripcion: "Reparar luminaria en pasillo",
        },
        {
          _id: "2",
          fecha: "2023-12-03",
          categoria: "Ocupación",
          estado: "Finalizado",
          descripcion: "Departamento 101 asignado a Juan Pérez",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenDialog = (operativo = null) => {
    setSelectedOperativo(operativo);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedOperativo(null);
    setDialogOpen(false);
  };

  const handleSave = (form) => {
    if (selectedOperativo) {
      setOperativos((prev) =>
          prev.map((op) => (op._id === selectedOperativo._id ? { ...op, ...form } : op))
      );
    } else {
      setOperativos((prev) => [...prev, { _id: Date.now().toString(), ...form }]);
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
    setOperativos((prev) => prev.filter((op) => op._id !== deleteId));
    closeConfirmDialog();
  };

  if (loading) {
    return <LoadingSpinner text="Cargando reportes operativos..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        {/* Encabezado común con botón */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Reportes Operativos" />
          <Boton label="+ Agregar Operativo" onClick={() => handleOpenDialog()} />
        </div>

        {/* Lista de operativos */}
        <ListaOperativos
            operativos={operativos}
            onEdit={handleOpenDialog}
            onDelete={openConfirmDialog}
        />

        {/* Formulario de operativos */}
        {dialogOpen && (
            <FormularioOperativo
                open={dialogOpen}
                onClose={handleCloseDialog}
                operativo={selectedOperativo}
                onSave={handleSave}
            />
        )}

        {/* Confirmación de eliminación */}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar este operativo?"
            />
        )}
      </Box>
  );
};

export default Operativos;
