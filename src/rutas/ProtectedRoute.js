import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contextos/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600">
            Ocurrió un error: {error.message || "Error desconocido"}
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
