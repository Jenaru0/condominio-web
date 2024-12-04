import React, { useEffect, useState } from "react";

const Inquilinos = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    name: "",
    dni: "",
    email: "",
    phone: "",
    associatedOwner: "",
    building: "",
    floor: "",
    apartment: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Datos ficticios (mock data)
    const mockTenants = [
      {
        id: 1,
        name: "Carlos Gómez",
        dni: "85476021",
        email: "carlos.gomez@example.com",
        phone: "+51 987 123 456",
        associatedOwner: "Juan Pérez",
        building: "Edificio A",
        floor: "4",
        apartment: "401",
      },
      {
        id: 2,
        name: "Ana López",
        dni: "85476111",
        email: "ana.lopez@example.com",
        phone: "+51 987 654 321",
        associatedOwner: "María López",
        building: "Edificio B",
        floor: "2",
        apartment: "202",
      },
    ];

    // Simular carga de datos
    setTimeout(() => {
      setTenants(mockTenants);
      setLoading(false);
    }, 1000);
  }, []);

  // Manejar el envío del formulario (crear/editar inquilino)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Editar inquilino existente
      setTenants((prev) =>
        prev.map((tenant) => (tenant.id === form.id ? { ...form } : tenant))
      );
    } else {
      // Crear nuevo inquilino
      const newTenant = { ...form, id: tenants.length + 1 }; // Generar ID ficticio
      setTenants((prev) => [...prev, newTenant]);
    }

    resetForm();
  };

  // Manejar la edición de un inquilino
  const handleEdit = (tenant) => {
    setForm(tenant);
    setIsEditing(true);
  };

  // Manejar la eliminación de un inquilino
  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este inquilino?")
    ) {
      setTenants((prev) => prev.filter((tenant) => tenant.id !== id));
    }
  };

  // Reiniciar el formulario
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      dni: "",
      email: "",
      phone: "",
      associatedOwner: "",
      building: "",
      floor: "",
      apartment: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando lista de inquilinos...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Inquilinos</h1>

      {/* Formulario de Creación/Edición */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Inquilino" : "Crear Nuevo Inquilino"}
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
            value={form.associatedOwner}
            onChange={(e) =>
              setForm({ ...form, associatedOwner: e.target.value })
            }
            placeholder="Propietario Asociado"
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
              {isEditing ? "Guardar Cambios" : "Crear Inquilino"}
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

      {/* Tabla de Inquilinos */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Correo Electrónico</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Propietario Asociado</th>
              <th className="px-4 py-2 text-left">Edificio</th>
              <th className="px-4 py-2 text-left">Piso</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-t">
                <td className="px-4 py-2">{tenant.id}</td>
                <td className="px-4 py-2">{tenant.name}</td>
                <td className="px-4 py-2">{tenant.dni}</td>
                <td className="px-4 py-2">{tenant.email}</td>
                <td className="px-4 py-2">{tenant.phone}</td>
                <td className="px-4 py-2">{tenant.associatedOwner}</td>
                <td className="px-4 py-2">{tenant.building}</td>
                <td className="px-4 py-2">{tenant.floor}</td>
                <td className="px-4 py-2">{tenant.apartment}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(tenant)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(tenant.id)}
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

export default Inquilinos;
