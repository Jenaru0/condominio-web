const baseUrl = "http://localhost:5001/api/usuarios";

// Obtener token de la sesión almacenada
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Asegúrate de que el token se almacene en localStorage al hacer login
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Enviar el token con cada solicitud
  };
};

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }
  return await response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }
  return await response.json();
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }
  return await response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }
};
