import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import ListaReservas from "./ListaReservas";
import FormularioReserva from "./FormularioReserva";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Simulación de carga de datos
  useEffect(() => {
    const cargarDatos = () => {
      const mockReservas = [
        {
          id: 1,
          usuario_id: "101",
          area_comun: "Piscina",
          fecha_reserva: "2023-12-10",
          hora_inicio: "10:00",
          hora_fin: "12:00",
          estado: "Confirmada",
        },
        {
          id: 2,
          usuario_id: "102",
          area_comun: "Sala de Eventos",
          fecha_reserva: "2023-12-11",
          hora_inicio: "14:00",
          hora_fin: "16:00",
          estado: "Pendiente",
        },
      ];

      const mockUsers = [
        { id: "101", name: "Juan Pérez" },
        { id: "102", name: "María López" },
      ];

      const mockAreas = ["Piscina", "Sala de Eventos", "Gimnasio"];

      setTimeout(() => {
        setReservas(mockReservas);
        setUsers(mockUsers);
        setAreas(mockAreas);
        setLoading(false);
      }, 3000);
    };

    cargarDatos();
  }, []);

  // Abrir y cerrar diálogo
  const handleOpenDialog = (reserva = null) => {
    setSelectedReserva(reserva);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedReserva(null);
    setDialogOpen(false);
  };

  // Guardar o actualizar reserva
  const handleSave = (form) => {
    if (selectedReserva) {
      setReservas((prev) =>
          prev.map((r) => (r.id === selectedReserva.id ? { ...form } : r))
      );
    } else {
      setReservas((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  // Confirmación de eliminación
  const openConfirmDialog = (id) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setDeleteId(null);
    setConfirmDialogOpen(false);
  };

  const handleDelete = () => {
    setReservas((prev) => prev.filter((r) => r.id !== deleteId));
    closeConfirmDialog();
  };

  if (loading) {
    return <LoadingSpinner text="Cargando reservas..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        {/* Encabezado común con botón reutilizable */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Gestión de Reservas" />
          <Boton label="+ Crear Reserva" onClick={() => handleOpenDialog()} />
        </div>

        {/* Lista de reservas */}
        <ListaReservas
            reservas={reservas}
            users={users}
            onEdit={handleOpenDialog}
            onDelete={openConfirmDialog}
        />

        {/* Formulario de reserva */}
        {dialogOpen && (
            <FormularioReserva
                open={dialogOpen}
                onClose={handleCloseDialog}
                reserva={selectedReserva}
                onSave={handleSave}
                users={users}
                areas={areas}
            />
        )}

        {/* Confirmación de eliminación */}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar esta reserva?"
            />
        )}
      </Box>
  );
};

export default Reservas;
