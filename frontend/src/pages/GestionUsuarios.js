import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    telefono: '',
    rol: '',
    habitacion_id: '',
    propietario_asociado: '',
    password: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsers();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...formValues };

    // Validar dinámicamente según el rol
    if (userData.rol === 'residente' || userData.rol === 'inquilino') {
      if (!userData.habitacion_id.trim()) {
        alert('El campo "ID de habitación" es obligatorio para residentes o inquilinos');
        return;
      }
    }

    if (userData.rol === 'inquilino' && !userData.propietario_asociado.trim()) {
      alert('El campo "Propietario asociado" es obligatorio para inquilinos');
      return;
    }

    try {
      if (editingUser) {
        await updateUser(editingUser._id, userData);
        alert('Usuario actualizado exitosamente');
      } else {
        await createUser(userData);
        alert('Usuario creado exitosamente');
      }
      fetchUsuarios();
      resetForm();
    } catch (error) {
      console.error('Error al guardar usuario:', error.response?.data || error.message);
      alert(error.response?.data?.mensaje || 'Error al guardar usuario');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormValues({
      name: user.name,
      email: user.email,
      telefono: user.telefono,
      rol: user.rol,
      habitacion_id: user.habitacion_id || '',
      propietario_asociado: user.propietario_asociado || '',
      password: '',
    });
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      alert('Usuario eliminado exitosamente');
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message);
      alert('Error al eliminar usuario');
    }
  };

  const resetForm = () => {
    setFormValues({
      name: '',
      email: '',
      telefono: '',
      rol: '',
      habitacion_id: '',
      propietario_asociado: '',
      password: '',
    });
    setEditingUser(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Usuarios</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Correo Electrónico"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="telefono"
            value={formValues.telefono}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <select
            name="rol"
            value={formValues.rol}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          >
            <option value="">Seleccionar Rol</option>
            <option value="administrador">Administrador</option>
            <option value="residente">Residente</option>
            <option value="inquilino">Inquilino</option>
            <option value="seguridad">Seguridad</option>
          </select>
          {(formValues.rol === 'residente' || formValues.rol === 'inquilino') && (
            <input
              type="text"
              name="habitacion_id"
              value={formValues.habitacion_id}
              onChange={handleInputChange}
              placeholder="ID de Habitación"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          )}
          {formValues.rol === 'inquilino' && (
            <input
              type="text"
              name="propietario_asociado"
              value={formValues.propietario_asociado}
              onChange={handleInputChange}
              placeholder="ID del Propietario Asociado"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          )}
          {!editingUser && (
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        {usuarios.map((usuario) => (
          <li
            key={usuario._id}
            className="flex justify-between items-center border-b py-2 last:border-b-0"
          >
            <span>{`${usuario.name} - ${usuario.email} - ${usuario.rol}`}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditUser(usuario)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteUser(usuario._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionUsuarios;
