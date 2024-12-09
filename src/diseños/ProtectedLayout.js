// src/diseños/ProtectedLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../componentes/diseño/Sidebar";
import Header from "../componentes/diseño/Header";

const ProtectedLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar collapsed={collapsed} />
            <div
                className={`flex-grow flex flex-col transition-all duration-300 ${
                    collapsed ? "ml-20" : "ml-64"
                }`}
            >
                <Header onToggleSidebar={toggleSidebar} />
                <main className="flex-grow p-4 mt-16 bg-gray-100 overflow-y-auto custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProtectedLayout;
