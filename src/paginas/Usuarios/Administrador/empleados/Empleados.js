import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import ListaEmpleados from "./ListaEmpleados";
import FormularioEmpleado from "./FormularioEmpleado";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [empleadoToDelete, setEmpleadoToDelete] = useState(null);

  // Simulación de carga inicial
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Pedro Sánchez",
        dni: "74851021",
        email: "pedro.sanchez@example.com",
        phone: "+51 987 654 123",
        role: "seguridad",
      },
      {
        id: 2,
        name: "Laura Ramírez",
        dni: "75862031",
        email: "laura.ramirez@example.com",
        phone: "+51 987 123 654",
        role: "mantenimiento",
      },
    ];

    // Retraso simulado de 3 segundos
    setTimeout(() => {
      setEmpleados(mockData);
      setLoading(false);
    }, 3000);
  }, []);

  const handleOpenDialog = (empleado = null) => {
    setSelectedEmpleado(empleado);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedEmpleado(null);
    setDialogOpen(false);
  };

  const handleSave = (form) => {
    if (selectedEmpleado) {
      setEmpleados((prev) =>
          prev.map((e) => (e.id === selectedEmpleado.id ? { ...form } : e))
      );
    } else {
      setEmpleados((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (empleado) => {
    setEmpleadoToDelete(empleado);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setEmpleadoToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setEmpleados((prev) => prev.filter((e) => e.id !== empleadoToDelete.id));
    handleCloseDeleteDialog();
  };

  if (loading) {
    return <LoadingSpinner text="Cargando empleados..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        {/* Encabezado común con Botón reutilizable */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Empleados" />
          <Boton label="+ Crear Empleado" onClick={() => handleOpenDialog()} />
        </div>

        {/* Lista de empleados */}
        <ListaEmpleados
            empleados={empleados}
            onEdit={handleOpenDialog}
            onDelete={handleOpenDeleteDialog}
        />

        {/* Formulario de empleados */}
        {dialogOpen && (
            <FormularioEmpleado
                open={dialogOpen}
                onClose={handleCloseDialog}
                empleado={selectedEmpleado}
                onSave={handleSave}
            />
        )}

        {/* Confirmación de eliminación */}
        <ConfirmacionEliminacion
            open={deleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleConfirmDelete}
            text={`¿Estás seguro de eliminar este empleado?`}
        />
      </Box>
  );
};

export default Empleados;
