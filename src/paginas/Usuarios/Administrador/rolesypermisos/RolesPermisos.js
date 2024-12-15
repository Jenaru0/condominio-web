import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import ListaRoles from "./ListaRoles";
import FormularioRol from "./FormularioRol";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";

const RolesPermisos = () => {
  const [roles, setRoles] = useState([]);
  const [permisos] = useState([
    "crear",
    "editar",
    "eliminar",
    "ver",
    "configurar",
    "reportar",
    "monitorear",
    "cerrar_ordenes",
    "aprobar",
    "rechazar",
    "generar_reportes",
    "auditar",
    "resolver",
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedRol, setSelectedRol] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = () => {
      const mockRoles = [
        { id: 1, name: "Administrador", assignedPermissions: ["crear", "editar", "eliminar", "ver", "configurar"] },
        { id: 2, name: "Seguridad", assignedPermissions: ["ver", "editar", "reportar", "monitorear"] },
        { id: 3, name: "Mantenimiento", assignedPermissions: ["ver", "crear", "editar", "cerrar_ordenes"] },
        { id: 4, name: "Residente", assignedPermissions: ["ver"] },
        { id: 5, name: "Propietario", assignedPermissions: ["ver", "editar"] },
        { id: 6, name: "Inquilino", assignedPermissions: ["ver"] },
        { id: 7, name: "Recepcionista", assignedPermissions: ["crear", "ver", "editar"] },
        { id: 8, name: "Supervisor", assignedPermissions: ["ver", "aprobar", "rechazar", "reportar"] },
        { id: 9, name: "Conserje", assignedPermissions: ["ver", "reportar"] },
        { id: 10, name: "Usuario Temporal", assignedPermissions: ["ver", "crear"] },
      ];

      setTimeout(() => {
        setRoles(mockRoles);
        setLoading(false);
      }, 3000); // Simulación de retraso de 3 segundos
    };

    cargarDatos();
  }, []);

  const handleOpenDialog = (rol = null) => {
    setSelectedRol(rol);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedRol(null);
    setDialogOpen(false);
  };

  const handleSave = (form) => {
    if (selectedRol) {
      setRoles((prev) =>
          prev.map((r) => (r.id === selectedRol.id ? { ...form } : r))
      );
    } else {
      setRoles((prev) => [...prev, { ...form, id: Date.now() }]);
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
    setRoles((prev) => prev.filter((r) => r.id !== deleteId));
    closeConfirmDialog();
  };

  if (loading) {
    return <LoadingSpinner text="Cargando roles y permisos..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        {/* Encabezado común con botón reutilizable */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Roles y Permisos" />
          <Boton label="+ Crear Rol" onClick={() => handleOpenDialog()} />
        </div>

        {/* Lista de roles */}
        <ListaRoles
            roles={roles}
            onEdit={handleOpenDialog}
            onDelete={openConfirmDialog}
        />

        {/* Formulario de roles */}
        {dialogOpen && (
            <FormularioRol
                open={dialogOpen}
                onClose={handleCloseDialog}
                rol={selectedRol}
                onSave={handleSave}
                permisos={permisos}
            />
        )}

        {/* Confirmación de eliminación */}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar este rol?"
            />
        )}
      </Box>
  );
};

export default RolesPermisos;
