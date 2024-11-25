import React from "react";

const ReporteCorrespondencia = () => {
  // Datos para la tabla (pueden venir de una API en el futuro)
  const correspondencia = [
    {
      id: "C001",
      residente: "Juan Pérez",
      estado: "Entregado",
      fecha: "2024-10-01",
      estadoColor: "bg-green-500",
    },
    {
      id: "C002",
      residente: "María López",
      estado: "Pendiente de Entrega",
      fecha: "2024-10-02",
      estadoColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reporte de Correspondencia</h1>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          🔔 Notificaciones
        </button>
      </header>

      {/* Filtros */}
      <section className="w-full max-w-screen-xl mt-4 p-4 bg-white shadow-md rounded-lg">
        <div className="flex flex-wrap gap-4">
          <select className="flex-grow border border-gray-300 rounded-lg p-2">
            <option>Buscar por nombre o ID del Reporte</option>
            <option value="all">Todos</option>
          </select>
          <select className="flex-grow border border-gray-300 rounded-lg p-2">
            <option>Todos los Estados</option>
            <option value="entregado">Entregado</option>
            <option value="pendiente">Pendiente de Entrega</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2 flex-shrink"
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2 flex-shrink"
          />
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 flex-shrink-0">
            🔍 Buscar
          </button>
        </div>
      </section>

      {/* Tabla */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">ID Paquete</th>
              <th className="border border-gray-300 p-3 text-left">
                Nombre del Residente
              </th>
              <th className="border border-gray-300 p-3 text-left">Estado</th>
              <th className="border border-gray-300 p-3 text-left">
                Fecha de Recepción
              </th>
            </tr>
          </thead>
          <tbody>
            {correspondencia.map((paquete) => (
              <tr key={paquete.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{paquete.id}</td>
                <td className="border border-gray-300 p-3">{paquete.residente}</td>
                <td className="border border-gray-300 p-3 text-center">
                  <span
                    className={`text-white py-1 px-3 rounded ${paquete.estadoColor}`}
                  >
                    {paquete.estado}
                  </span>
                </td>
                <td className="border border-gray-300 p-3">{paquete.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Botones de Pie de Página */}
      <footer className="w-full max-w-screen-xl mt-6 p-4 flex justify-between">
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 flex items-center">
          📊 Generar Reporte
        </button>
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 flex items-center">
          📥 Exportar Datos
        </button>
      </footer>
    </div>
  );
};

export default ReporteCorrespondencia;
