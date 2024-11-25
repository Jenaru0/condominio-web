import React, { createContext, useContext, useState } from 'react';
import { login as loginService } from '../services/authService';

const AuthContext = createContext(); // Definir AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const { token, user } = await loginService(email, password);
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext }; // Exportar AuthContext
