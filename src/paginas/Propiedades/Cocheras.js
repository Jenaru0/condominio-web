import React, { useEffect, useState } from "react";

const Cocheras = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    numero: "",
    nivel: "",
    edificio: "",
    estado: "Disponible", // Por defecto
    usuario_asignado: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data para cocheras y usuarios
    const mockParkingSpaces = [
      {
        id: 1,
        numero: "C101",
        nivel: "Subterráneo A",
        edificio: "Edificio A",
        estado: "Disponible",
        usuario_asignado: "",
      },
      {
        id: 2,
        numero: "C102",
        nivel: "Subterráneo B",
        edificio: "Edificio B",
        estado: "Asignado",
        usuario_asignado: "101",
      },
    ];

    const mockUsers = [
      { id: "101", name: "Juan Pérez", rol: "residente" },
      { id: "102", name: "María López", rol: "residente" },
    ];

    // Simular carga de datos desde API
    setTimeout(() => {
      setParkingSpaces(mockParkingSpaces);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar cochera existente
      const updatedParkingSpaces = parkingSpaces.map((space) =>
        space.id === form.id ? form : space
      );
      setParkingSpaces(updatedParkingSpaces);
      alert("Cochera actualizada con éxito");
    } else {
      // Crear nueva cochera
      const newParkingSpace = { ...form, id: parkingSpaces.length + 1 };
      setParkingSpaces([...parkingSpaces, newParkingSpace]);
      alert("Cochera creada con éxito");
    }

    resetForm();
  };

  const handleEdit = (parkingSpace) => {
    setForm(parkingSpace);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cochera?")) {
      setParkingSpaces(parkingSpaces.filter((space) => space.id !== id));
      alert("Cochera eliminada con éxito");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      numero: "",
      nivel: "",
      edificio: "",
      estado: "Disponible",
      usuario_asignado: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando lista de cocheras...</p>
      </div>
    );
  }

  // Filtrar cocheras por búsqueda
  const filteredParkingSpaces = parkingSpaces.filter(
    (space) =>
      space.numero.toLowerCase().includes(search.toLowerCase()) ||
      space.nivel.toLowerCase().includes(search.toLowerCase()) ||
      space.edificio.toLowerCase().includes(search.toLowerCase()) ||
      users
        .find((user) => user.id === space.usuario_asignado)
        ?.name.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cocheras</h1>

      {/* Buscador */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar cocheras..."
          className="border rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Formulario de Creación/Edición */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Cochera" : "Crear Nueva Cochera"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            placeholder="Número de Cochera"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.nivel}
            onChange={(e) => setForm({ ...form, nivel: e.target.value })}
            placeholder="Nivel"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.edificio}
            onChange={(e) => setForm({ ...form, edificio: e.target.value })}
            placeholder="Edificio"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="Disponible">Disponible</option>
            <option value="Asignado">Asignado</option>
          </select>
          <select
            value={form.usuario_asignado}
            onChange={(e) =>
              setForm({ ...form, usuario_asignado: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
            disabled={form.estado === "Disponible"}
          >
            <option value="">Seleccionar Usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Cochera"}
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

      {/* Tabla de Cocheras */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Número</th>
              <th className="px-4 py-2 text-left">Nivel</th>
              <th className="px-4 py-2 text-left">Edificio</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Usuario Asignado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredParkingSpaces.map((space) => (
              <tr key={space.id} className="border-t">
                <td className="px-4 py-2">{space.numero}</td>
                <td className="px-4 py-2">{space.nivel}</td>
                <td className="px-4 py-2">{space.edificio}</td>
                <td className="px-4 py-2">{space.estado}</td>
                <td className="px-4 py-2">
                  {users.find((user) => user.id === space.usuario_asignado)
                    ?.name || "N/A"}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(space)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(space.id)}
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

export default Cocheras;
