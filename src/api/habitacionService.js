import axios from "axios";

const API_URL = "http://localhost:5001/api/habitaciones"; // Cambia según tu configuración

// Obtener todas las habitaciones
export const obtenerHabitaciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crear una habitación
export const crearHabitacion = async (datos) => {
  const response = await axios.post(API_URL, datos);
  return response.data;
};

// Actualizar una habitación
export const actualizarHabitacion = async (id, datos) => {
  const response = await axios.put(`${API_URL}/${id}`, datos);
  return response.data;
};

// Eliminar una habitación
export const eliminarHabitacion = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
