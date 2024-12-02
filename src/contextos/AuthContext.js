import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginService } from "../api/authService";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar la carga
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const fetchUser = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/auth/me");
          setUser(response.data.user); // Asegurarse de usar `.user` para obtener la información del usuario
        } catch (error) {
          console.error("Error al restaurar la sesión del usuario:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    } else {
      setIsLoading(false); // Termina la carga si no hay token
    }
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true); // Iniciar carga
      const { token, user } = await loginService(email, password);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false); // Terminar carga después del intento de login
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext };
