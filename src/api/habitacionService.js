import axios from "axios";

const API_URL = "http://localhost:5001/api/habitaciones"; // Cambia según tu configuración

// Obtener todas las habitaciones
export const listarHabitaciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

// Crear una nueva habitación
export const crearHabitacion = async (habitacion) => {
  const response = await axios.post(API_URL, habitacion);
  return response.data;
}

// Editar una habitación existente
export const editarHabitacion = async (id, habitacion) => {
  const response = await axios.put(`${API_URL}/${id}`, habitacion);
  return response.data;
}

// Eliminar una habitación
export const eliminarHabitacion = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
