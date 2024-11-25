import React from "react";
import { FaPlus, FaSearch, FaTrash, FaEdit } from "react-icons/fa";

const GestinDeCocheras = () => {
  const data = [
    { id: "C101", number: "101", location: "Subterráneo-Edificio A", status: "Disponible", assignedTo: "-" },
    { id: "C102", number: "102", location: "Subterráneo-Edificio A", status: "Ocupada", assignedTo: "Juan Pérez" },
    { id: "C103", number: "103", location: "Subterráneo-Edificio A", status: "Disponible", assignedTo: "-" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Título y Botón Principal */}
      <div className="flex justify-between items-center p-8 bg-blue-800 text-white">
        <h1 className="text-2xl font-bold">Gestión de Cocheras</h1>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
          <FaPlus className="mr-2" />
          Asignar Nueva Cochera
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 bg-white shadow-md">
        <select className="p-2 border rounded">
          <option>Ubicación</option>
          <option>Subterráneo</option>
          <option>Superficie</option>
        </select>
        <select className="p-2 border rounded">
          <option>Estado</option>
          <option>Disponible</option>
          <option>Ocupada</option>
        </select>
        <div className="flex items-center border rounded p-2">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por ID, número o propietario"
            className="w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="p-8">
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="w-full text-left">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-3">ID Cochera</th>
                <th className="p-3">Número de Cochera</th>
                <th className="p-3">Ubicación</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Asignada a</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.number}</td>
                  <td className="p-3">{item.location}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-white rounded ${
                        item.status === "Disponible"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">{item.assignedTo}</td>
                  <td className="p-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-400">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-400">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestinDeCocheras;
