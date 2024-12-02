import React from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const data = [
  {
    id: "P12345",
    name: "Juan Pérez",
    email: "juan.perez@gmail.com",
    phone: "+51 987 654 321",
    rol: "residente",
    tipo_residente: "propietario",
    associatedOwner: null,
    building: "A",
    floor: 2,
    apartment: 203,
  },
  {
    id: "I67890",
    name: "María García",
    email: "maria.garcia@gmail.com",
    phone: "+51 987 654 322",
    rol: "residente",
    tipo_residente: "inquilino",
    associatedOwner: "Juan Pérez",
    building: "A",
    floor: 2,
    apartment: 203,
  },
];

const ResidentesInquilinos = () => {
  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      {/* Título */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">
          Residentes e Inquilinos
        </h1>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
          <FaPlus className="mr-2" />
          Añadir Nuevo Residente
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <select className="p-2 border rounded">
          <option>Edificio</option>
          <option>Todos</option>
          <option>A</option>
          <option>B</option>
        </select>
        <select className="p-2 border rounded">
          <option>Piso</option>
          <option>Todos</option>
          <option>1</option>
          <option>2</option>
        </select>
        <select className="p-2 border rounded">
          <option>Tipo de Residente</option>
          <option>Todos</option>
          <option>Propietario</option>
          <option>Inquilino</option>
        </select>
      </div>

      {/* Barra de búsqueda */}
      <div className="mt-4">
        <div className="flex items-center border rounded p-2">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por ID, Nombre, Email o Teléfono"
            className="w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Teléfono</th>
                <th className="p-2 text-left">Tipo</th>
                <th className="p-2 text-left">Propietario Asociado</th>
                <th className="p-2 text-left">Edificio</th>
                <th className="p-2 text-left">Piso</th>
                <th className="p-2 text-left">Departamento</th>
                <th className="p-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-2">{row.id}</td>
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.email}</td>
                  <td className="p-2">{row.phone}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        row.type === "Propietario"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="p-2">{row.associatedOwner}</td>
                  <td className="p-2">{row.building}</td>
                  <td className="p-2">{row.floor}</td>
                  <td className="p-2">{row.apartment}</td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:text-blue-400">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-400 ml-2">
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

export default ResidentesInquilinos;
