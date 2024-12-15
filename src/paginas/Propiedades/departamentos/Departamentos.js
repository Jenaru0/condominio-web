import React, { useState, useEffect } from "react";
import Encabezado from "../../../componentes/comunes/Encabezado";
import Boton from "../../../componentes/comunes/Boton";
import ListaDepartamentos from "./ListaDepartamentos";
import FormularioDepartamento from "./FormularioDepartamento";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../componentes/comunes/ConfirmacionEliminacion";
import {
  listarHabitaciones,
  crearHabitacion,
  editarHabitacion,
  eliminarHabitacion,
} from "../../../api/habitacionService";
import { listarEdificios } from "../../../api/edificioService";
import { obtenerUsuarios } from "../../../api/usuarioService";

const Departamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [habitaciones, edificios, usuarios] = await Promise.all([
          listarHabitaciones(),
          listarEdificios(),
          obtenerUsuarios(),
        ]);
        setDepartamentos(habitaciones);
        setEdificios(edificios);
        setUsuarios(usuarios);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(cargarDatos, 3000); // Simulación de retraso
  }, []);

  const handleSave = async (form) => {
    try {
      if (selectedDepartamento) {
        await editarHabitacion(selectedDepartamento._id, form);
      } else {
        await crearHabitacion(form);
      }
      const habitaciones = await listarHabitaciones();
      setDepartamentos(habitaciones);
    } catch (error) {
      console.error("Error al guardar departamento:", error);
    }
    setDialogOpen(false);
  };

  const handleEdit = (dep) => {
    setSelectedDepartamento(dep);
    setDialogOpen(true);
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
      await eliminarHabitacion(deleteId);
      const habitaciones = await listarHabitaciones();
      setDepartamentos(habitaciones);
    } catch (error) {
      console.error("Error al eliminar departamento:", error);
    }
    closeConfirmDialog();
  };

  if (loading) {
    return <LoadingSpinner text="Cargando departamentos..." />;
  }

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Encabezado común con botón reutilizable */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Departamentos" />
          <Boton label="+ Crear Departamento" onClick={() => setDialogOpen(true)} />
        </div>

        {/* Lista de departamentos */}
        <ListaDepartamentos
            departamentos={departamentos}
            onEdit={handleEdit}
            onDelete={openConfirmDialog}
        />

        {/* Formulario para agregar o editar departamentos */}
        {dialogOpen && (
            <FormularioDepartamento
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                departamento={selectedDepartamento}
                onSave={handleSave}
                buildings={edificios}
                owners={usuarios.filter((u) => u.tipo_residente === "propietario")}
                tenants={usuarios.filter((u) => u.tipo_residente === "inquilino")}
            />
        )}

        {/* Confirmación de eliminación */}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar este departamento?"
            />
        )}
      </div>
  );
};

export default Departamentos;
