import React, { useEffect, useState } from "react";

const RolesPermisos = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    name: "",
    assignedPermissions: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 5; // Número de roles por página

  useEffect(() => {
    // Mock data para roles y permisos
    const mockRoles = [
      {
        id: 1,
        name: "Administrador",
        assignedPermissions: ["crear", "editar", "eliminar"],
      },
      { id: 2, name: "Seguridad", assignedPermissions: ["ver", "editar"] },
      { id: 3, name: "Mantenimiento", assignedPermissions: ["ver"] },
      { id: 4, name: "Residente", assignedPermissions: ["ver"] },
      { id: 5, name: "Propietario", assignedPermissions: ["ver", "editar"] },
      { id: 6, name: "Inquilino", assignedPermissions: ["ver"] },
    ];

    const mockPermissions = ["crear", "editar", "eliminar", "ver"];

    // Simular carga de datos
    setTimeout(() => {
      setRoles(mockRoles);
      setPermissions(mockPermissions);
      setLoading(false);
    }, 1000);
  }, []);

  // Manejar el envío del formulario (crear/editar rol)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Editar rol existente
      setRoles((prev) =>
        prev.map((role) => (role.id === form.id ? { ...form } : role))
      );
      alert("Rol actualizado con éxito");
    } else {
      // Crear nuevo rol
      const newRole = { ...form, id: roles.length + 1 }; // Generar ID ficticio
      setRoles((prev) => [...prev, newRole]);
      alert("Rol creado con éxito");
    }

    resetForm();
  };

  // Manejar la edición de un rol
  const handleEdit = (role) => {
    setForm(role);
    setIsEditing(true);
  };

  // Manejar la eliminación de un rol
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este rol?")) {
      setRoles((prev) => prev.filter((role) => role.id !== id));
      alert("Rol eliminado con éxito");
    }
  };

  // Reiniciar el formulario
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      assignedPermissions: [],
    });
    setIsEditing(false);
  };

  // Filtrar roles por búsqueda
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando lista de roles...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Roles y Permisos
      </h1>

      {/* Buscador */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar roles..."
          className="border rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Formulario de Creación/Edición */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Rol" : "Crear Nuevo Rol"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nombre del Rol"
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-sm font-semibold mb-2">Permisos Asignados</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {permissions.map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.assignedPermissions.includes(permission)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setForm((prev) => ({
                        ...prev,
                        assignedPermissions: checked
                          ? [...prev.assignedPermissions, permission]
                          : prev.assignedPermissions.filter(
                              (p) => p !== permission
                            ),
                      }));
                    }}
                    className="mr-2"
                  />
                  {permission}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {isEditing ? "Guardar Cambios" : "Crear Rol"}
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

      {/* Tabla de Roles */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre del Rol</th>
              <th className="px-4 py-2 text-left">Permisos</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-4 py-2">{role.id}</td>
                <td className="px-4 py-2">{role.name}</td>
                <td className="px-4 py-2">
                  {role.assignedPermissions.map((perm) => (
                    <span
                      key={perm}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs mr-1"
                    >
                      {perm}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredRoles.length / rolesPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } mx-1`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesPermisos;
