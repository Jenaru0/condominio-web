import axios from "axios";

const API_URL = "http://localhost:5001/api/usuarios";

// Obtener todos los usuarios
export const obtenerUsuarios = async (filtros = {}) => {
  const query = new URLSearchParams(filtros).toString();
  const response = await axios.get(`${API_URL}?${query}`);
  return response.data;
};
