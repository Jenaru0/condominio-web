import React, { useEffect, useState } from "react";

const Departamentos = () => {
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    numero: "",
    piso: "",
    edificio_id: "",
    propietario_asociado: "",
    inquilino_asociado: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Datos ficticios para departamentos, edificios y usuarios
    const mockBuildings = [
      { id: "1", nombre: "Edificio A" },
      { id: "2", nombre: "Edificio B" },
    ];

    const mockUsers = [
      { id: "101", name: "Juan Pérez", tipo_residente: "propietario" },
      { id: "102", name: "Carlos Gómez", tipo_residente: "inquilino" },
      { id: "103", name: "María López", tipo_residente: "propietario" },
      { id: "104", name: "Ana López", tipo_residente: "inquilino" },
    ];

    const mockDepartments = [
      {
        id: 1,
        numero: "101",
        piso: 1,
        edificio_id: "1",
        propietario_asociado: "101",
        inquilino_asociado: "102",
      },
      {
        id: 2,
        numero: "202",
        piso: 2,
        edificio_id: "2",
        propietario_asociado: "103",
        inquilino_asociado: "104",
      },
    ];

    // Simular carga de datos
    setTimeout(() => {
      setBuildings(mockBuildings);
      setUsers(mockUsers);
      setDepartments(mockDepartments);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar departamento existente
      const updatedDepartments = departments.map((dep) =>
        dep.id === form.id ? form : dep
      );
      setDepartments(updatedDepartments);
      alert("Departamento actualizado con éxito");
    } else {
      // Crear nuevo departamento
      const newDepartment = { ...form, id: departments.length + 1 };
      setDepartments([...departments, newDepartment]);
      alert("Departamento creado con éxito");
    }

    resetForm();
  };

  const handleEdit = (department) => {
    setForm(department);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este departamento?")
    ) {
      setDepartments(departments.filter((dep) => dep.id !== id));
      alert("Departamento eliminado con éxito");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      numero: "",
      piso: "",
      edificio_id: "",
      propietario_asociado: "",
      inquilino_asociado: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Cargando lista de departamentos...
        </p>
      </div>
    );
  }

  // Filtrar departamentos por búsqueda
  const filteredDepartments = departments.filter(
    (dep) =>
      dep.numero.toLowerCase().includes(search.toLowerCase()) ||
      buildings
        .find((b) => b.id === dep.edificio_id)
        ?.nombre.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Departamentos</h1>

      {/* Buscador */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar departamentos..."
          className="border rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Formulario de Creación/Edición */}
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
            type="text"
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
              <option key={building.id} value={building.id}>
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
            {users
              .filter((user) => user.tipo_residente === "propietario")
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
          <select
            value={form.inquilino_asociado}
            onChange={(e) =>
              setForm({ ...form, inquilino_asociado: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="">Seleccionar Inquilino</option>
            {users
              .filter((user) => user.tipo_residente === "inquilino")
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Guardar Cambios" : "Crear Departamento"}
          </button>
        </form>
      </div>

      {/* Tabla de Departamentos */}
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
            {filteredDepartments.map((department) => (
              <tr key={department.id} className="border-t">
                <td className="px-4 py-2">{department.numero}</td>
                <td className="px-4 py-2">{department.piso}</td>
                <td className="px-4 py-2">
                  {buildings.find((b) => b.id === department.edificio_id)
                    ?.nombre || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {users.find((u) => u.id === department.propietario_asociado)
                    ?.name || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {users.find((u) => u.id === department.inquilino_asociado)
                    ?.name || "N/A"}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(department)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(department.id)}
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

export default Departamentos;
