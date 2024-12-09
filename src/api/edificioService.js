import axios from "axios";

const API_URL = "http://localhost:5001/api/edificios"; // Asegúrate de usar el puerto correcto

// Obtener todos los edificios
export const obtenerEdificios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crear un edificio (opcional)
export const crearEdificio = async (datos) => {
  const response = await axios.post(API_URL, datos);
  return response.data;
};

// Actualizar y eliminar edificios si es necesario...
