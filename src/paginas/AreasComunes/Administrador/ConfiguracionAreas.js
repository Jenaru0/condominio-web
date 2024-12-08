import React, { useEffect, useState } from "react";
//import axios from "axios";

const ConfiguracionAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    capacidad_maxima: "",
    ubicacion: "",
    horario_disponible: "",
    estado: "Activo",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    estado: "",
    capacidad: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data para las áreas comunes
    const mockAreas = [
      {
        id: 1,
        nombre: "Piscina",
        capacidad_maxima: 20,
        ubicacion: "Edificio A",
        horario_disponible: "9:00 AM - 6:00 PM",
        estado: "Activo",
      },
      {
        id: 2,
        nombre: "Sala de Eventos",
        capacidad_maxima: 50,
        ubicacion: "Edificio B",
        horario_disponible: "10:00 AM - 8:00 PM",
        estado: "Activo",
      },
      {
        id: 3,
        nombre: "Gimnasio",
        capacidad_maxima: 15,
        ubicacion: "Edificio A",
        horario_disponible: "6:00 AM - 10:00 PM",
        estado: "Inactivo",
      },
    ];

    // Simular carga de datos
    setTimeout(() => {
      setAreas(mockAreas);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar área común existente
      const updatedAreas = areas.map((area) =>
        area.id === form.id ? form : area
      );
      setAreas(updatedAreas);
      alert("Área común actualizada con éxito");
    } else {
      // Crear nueva área común
      const newArea = { ...form, id: areas.length + 1 };
      setAreas([...areas, newArea]);
      alert("Área común creada con éxito");
    }

    resetForm();
  };

  const handleEdit = (area) => {
    setForm(area);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta área?")) {
      setAreas(areas.filter((area) => area.id !== id));
      alert("Área eliminada con éxito");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      nombre: "",
      capacidad_maxima: "",
      ubicacion: "",
      horario_disponible: "",
      estado: "Activo",
    });
    setIsEditing(false);
  };

  // Filtros aplicados
  const filteredAreas = areas.filter((area) => {
    const matchesEstado = !filters.estado || area.estado === filters.estado;
    const matchesCapacidad =
      !filters.capacidad || area.capacidad_maxima >= Number(filters.capacidad);
    const matchesSearch = area.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesEstado && matchesCapacidad && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando áreas comunes...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Configuración de Áreas Comunes
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Estado (Todos)</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <input
          type="number"
          value={filters.capacidad}
          onChange={(e) =>
            setFilters({ ...filters, capacidad: e.target.value })
          }
          placeholder="Capacidad mínima"
          className="border rounded-lg px-4 py-2 w-full"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="border rounded-lg px-4 py-2 w-full"
        />
      </div>

      {/* Formulario */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Área Común" : "Crear Nueva Área Común"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre del área"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="number"
            value={form.capacidad_maxima}
            onChange={(e) =>
              setForm({ ...form, capacidad_maxima: e.target.value })
            }
            placeholder="Capacidad Máxima"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.ubicacion}
            onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
            placeholder="Ubicación"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.horario_disponible}
            onChange={(e) =>
              setForm({ ...form, horario_disponible: e.target.value })
            }
            placeholder="Horario Disponible (e.g., 9:00 AM - 6:00 PM)"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Área"}
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
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Capacidad</th>
              <th className="px-4 py-2 text-left">Ubicación</th>
              <th className="px-4 py-2 text-left">Horario</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAreas.map((area) => (
              <tr key={area.id} className="border-t">
                <td className="px-4 py-2">{area.nombre}</td>
                <td className="px-4 py-2">{area.capacidad_maxima}</td>
                <td className="px-4 py-2">{area.ubicacion}</td>
                <td className="px-4 py-2">{area.horario_disponible}</td>
                <td className="px-4 py-2">{area.estado}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(area)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(area.id)}
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

export default ConfiguracionAreas;
