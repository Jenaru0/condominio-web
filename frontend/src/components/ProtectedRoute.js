import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Cambiado a una importación nombrada
// Removemos axios ya que no se usa en este componente

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirige a la página de inicio de sesión si no hay token
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  try {
    // Decodificar y verificar la expiración del token
    const decodedToken = jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      // Eliminar token y redirigir si está expirado
      localStorage.removeItem('token');
      return <Navigate to="/login" state={{ from: window.location.pathname }} />;
    }
  } catch (error) {
    console.error("Token no válido", error);
    // Eliminar token y redirigir si no es válido
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  // Renderiza el contenido si el token es válido
  return children;
};

export default ProtectedRoute;
