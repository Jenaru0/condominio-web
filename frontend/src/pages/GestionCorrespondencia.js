import React, { useState } from "react";
import { FaPlus, FaSearch, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const GestionCorrespondencia = () => {
  // Datos para la tabla
  const [correspondencia, setCorrespondencia] = useState([
    {
      id: 1,
      residente: "Juan Pérez",
      tipo: "Paquete",
      fechaLlegada: "2024-10-05",
      estado: "Pendiente",
      estadoColor: "bg-red-500",
    },
    {
      id: 2,
      residente: "María García",
      tipo: "Carta",
      fechaLlegada: "2024-10-04",
      estado: "Recogido",
      estadoColor: "bg-green-500",
    },
  ]);

  const handleEliminar = (id) => {
    const nuevoListado = correspondencia.filter((item) => item.id !== id);
    setCorrespondencia(nuevoListado);
    alert("Correspondencia eliminada");
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Correspondencia</h1>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          🔔 Notificaciones
        </button>
      </header>

      {/* Filtros */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 flex items-center gap-2">
            <FaPlus /> Añadir Correspondencia
          </button>
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Estado</option>
            <option value="pendiente">Pendiente</option>
            <option value="recogido">Recogido</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Tipo de correspondencia</option>
            <option value="paquete">Paquete</option>
            <option value="carta">Carta</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Buscar por residente"
            className="border border-gray-300 rounded-lg p-2"
          />
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 flex items-center gap-2">
            <FaSearch /> Buscar
          </button>
        </div>
      </section>

      {/* Tabla */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Residente</th>
              <th className="border border-gray-300 p-3 text-left">
                Tipo de correspondencia
              </th>
              <th className="border border-gray-300 p-3 text-left">
                Fecha de Llegada
              </th>
              <th className="border border-gray-300 p-3 text-left">Estado</th>
              <th className="border border-gray-300 p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {correspondencia.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{item.residente}</td>
                <td className="border border-gray-300 p-3">{item.tipo}</td>
                <td className="border border-gray-300 p-3">{item.fechaLlegada}</td>
                <td className="border border-gray-300 p-3 text-center">
                  <span
                    className={`text-white py-1 px-3 rounded ${item.estadoColor}`}
                  >
                    {item.estado}
                  </span>
                </td>
                <td className="border border-gray-300 p-3 text-center flex gap-2 justify-center">
                  <button
                    className="bg-green-500 text-white py-2 px-2 rounded hover:bg-green-400 flex items-center"
                    title="Marcar como Recogido"
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-400 flex items-center"
                    title="Eliminar"
                    onClick={() => handleEliminar(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GestionCorrespondencia;
