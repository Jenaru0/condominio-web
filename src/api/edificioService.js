import axios from "axios";

const API_URL = "http://localhost:5001/api/edificios";

export const getEdificios = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener edificios:",
      error.response?.data || error.message
    );
    throw new Error("Error al obtener edificios");
  }
};

export const createEdificio = async (edificioData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, edificioData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear edificio:",
      error.response?.data || error.message
    );
    throw new Error("Error al crear edificio");
  }
};

export const updateEdificio = async (id, edificioData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${id}`, edificioData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar edificio:",
      error.response?.data || error.message
    );
    throw new Error("Error al actualizar edificio");
  }
};

export const deleteEdificio = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar edificio:",
      error.response?.data || error.message
    );
    throw new Error("Error al eliminar edificio");
  }
};
