import axios from "axios";

const API_URL = "http://localhost:5001/api/habitaciones";

// Obtener habitaciones por ID de edificio
export const getHabitacionesPorEdificio = async (edificioId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/edificio/${edificioId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener habitaciones:",
      error.response?.data || error.message
    );
    throw new Error("Error al obtener habitaciones");
  }
};
