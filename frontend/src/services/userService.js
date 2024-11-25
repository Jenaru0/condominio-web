import axios from 'axios';

const API_URL = 'http://localhost:5001/api/usuarios';

export const getUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createUser = async (userData) => {
  const cleanedData = { ...userData };

  // Eliminar `habitacion_id` y `propietario_asociado` si no son aplicables
  if (cleanedData.rol !== 'residente' && cleanedData.rol !== 'inquilino') {
    delete cleanedData.habitacion_id;
  }
  if (cleanedData.rol !== 'inquilino') {
    delete cleanedData.propietario_asociado;
  }

  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, cleanedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (id, userData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};