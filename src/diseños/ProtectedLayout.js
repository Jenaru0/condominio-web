// ProtectedLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../componentes/diseño/Sidebar";
import Header from "../componentes/diseño/Header";

const ProtectedLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Funciones para manejar la expansión y colapso del sidebar
  const handleSidebarExpand = () => {
    setCollapsed(false);
  };

  const handleSidebarCollapse = () => {
    setCollapsed(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Pasamos las props necesarias al Sidebar */}
      <Sidebar
        onExpand={handleSidebarExpand}
        onCollapse={handleSidebarCollapse}
        collapsed={collapsed}
      />

      {/* Contenedor principal que respeta el espacio dinámico del Sidebar */}
      <div
        className={`flex-grow flex flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header /> {/* Header fijo */}
        <main className="flex-grow p-4 mt-16 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
