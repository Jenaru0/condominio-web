import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => (
  <header className="w-full fixed top-0 left-0 bg-blue-700 text-white h-16 flex items-center justify-between px-6 shadow-md z-10">
    <h2 className="text-xl font-bold">Parques de la Huaca</h2>
    <div className="flex items-center space-x-4">
      <Link
        to="/configuracion"
        className="text-white hover:text-gray-300 transition-all duration-150"
      >
        <FaCog size={24} />
      </Link>

      <Link
        to="/notificaciones"
        className="text-white hover:text-gray-300 transition-all duration-150"
      >
        <FaBell size={24} />
      </Link>
      <Link
        to="/perfil"
        className="text-white hover:text-gray-300 transition-all duration-150"
      >
        <FaUserCircle size={24} />
      </Link>
      <button
        onClick={onLogout}
        className="text-white hover:text-gray-300 transition-all duration-150"
      >
        <FaSignOutAlt size={24} />
      </button>
    </div>
  </header>
);

export default Header;
