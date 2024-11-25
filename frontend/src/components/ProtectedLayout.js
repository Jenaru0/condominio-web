import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar fijo con espacio reservado */}
      <Sidebar />
      {/* Contenido principal ajustado al lado del Sidebar */}
      <main className="flex-grow p-4 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
