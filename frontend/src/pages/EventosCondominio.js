import React, { useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt, FaEye, FaBell } from "react-icons/fa";

const EventosCondominio = () => {
  // Datos para la tabla
  const [eventos, setEventos] = useState([
    {
      id: "E0549",
      nombreEvento: "Reunión General de Propietarios",
      fecha: "2024-10-05",
      asistencia: "15 Confirmados",
      estado: "Confirmado",
      estadoColor: "bg-green-500",
    },
    {
      id: "E0550",
      nombreEvento: "Fiesta de Navidad",
      fecha: "2024-12-24",
      asistencia: "10 Confirmados",
      estado: "Pendiente",
      estadoColor: "bg-red-500",
    },
  ]);

  const handleEliminar = (id) => {
    const nuevoListado = eventos.filter((evento) => evento.id !== id);
    setEventos(nuevoListado);
    alert("Evento eliminado");
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Eventos del Condominio</h1>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          <FaBell className="text-xl mr-2" /> Notificaciones
        </button>
      </header>

      {/* Filtros */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 flex items-center gap-2">
            <FaPlus /> Crear Nuevo Evento
          </button>
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Estado</option>
            <option value="confirmado">Confirmado</option>
            <option value="pendiente">Pendiente</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Buscar por nombre del evento"
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
              <th className="border border-gray-300 p-3 text-left">ID Evento</th>
              <th className="border border-gray-300 p-3 text-left">
                Nombre del Evento
              </th>
              <th className="border border-gray-300 p-3 text-left">Fecha</th>
              <th className="border border-gray-300 p-3 text-left">
                Asistencia Confirmada
              </th>
              <th className="border border-gray-300 p-3 text-left">Estado</th>
              <th className="border border-gray-300 p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{evento.id}</td>
                <td className="border border-gray-300 p-3">{evento.nombreEvento}</td>
                <td className="border border-gray-300 p-3">{evento.fecha}</td>
                <td className="border border-gray-300 p-3 flex items-center gap-2">
                  {evento.asistencia} <FaEye className="text-gray-500" />
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <span
                    className={`text-white py-1 px-3 rounded ${evento.estadoColor}`}
                  >
                    {evento.estado}
                  </span>
                </td>
                <td className="border border-gray-300 p-3 text-center flex gap-2 justify-center">
                  <button
                    className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-400 flex items-center"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-400 flex items-center"
                    title="Eliminar"
                    onClick={() => handleEliminar(evento.id)}
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

export default EventosCondominio;
