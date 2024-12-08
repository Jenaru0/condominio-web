import React, { useEffect, useState } from "react";
//import axios from "axios";

const Correspondencia = () => {
  const [correspondencia, setCorrespondencia] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    usuario_id: "",
    tipo_correspondencia: "",
    descripcion: "",
    fecha_recepcion: "",
    estado: "Pendiente",
    notificado: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    tipo_correspondencia: "",
    estado: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data para correspondencia y usuarios
    const mockCorrespondencia = [
      {
        id: 1,
        usuario_id: "101",
        tipo_correspondencia: "Paquete",
        descripcion: "Amazon - Pedido de libros",
        fecha_recepcion: "2023-12-10",
        estado: "Pendiente",
        notificado: true,
      },
      {
        id: 2,
        usuario_id: "102",
        tipo_correspondencia: "Carta",
        descripcion: "Carta del banco",
        fecha_recepcion: "2023-12-09",
        estado: "Entregado",
        notificado: false,
      },
    ];

    const mockUsers = [
      { id: "101", name: "Juan Pérez" },
      { id: "102", name: "María López" },
    ];

    // Simular carga de datos
    setTimeout(() => {
      setCorrespondencia(mockCorrespondencia);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar correspondencia existente
      const updatedCorrespondencia = correspondencia.map((item) =>
        item.id === form.id ? form : item
      );
      setCorrespondencia(updatedCorrespondencia);
      alert("Registro de correspondencia actualizado con éxito");
    } else {
      // Crear nueva correspondencia
      const newCorrespondencia = { ...form, id: correspondencia.length + 1 };
      setCorrespondencia([...correspondencia, newCorrespondencia]);
      alert("Registro de correspondencia creado con éxito");
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      setCorrespondencia(correspondencia.filter((item) => item.id !== id));
      alert("Registro eliminado con éxito");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      usuario_id: "",
      tipo_correspondencia: "",
      descripcion: "",
      fecha_recepcion: "",
      estado: "Pendiente",
      notificado: false,
    });
    setIsEditing(false);
  };

  // Filtros aplicados
  const filteredCorrespondencia = correspondencia.filter((item) => {
    const matchesTipo =
      !filters.tipo_correspondencia ||
      item.tipo_correspondencia === filters.tipo_correspondencia;
    const matchesEstado = !filters.estado || item.estado === filters.estado;

    const user = users.find((u) => u.id === item.usuario_id);
    const matchesSearch =
      item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      (user?.name.toLowerCase().includes(search.toLowerCase()) ?? false);

    return matchesTipo && matchesEstado && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Cargando registros de correspondencia...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gestión de Correspondencia
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={filters.tipo_correspondencia}
          onChange={(e) =>
            setFilters({ ...filters, tipo_correspondencia: e.target.value })
          }
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Tipo (Todos)</option>
          <option value="Paquete">Paquete</option>
          <option value="Carta">Carta</option>
          <option value="Notificación">Notificación</option>
        </select>
        <select
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Estado (Todos)</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Entregado">Entregado</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por descripción o usuario..."
          className="border rounded-lg px-4 py-2 w-full"
        />
      </div>

      {/* Formulario */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Correspondencia" : "Crear Nueva Correspondencia"}
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
          <select
            value={form.tipo_correspondencia}
            onChange={(e) =>
              setForm({ ...form, tipo_correspondencia: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">Seleccionar Tipo</option>
            <option value="Paquete">Paquete</option>
            <option value="Carta">Carta</option>
            <option value="Notificación">Notificación</option>
          </select>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="date"
            value={form.fecha_recepcion}
            onChange={(e) =>
              setForm({ ...form, fecha_recepcion: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Entregado">Entregado</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={form.notificado}
              onChange={(e) =>
                setForm({ ...form, notificado: e.target.checked })
              }
              className="mr-2"
            />
            Notificado
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Registro"}
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
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Notificado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCorrespondencia.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">
                  {users.find((u) => u.id === item.usuario_id)?.name || "N/A"}
                </td>
                <td className="px-4 py-2">{item.tipo_correspondencia}</td>
                <td className="px-4 py-2">{item.descripcion}</td>
                <td className="px-4 py-2">{item.fecha_recepcion}</td>
                <td className="px-4 py-2">{item.estado}</td>
                <td className="px-4 py-2">{item.notificado ? "Sí" : "No"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

export default Correspondencia;
