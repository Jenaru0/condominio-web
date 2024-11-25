import React, { useState } from "react";
import { FaBell, FaSearch, FaFileExport, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ControlMonitoreoAccesos = () => {
  // Datos de ejemplo para la tabla
  const [accesos] = useState([
    {
      tipo: "Residente",
      nombre: "Juan Pérez",
      invitadoPor: "-",
      entrada: "05/10/2024 - 08:30 AM",
      salida: "05/10/2024 - 06:00 PM",
      ubicacion: "Edificio A, Piso 3, Dpto 301",
    },
    {
      tipo: "Visitante",
      nombre: "María López",
      invitadoPor: "Juan Pérez",
      entrada: "05/10/2024 - 09:15 AM",
      salida: "05/10/2024 - 11:00 PM",
      ubicacion: "Edificio B, Piso 2, Dpto 203",
    },
    {
      tipo: "Visitante",
      nombre: "Pedro Ramirez",
      invitadoPor: "Ana García",
      entrada: "05/10/2024 - 10:00 AM",
      salida: "Salida pendiente",
      ubicacion: "Edificio C, Piso 1, Dpto 105",
    },
    {
      tipo: "Residente",
      nombre: "Ana García",
      invitadoPor: "-",
      entrada: "05/10/2024 - 07:45 AM",
      salida: "05/10/2024 - 05:30 PM",
      ubicacion: "Edificio C, Piso 1, Dpto 105",
    },
  ]);

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Control y Monitoreo de Accesos</h1>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          <FaBell className="text-xl mr-2" /> Notificaciones
        </button>
      </header>

      {/* Filtros */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="border border-gray-300 rounded-lg p-2"
          />
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Todos los Accesos</option>
            <option value="entradas">Entradas</option>
            <option value="salidas">Salidas</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2"
          />
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Entradas y Salidas</option>
            <option value="entradas">Entradas</option>
            <option value="salidas">Salidas</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Todos los Edificios</option>
            <option value="edificio-a">Edificio A</option>
            <option value="edificio-b">Edificio B</option>
            <option value="edificio-c">Edificio C</option>
          </select>
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
              <th className="border border-gray-300 p-3 text-left">Tipo</th>
              <th className="border border-gray-300 p-3 text-left">Nombre</th>
              <th className="border border-gray-300 p-3 text-left">Invitado por</th>
              <th className="border border-gray-300 p-3 text-left">Fecha y Hora de Entrada</th>
              <th className="border border-gray-300 p-3 text-left">Fecha y Hora de Salida</th>
              <th className="border border-gray-300 p-3 text-left">Edificio/Piso/Departamento</th>
              <th className="border border-gray-300 p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accesos.map((acceso, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{acceso.tipo}</td>
                <td className="border border-gray-300 p-3">{acceso.nombre}</td>
                <td className="border border-gray-300 p-3">{acceso.invitadoPor}</td>
                <td className="border border-gray-300 p-3">{acceso.entrada}</td>
                <td className="border border-gray-300 p-3">{acceso.salida}</td>
                <td className="border border-gray-300 p-3">{acceso.ubicacion}</td>
                <td className="border border-gray-300 p-3 text-center">
                  <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-400">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Paginación y Botones */}
      <footer className="w-full max-w-screen-xl mt-6 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="bg-gray-300 py-2 px-3 rounded hover:bg-gray-400">
            <FaChevronLeft />
          </button>
          <span>Página 1 de 20</span>
          <button className="bg-gray-300 py-2 px-3 rounded hover:bg-gray-400">
            <FaChevronRight />
          </button>
        </div>
        <div className="flex gap-4">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 flex items-center gap-2">
            Generar Reporte
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 flex items-center gap-2">
            <FaFileExport /> Exportar Datos
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ControlMonitoreoAccesos;
