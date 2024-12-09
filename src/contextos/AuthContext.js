import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginService } from "../api/authService"; // Servicio de login
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Manejar el estado de carga
  const [error, setError] = useState(null); // Manejar errores

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const fetchUser = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/auth/me");
          setUser(response.data.user); // Usuario autenticado
        } catch (error) {
          console.error("Error al restaurar la sesión:", error);
          logout(); // Cierra sesión si el token no es válido
        } finally {
          setIsLoading(false); // Termina el estado de carga
        }
      };
      fetchUser();
    } else {
      setIsLoading(false); // Termina el estado de carga si no hay token
    }
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null); // Limpiar errores previos
      const { token, user } = await loginService(email, password);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError(error.response?.data?.message || "Error en el inicio de sesión");
      throw error; // Para que el componente que llama pueda manejarlo
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setError(null); // Limpiar errores al cerrar sesión
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/refresh"
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      logout(); // Si falla, cierra sesión
    }
  };

  // Interceptor para manejar errores 401 y renovar tokens automáticamente
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          await refreshToken();
          return axios(error.config); // Reintentar solicitud original
        } catch (refreshError) {
          console.error("No se pudo refrescar el token:", refreshError);
          throw refreshError;
        }
      }
      throw error;
    }
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
