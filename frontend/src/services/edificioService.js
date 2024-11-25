import axios from 'axios';

const API_URL = 'http://localhost:5001/api/edificios';

export const getEdificios = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createEdificio = async (edificioData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, edificioData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateEdificio = async (id, edificioData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, edificioData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteEdificio = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};