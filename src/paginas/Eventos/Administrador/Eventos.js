import React, { useState, useEffect } from "react";

// Componente modular para formulario de eventos
const EventForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombre_evento: "",
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    estado: "Programado",
    asistentes_confirmados: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: null,
      nombre_evento: "",
      fecha: "",
      hora_inicio: "",
      hora_fin: "",
      estado: "Programado",
      asistentes_confirmados: 0,
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Editar Evento" : "Crear Nuevo Evento"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <input
          type="text"
          value={formData.nombre_evento}
          onChange={(e) =>
            setFormData({ ...formData, nombre_evento: e.target.value })
          }
          placeholder="Nombre del evento"
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <input
          type="date"
          value={formData.fecha}
          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <input
          type="time"
          value={formData.hora_inicio}
          onChange={(e) =>
            setFormData({ ...formData, hora_inicio: e.target.value })
          }
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <input
          type="time"
          value={formData.hora_fin}
          onChange={(e) =>
            setFormData({ ...formData, hora_fin: e.target.value })
          }
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
        <select
          value={formData.estado}
          onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
          required
        >
          <option value="Programado">Programado</option>
          <option value="En curso">En curso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <input
          type="number"
          value={formData.asistentes_confirmados}
          onChange={(e) =>
            setFormData({
              ...formData,
              asistentes_confirmados: Number(e.target.value),
            })
          }
          placeholder="Asistentes confirmados"
          className="border rounded-lg px-4 py-2 w-full"
          min="0"
        />
        <div className="col-span-full flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Evento"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Componente principal de eventos
const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    estado: "",
  });

  useEffect(() => {
    // Mock data de eventos
    const mockEventos = [
      {
        id: 1,
        nombre_evento: "Reunión General",
        fecha: "2023-12-15",
        hora_inicio: "18:00",
        hora_fin: "20:00",
        estado: "Programado",
        asistentes_confirmados: 25,
      },
      {
        id: 2,
        nombre_evento: "Taller de Seguridad",
        fecha: "2023-12-20",
        hora_inicio: "10:00",
        hora_fin: "12:00",
        estado: "En curso",
        asistentes_confirmados: 15,
      },
    ];

    setEventos(mockEventos);
    setFilteredEventos(mockEventos);
  }, []);

  useEffect(() => {
    // Filtros aplicados
    const filtered = eventos.filter((evento) => {
      const matchesEstado = !filters.estado || evento.estado === filters.estado;
      const matchesSearch = evento.nombre_evento
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesEstado && matchesSearch;
    });
    setFilteredEventos(filtered);
  }, [filters, search, eventos]);

  const handleFormSubmit = (data) => {
    if (isEditing) {
      setEventos((prev) =>
        prev.map((evento) => (evento.id === data.id ? data : evento))
      );
      alert("Evento actualizado con éxito");
    } else {
      setEventos((prev) => [...prev, { ...data, id: prev.length + 1 }]);
      alert("Evento creado con éxito");
    }
    resetForm();
  };

  const handleEdit = (evento) => {
    setFormData(evento);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      setEventos((prev) => prev.filter((evento) => evento.id !== id));
      alert("Evento eliminado con éxito");
    }
  };

  const resetForm = () => {
    setFormData(null);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gestión de Eventos
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre del evento..."
          className="border rounded-lg px-4 py-2 w-full"
        />
        <select
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Estado (Todos)</option>
          <option value="Programado">Programado</option>
          <option value="En curso">En curso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </div>

      {/* Formulario */}
      <EventForm
        onSubmit={handleFormSubmit}
        initialData={formData}
        isEditing={isEditing}
        onCancel={resetForm}
      />

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Hora Inicio</th>
              <th className="px-4 py-2 text-left">Hora Fin</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Asistentes</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEventos.map((evento) => (
              <tr key={evento.id} className="border-t">
                <td className="px-4 py-2">{evento.nombre_evento}</td>
                <td className="px-4 py-2">{evento.fecha}</td>
                <td className="px-4 py-2">{evento.hora_inicio}</td>
                <td className="px-4 py-2">{evento.hora_fin}</td>
                <td className="px-4 py-2">{evento.estado}</td>
                <td className="px-4 py-2">{evento.asistentes_confirmados}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(evento)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(evento.id)}
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

export default Eventos;
