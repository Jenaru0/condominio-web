import React, { useEffect, useState } from "react";

const Propietarios = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    name: "",
    dni: "",
    email: "",
    phone: "",
    building: "",
    floor: "",
    apartment: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Datos ficticios (mock data)
    const mockOwners = [
      {
        id: 1,
        name: "Juan Pérez",
        dni: "74851020",
        email: "juan.perez@example.com",
        phone: "+51 987 654 321",
        building: "Edificio A",
        floor: "3",
        apartment: "302",
      },
      {
        id: 2,
        name: "María López",
        dni: "74852030",
        email: "maria.lopez@example.com",
        phone: "+51 987 654 322",
        building: "Edificio B",
        floor: "5",
        apartment: "504",
      },
    ];

    // Simula un retraso para cargar datos
    setTimeout(() => {
      setOwners(mockOwners);
      setLoading(false);
    }, 1000);
  }, []);

  // Manejar el envío del formulario (crear/editar propietario)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Editar propietario existente
      setOwners((prev) =>
        prev.map((owner) => (owner.id === form.id ? { ...form } : owner))
      );
    } else {
      // Crear nuevo propietario
      const newOwner = { ...form, id: owners.length + 1 }; // Generar ID ficticio
      setOwners((prev) => [...prev, newOwner]);
    }

    // Limpiar formulario y salir del modo edición
    resetForm();
  };

  // Manejar la edición de un propietario
  const handleEdit = (owner) => {
    setForm(owner);
    setIsEditing(true);
  };

  // Manejar la eliminación de un propietario
  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este propietario?")
    ) {
      setOwners((prev) => prev.filter((owner) => owner.id !== id));
    }
  };

  // Reiniciar el formulario y salir del modo edición
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      dni: "",
      email: "",
      phone: "",
      building: "",
      floor: "",
      apartment: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Cargando lista de propietarios...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Propietarios</h1>

      {/* Formulario de Creación/Edición */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Propietario" : "Crear Nuevo Propietario"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nombre"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.dni}
            onChange={(e) => setForm({ ...form, dni: e.target.value })}
            placeholder="DNI"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Correo Electrónico"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Teléfono"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.building}
            onChange={(e) => setForm({ ...form, building: e.target.value })}
            placeholder="Edificio"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.floor}
            onChange={(e) => setForm({ ...form, floor: e.target.value })}
            placeholder="Piso"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            value={form.apartment}
            onChange={(e) => setForm({ ...form, apartment: e.target.value })}
            placeholder="Departamento"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {isEditing ? "Guardar Cambios" : "Crear Propietario"}
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
          </div>
        </form>
      </div>

      {/* Tabla de Propietarios */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Correo Electrónico</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Edificio</th>
              <th className="px-4 py-2 text-left">Piso</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.id} className="border-t">
                <td className="px-4 py-2">{owner.id}</td>
                <td className="px-4 py-2">{owner.name}</td>
                <td className="px-4 py-2">{owner.dni}</td>
                <td className="px-4 py-2">{owner.email}</td>
                <td className="px-4 py-2">{owner.phone}</td>
                <td className="px-4 py-2">{owner.building}</td>
                <td className="px-4 py-2">{owner.floor}</td>
                <td className="px-4 py-2">{owner.apartment}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(owner)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(owner.id)}
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

export default Propietarios;
