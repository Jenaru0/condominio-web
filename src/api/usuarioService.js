import axios from "axios";

const API_URL = "http://localhost:5001/api/usuarios";

// Obtener todos los usuarios con filtros opcionales
export const obtenerUsuarios = async (filtros = {}) => {
  try {
    const response = await axios.get(API_URL, { params: filtros });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener usuarios:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Crear un usuario
export const crearUsuario = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Editar un usuario
export const editarUsuario = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(
      "Error al editar usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Listar propietarios
export const listarPropietarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/propietarios`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al listar propietarios:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Listar inquilinos
export const listarInquilinos = async () => {
  try {
    const response = await axios.get(`${API_URL}/inquilinos`); // Usa la ruta directa
    return response.data;
  } catch (error) {
    console.error(
      "Error al listar inquilinos:",
      error.response?.data || error.message
    );
    throw error;
  }
};
