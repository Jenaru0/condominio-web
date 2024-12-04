import React, { useEffect, useState } from "react";

const Empleados = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    name: "",
    dni: "",
    email: "",
    phone: "",
    role: "", // Ejemplo: "seguridad", "mantenimiento", "administrador"
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Datos ficticios (mock data)
    const mockEmployees = [
      {
        id: 1,
        name: "Pedro Sánchez",
        dni: "74851021",
        email: "pedro.sanchez@example.com",
        phone: "+51 987 654 123",
        role: "seguridad",
      },
      {
        id: 2,
        name: "Laura Ramírez",
        dni: "75862031",
        email: "laura.ramirez@example.com",
        phone: "+51 987 123 654",
        role: "mantenimiento",
      },
    ];

    // Simular carga de datos
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []);

  // Manejar el envío del formulario (crear/editar empleado)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Editar empleado existente
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === form.id ? { ...form } : employee
        )
      );
    } else {
      // Crear nuevo empleado
      const newEmployee = { ...form, id: employees.length + 1 }; // Generar ID ficticio
      setEmployees((prev) => [...prev, newEmployee]);
    }

    resetForm();
  };

  // Manejar la edición de un empleado
  const handleEdit = (employee) => {
    setForm(employee);
    setIsEditing(true);
  };

  // Manejar la eliminación de un empleado
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
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
      role: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando lista de empleados...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Empleados</h1>

      {/* Formulario de Creación/Edición */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Empleado" : "Crear Nuevo Empleado"}
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
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">Seleccionar Rol</option>
            <option value="seguridad">Seguridad</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="administrador">Administrador</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {isEditing ? "Guardar Cambios" : "Crear Empleado"}
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

      {/* Tabla de Empleados */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Correo Electrónico</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Rol</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="px-4 py-2">{employee.id}</td>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.dni}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.role}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
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

export default Empleados;
