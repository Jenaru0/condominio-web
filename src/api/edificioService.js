import axios from "axios";

const API_URL = "http://localhost:5001/api/edificios"; // Asegúrate de usar el puerto correcto


export const listarEdificios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

export const crearEdificio = async (edificio) => {
  const response = await axios.post(API_URL, edificio);
  return response.data;
}

export const editarEdificio = async (id, edificio) => {
  const response = await axios.put(`${API_URL}/${id}`, edificio);
  return response.data;
}

export const eliminarEdificio = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}