import React, { useEffect, useState } from "react";
import {
  obtenerHabitaciones,
  crearHabitacion,
  actualizarHabitacion,
  eliminarHabitacion,
} from "../../api/habitacionService";
import { obtenerUsuarios } from "../../api/usuarioService";
import { obtenerEdificios } from "../../api/edificioService";

const Departamentos = () => {
  const [departments, setDepartments] = useState([]); // Habitaciones
  const [buildings, setBuildings] = useState([]); // Edificios
  const [users, setUsers] = useState([]); // Usuarios
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: null,
    numero: "",
    piso: "",
    edificio_id: "",
    propietario_asociado: "",
    inquilino_asociado: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [habitacionesResponse, edificiosResponse, usuariosResponse] =
        await Promise.allSettled([
          obtenerHabitaciones(),
          obtenerEdificios(),
          obtenerUsuarios(),
        ]);

      if (habitacionesResponse.status === "fulfilled") {
        setDepartments(habitacionesResponse.value?.data || []);
      } else {
        console.error(
          "Error al cargar habitaciones:",
          habitacionesResponse.reason
        );
      }

      if (edificiosResponse.status === "fulfilled") {
        setBuildings(edificiosResponse.value?.data || []);
      } else {
        console.error("Error al cargar edificios:", edificiosResponse.reason);
      }

      if (usuariosResponse.status === "fulfilled") {
        setUsers(usuariosResponse.value?.data || []);
      } else {
        console.error("Error al cargar usuarios:", usuariosResponse.reason);
      }
    } catch (error) {
      console.error("Error inesperado al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const habitacionData = {
      numero: form.numero,
      piso: form.piso,
      edificio_id: form.edificio_id || null,
      propietario_asociado: form.propietario_asociado || null,
      inquilino_asociado: form.inquilino_asociado || null,
    };

    try {
      // Validación de duplicados
      const existeDuplicado = departments.some(
        (dep) =>
          dep.numero === form.numero &&
          dep.piso === form.piso &&
          dep.edificio_id === form.edificio_id &&
          dep._id !== form._id // Excluir la habitación actual en edición
      );

      if (existeDuplicado) {
        alert("Ya existe una habitación con estos datos.");
        return;
      }

      if (isEditing) {
        await actualizarHabitacion(form._id, habitacionData);
        alert("Departamento actualizado con éxito");
      } else {
        await crearHabitacion(habitacionData);
        alert("Departamento creado con éxito");
      }

      resetForm();
      cargarDatos();
    } catch (error) {
      console.error("Error al guardar el departamento:", error);
      alert(
        error.response?.data?.message ||
          "Ocurrió un error al guardar el departamento."
      );
    }
  };

  const handleEdit = (department) => {
    setForm(department);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este departamento?")
    ) {
      try {
        await eliminarHabitacion(id);
        alert("Departamento eliminado con éxito");
        cargarDatos();
      } catch (error) {
        console.error("Error al eliminar el departamento:", error);
        alert("Ocurrió un error al eliminar el departamento.");
      }
    }
  };

  const resetForm = () => {
    setForm({
      _id: null,
      numero: "",
      piso: "",
      edificio_id: "",
      propietario_asociado: "",
      inquilino_asociado: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Cargando lista de departamentos...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Departamentos</h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar departamentos..."
          className="border rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Departamento" : "Crear Nuevo Departamento"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            placeholder="Número de Departamento"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.piso}
            onChange={(e) => setForm({ ...form, piso: e.target.value })}
            placeholder="Piso"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <select
            value={form.edificio_id}
            onChange={(e) => setForm({ ...form, edificio_id: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">Seleccionar Edificio</option>
            {buildings.map((building) => (
              <option key={building._id} value={building._id}>
                {building.nombre}
              </option>
            ))}
          </select>
          <select
            value={form.propietario_asociado}
            onChange={(e) =>
              setForm({ ...form, propietario_asociado: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="">Seleccionar Propietario</option>
            {users
              .filter((user) => user.tipo_residente === "propietario")
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
          <select
            value={form.inquilino_asociado}
            onChange={(e) =>
              setForm({ ...form, inquilino_asociado: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="">Seleccionar Inquilino</option>
            {users
              .filter((user) => user.tipo_residente === "inquilino")
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Departamento"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Número</th>
              <th className="px-4 py-2 text-left">Piso</th>
              <th className="px-4 py-2 text-left">Edificio</th>
              <th className="px-4 py-2 text-left">Propietario</th>
              <th className="px-4 py-2 text-left">Inquilino</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id} className="border-t">
                <td className="px-4 py-2">{department.numero}</td>
                <td className="px-4 py-2">{department.piso}</td>
                <td className="px-4 py-2">
                  {department.edificio_id?.nombre || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {department.propietario_asociado?.name || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {department.inquilino_asociado?.name || "N/A"}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(department)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(department._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departamentos;
