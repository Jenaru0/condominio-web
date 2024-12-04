import React, { useState, useEffect } from "react";
//mport axios from "axios";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    usuario_id: "",
    area_comun: "",
    fecha_reserva: "",
    hora_inicio: "",
    hora_fin: "",
    estado: "Pendiente",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    usuario_id: "",
    area_comun: "",
    estado: "",
  });

  useEffect(() => {
    // Mock data para reservas, usuarios y áreas comunes
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

    // Simular carga de datos
    setTimeout(() => {
      setReservas(mockReservas);
      setUsers(mockUsers);
      setAreas(mockAreas);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar reserva existente
      const updatedReservas = reservas.map((reserva) =>
        reserva.id === form.id ? form : reserva
      );
      setReservas(updatedReservas);
      alert("Reserva actualizada con éxito");
    } else {
      // Crear nueva reserva
      const newReserva = { ...form, id: reservas.length + 1 };
      setReservas([...reservas, newReserva]);
      alert("Reserva creada con éxito");
    }

    resetForm();
  };

  const handleEdit = (reserva) => {
    setForm(reserva);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      setReservas(reservas.filter((reserva) => reserva.id !== id));
      alert("Reserva eliminada con éxito");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      usuario_id: "",
      area_comun: "",
      fecha_reserva: "",
      hora_inicio: "",
      hora_fin: "",
      estado: "Pendiente",
    });
    setIsEditing(false);
  };

  // Filtros aplicados
  const filteredReservas = reservas.filter((reserva) => {
    const matchesUsuario =
      !filters.usuario_id || reserva.usuario_id === filters.usuario_id;
    const matchesArea =
      !filters.area_comun || reserva.area_comun === filters.area_comun;
    const matchesEstado = !filters.estado || reserva.estado === filters.estado;

    const user = users.find((u) => u.id === reserva.usuario_id);
    const matchesSearch =
      reserva.area_comun.toLowerCase().includes(search.toLowerCase()) ||
      (user?.name.toLowerCase().includes(search.toLowerCase()) ?? false);

    return matchesUsuario && matchesArea && matchesEstado && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando reservas...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Reservas de Áreas Comunes
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
        <select
          value={filters.area_comun}
          onChange={(e) =>
            setFilters({ ...filters, area_comun: e.target.value })
          }
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Área Común (Todas)</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <select
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Estado (Todos)</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por área o usuario..."
          className="border rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Formulario */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Reserva" : "Crear Nueva Reserva"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
            value={form.area_comun}
            onChange={(e) => setForm({ ...form, area_comun: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">Seleccionar Área Común</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.fecha_reserva}
            onChange={(e) =>
              setForm({ ...form, fecha_reserva: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="time"
            value={form.hora_inicio}
            onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="time"
            value={form.hora_fin}
            onChange={(e) => setForm({ ...form, hora_fin: e.target.value })}
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
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Reserva"}
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
              <th className="px-4 py-2 text-left">Área Común</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Hora Inicio</th>
              <th className="px-4 py-2 text-left">Hora Fin</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservas.map((reserva) => (
              <tr key={reserva.id} className="border-t">
                <td className="px-4 py-2">
                  {users.find((user) => user.id === reserva.usuario_id)?.name ||
                    "N/A"}
                </td>
                <td className="px-4 py-2">{reserva.area_comun}</td>
                <td className="px-4 py-2">{reserva.fecha_reserva}</td>
                <td className="px-4 py-2">{reserva.hora_inicio}</td>
                <td className="px-4 py-2">{reserva.hora_fin}</td>
                <td className="px-4 py-2">{reserva.estado}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(reserva)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(reserva.id)}
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

export default Reservas;
