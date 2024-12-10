import React, { useEffect, useState, useCallback } from "react";
import {
  listarHabitaciones,
  crearHabitacion,
  editarHabitacion,
  eliminarHabitacion,
} from "../../api/habitacionService";
import { obtenerUsuarios } from "../../api/usuarioService";
import { listarEdificios } from "../../api/edificioService";

const Departamentos = () => {
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 10;

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [habitacionesResponse, edificiosResponse, usuariosResponse] =
        await Promise.all([
          listarHabitaciones(),
          listarEdificios(),
          obtenerUsuarios(),
        ]);

      console.log("Usuarios Response:", usuariosResponse); // Verificar contenido de usuarios

      // Validar respuestas y asignar a los estados correspondientes
      setDepartments(habitacionesResponse || []);
      setBuildings(edificiosResponse || []);
      setUsers(Array.isArray(usuariosResponse) ? usuariosResponse : []);

      if (!Array.isArray(usuariosResponse) || usuariosResponse.length === 0) {
        console.warn("No se encontraron usuarios en la API.");
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Ocurrió un error al cargar los datos. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const filtrarDepartamentos = useCallback(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = departments.filter(
      (dep) =>
        dep.numero.toString().toLowerCase().includes(lowerSearch) ||
        dep.edificio_id?.nombre?.toLowerCase().includes(lowerSearch) ||
        dep.piso.toString().toLowerCase().includes(lowerSearch)
    );
    setFilteredDepartments(filtered);
  }, [search, departments]);

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    filtrarDepartamentos();
  }, [filtrarDepartamentos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existeDuplicado = departments.some(
        (dep) =>
          dep.numero === form.numero &&
          dep.piso === form.piso &&
          dep.edificio_id === form.edificio_id &&
          dep._id !== form._id
      );

      if (existeDuplicado) {
        alert("Ya existe un departamento con estos datos.");
        return;
      }

      if (isEditing) {
        await editarHabitacion(form._id, form);
        alert("Departamento actualizado correctamente.");
      } else {
        await crearHabitacion(form);
        alert("Departamento creado correctamente.");
      }

      resetForm();
      cargarDatos();
    } catch (error) {
      console.error("Error al guardar el departamento:", error);
      alert("Ocurrió un error al guardar el departamento.");
    }
  };

  const handleEdit = (department) => {
    setForm({
      _id: department._id,
      numero: department.numero,
      piso: department.piso,
      edificio_id: department.edificio_id?._id || "",
      propietario_asociado: department.propietario_asociado?._id || "",
      inquilino_asociado: department.inquilino_asociado?._id || "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este departamento?")
    ) {
      try {
        await eliminarHabitacion(id);
        alert("Departamento eliminado correctamente.");
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

  const filteredOwners = users.filter(
    (user) => user.tipo_residente === "propietario"
  );
  const filteredTenants = users.filter(
    (user) => user.tipo_residente === "inquilino"
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentDepartments = filteredDepartments.slice(
    (currentPage - 1) * departmentsPerPage,
    currentPage * departmentsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gestión de Departamentos
      </h1>

      <div className="mb-6">
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
            type="number"
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
            {filteredOwners.length > 0 ? (
              filteredOwners.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No hay propietarios disponibles
              </option>
            )}
          </select>
          <select
            value={form.inquilino_asociado}
            onChange={(e) =>
              setForm({ ...form, inquilino_asociado: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="">Seleccionar Inquilino</option>
            {filteredTenants.length > 0 ? (
              filteredTenants.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No hay inquilinos disponibles
              </option>
            )}
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
            {currentDepartments.map((department) => (
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
        <div className="flex justify-center mt-4">
          {Array.from(
            {
              length: Math.ceil(
                filteredDepartments.length / departmentsPerPage
              ),
            },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departamentos;
