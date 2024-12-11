import React, { useEffect, useState } from "react";
//import axios from "axios";

const SolicitudesMantenimiento = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    usuario_id: "",
    descripcion: "",
    estado: "Pendiente",
    tecnico_asignado: "",
    fecha_solicitud: "",
    fecha_resolucion: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    estado: "",
    tecnico_asignado: "",
    usuario_id: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data para solicitudes y usuarios
    const mockServiceRequests = [
      {
        id: 1,
        usuario_id: "101",
        descripcion: "Reparar luminaria en pasillo",
        estado: "Pendiente",
        tecnico_asignado: "Carlos López",
        fecha_solicitud: "2023-12-01",
        fecha_resolucion: "",
      },
      {
        id: 2,
        usuario_id: "102",
        descripcion: "Fuga de agua en baño",
        estado: "Resuelto",
        tecnico_asignado: "Juan García",
        fecha_solicitud: "2023-11-28",
        fecha_resolucion: "2023-12-02",
      },
      {
        id: 3,
        usuario_id: "103",
        descripcion: "Pintar paredes del lobby",
        estado: "En proceso",
        tecnico_asignado: "Luis Torres",
        fecha_solicitud: "2023-12-02",
        fecha_resolucion: "",
      },
    ];

    const mockUsers = [
      { id: "101", name: "Juan Pérez", rol: "residente" },
      { id: "102", name: "María López", rol: "residente" },
      { id: "103", name: "Carlos Gómez", rol: "residente" },
    ];

    // Simular carga de datos desde API
    setTimeout(() => {
      setServiceRequests(mockServiceRequests);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar solicitud existente
      const updatedRequests = serviceRequests.map((request) =>
        request.id === form.id ? form : request
      );
      setServiceRequests(updatedRequests);
      alert("Solicitud actualizada con éxito");
    } else {
      // Crear nueva solicitud
      const newRequest = { ...form, id: serviceRequests.length + 1 };
      setServiceRequests([...serviceRequests, newRequest]);
      alert("Solicitud creada con éxito");
    }

    resetForm();
  };

  const handleEdit = (request) => {
    setForm(request);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta solicitud?")
    ) {
      setServiceRequests(
        serviceRequests.filter((request) => request.id !== id)
      );
      alert("Solicitud eliminada con éxito");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      usuario_id: "",
      descripcion: "",
      estado: "Pendiente",
      tecnico_asignado: "",
      fecha_solicitud: "",
      fecha_resolucion: "",
    });
    setIsEditing(false);
  };

  const filteredRequests = serviceRequests.filter((request) => {
    const user = users.find((user) => user.id === request.usuario_id);
    const matchesSearch =
      request.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      (user?.name.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesEstado = !filters.estado || request.estado === filters.estado;
    const matchesTecnico =
      !filters.tecnico_asignado ||
      request.tecnico_asignado === filters.tecnico_asignado;
    const matchesUsuario =
      !filters.usuario_id || request.usuario_id === filters.usuario_id;

    return matchesSearch && matchesEstado && matchesTecnico && matchesUsuario;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Cargando solicitudes de mantenimiento...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Solicitudes de Mantenimiento
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Estado (Todos)</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Resuelto">Resuelto</option>
        </select>
        <select
          value={filters.tecnico_asignado}
          onChange={(e) =>
            setFilters({ ...filters, tecnico_asignado: e.target.value })
          }
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Técnico (Todos)</option>
          {[...new Set(serviceRequests.map((req) => req.tecnico_asignado))]
            .filter((tecnico) => tecnico)
            .map((tecnico) => (
              <option key={tecnico} value={tecnico}>
                {tecnico}
              </option>
            ))}
        </select>
        <select
          value={filters.usuario_id}
          onChange={(e) =>
            setFilters({ ...filters, usuario_id: e.target.value })
          }
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Usuario (Todos)</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por descripción o usuario..."
          className="border rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Formulario */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Solicitud" : "Crear Nueva Solicitud"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <select
            value={form.usuario_id}
            onChange={(e) => setForm({ ...form, usuario_id: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">Seleccionar Usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción del problema"
            className="border rounded-lg px-4 py-2 w-full h-20"
            required
          />
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            <option value="Resuelto">Resuelto</option>
          </select>
          <input
            type="text"
            value={form.tecnico_asignado}
            onChange={(e) =>
              setForm({ ...form, tecnico_asignado: e.target.value })
            }
            placeholder="Técnico Asignado"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <input
            type="date"
            value={form.fecha_solicitud}
            onChange={(e) =>
              setForm({ ...form, fecha_solicitud: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="date"
            value={form.fecha_resolucion}
            onChange={(e) =>
              setForm({ ...form, fecha_resolucion: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
            disabled={form.estado !== "Resuelto"}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Solicitud"}
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

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Técnico</th>
              <th className="px-4 py-2 text-left">Fecha Solicitud</th>
              <th className="px-4 py-2 text-left">Fecha Resolución</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="border-t">
                <td className="px-4 py-2">
                  {users.find((user) => user.id === request.usuario_id)?.name ||
                    "N/A"}
                </td>
                <td className="px-4 py-2">{request.descripcion}</td>
                <td className="px-4 py-2">{request.estado}</td>
                <td className="px-4 py-2">{request.tecnico_asignado}</td>
                <td className="px-4 py-2">{request.fecha_solicitud}</td>
                <td className="px-4 py-2">
                  {request.fecha_resolucion || "Pendiente"}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(request)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(request.id)}
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

export default SolicitudesMantenimiento;
