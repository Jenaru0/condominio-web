import React from "react";

const ReportesMantenimiento = () => {
  // Datos para la tabla (esto puede venir de un backend en el futuro)
  const reportes = [
    {
      id: "M001",
      unidad: "A-203",
      descripcion: "Reparación de fuga en cocina",
      estado: "Pendiente",
      fecha: "2024-10-05",
      estadoColor: "bg-yellow-500",
    },
    {
      id: "M002",
      unidad: "B-102",
      descripcion: "Reparación de luz en pasillo",
      estado: "En Progreso",
      fecha: "2024-10-03",
      estadoColor: "bg-blue-500",
    },
    {
      id: "M003",
      unidad: "C-305",
      descripcion: "Reparación de aire acondicionado",
      estado: "Completado",
      fecha: "2024-09-28",
      estadoColor: "bg-green-500",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reporte de Mantenimiento</h1>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          🔔 Notificaciones
        </button>
      </header>

      {/* Filters */}
      <section className="w-full max-w-screen-xl mt-4 p-4 bg-white shadow-md rounded-lg">
        <div className="flex flex-wrap gap-4">
          <select className="flex-grow border border-gray-300 rounded-lg p-2">
            <option>Filtrar por Unidad o ID</option>
            <option value="all">Todos</option>
          </select>
          <select className="flex-grow border border-gray-300 rounded-lg p-2">
            <option>Todos los Estados</option>
            <option value="all">Todos</option>
          </select>
          <select className="flex-grow border border-gray-300 rounded-lg p-2">
            <option>Todos los Tipos</option>
            <option value="all">Todos</option>
          </select>
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 flex-shrink-0">
            🔍 Buscar
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">
                ID Solicitud
              </th>
              <th className="border border-gray-300 p-3 text-left">Unidad</th>
              <th className="border border-gray-300 p-3 text-left">
                Descripción
              </th>
              <th className="border border-gray-300 p-3 text-center">Estado</th>
              <th className="border border-gray-300 p-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte) => (
              <tr key={reporte.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{reporte.id}</td>
                <td className="border border-gray-300 p-3">{reporte.unidad}</td>
                <td className="border border-gray-300 p-3">
                  {reporte.descripcion}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <span
                    className={`text-white py-1 px-2 rounded ${reporte.estadoColor}`}
                  >
                    {reporte.estado}
                  </span>
                </td>
                <td className="border border-gray-300 p-3">{reporte.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer Buttons */}
      <footer className="w-full max-w-screen-xl mt-6 p-4 flex justify-between">
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">
          Generar Reporte
        </button>
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500">
          Exportar Datos
        </button>
      </footer>
    </div>
  );
};

export default ReportesMantenimiento;
