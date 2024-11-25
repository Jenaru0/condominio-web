import React from "react";

const SolicitudesMantenimiento = () => {
  // Datos para las tablas (pueden venir de una API en el futuro)
  const solicitudesPendientes = [
    {
      id: "SP001",
      residente: "Juan Pérez",
      fecha: "12/10/2024",
      asunto: "Problema de gasfitería",
      descripcion: "Reparación de tuberías",
      estado: "Pendiente",
      estadoColor: "bg-yellow-500",
    },
  ];

  const historialSolicitudes = [
    {
      id: "HS001",
      residente: "Juan Pérez",
      fecha: "12/10/2024",
      asunto: "Problemas de gasfitería",
      descripcion: "Reparación de tuberías",
      estado: "En Progreso",
      estadoColor: "bg-blue-500",
      tecnico: "Carlos Ramírez",
    },
    {
      id: "HS002",
      residente: "María López",
      fecha: "05/09/2024",
      asunto: "Problema eléctrico",
      descripcion: "Cambio de cableado",
      estado: "Completado",
      estadoColor: "bg-green-500",
      tecnico: "Ana Gonzáles",
    },
    {
      id: "HS003",
      residente: "Lucía García",
      fecha: "20/09/2024",
      asunto: "Problema general",
      descripcion: "Desperfecto en las puertas",
      estado: "Cancelada",
      estadoColor: "bg-gray-400",
      tecnico: "No Asignado",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solicitudes de Mantenimiento</h1>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          🔔 Notificaciones
        </button>
      </header>

      {/* Tabla de Solicitudes Pendientes */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b bg-blue-700 text-white">
          Solicitudes Pendientes
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Residente</th>
              <th className="border border-gray-300 p-3 text-left">Fecha</th>
              <th className="border border-gray-300 p-3 text-left">Asunto</th>
              <th className="border border-gray-300 p-3 text-left">Descripción</th>
              <th className="border border-gray-300 p-3 text-center">Estado</th>
              <th className="border border-gray-300 p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesPendientes.map((solicitud) => (
              <tr key={solicitud.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{solicitud.residente}</td>
                <td className="border border-gray-300 p-3">{solicitud.fecha}</td>
                <td className="border border-gray-300 p-3">{solicitud.asunto}</td>
                <td className="border border-gray-300 p-3">{solicitud.descripcion}</td>
                <td className="border border-gray-300 p-3 text-center">
                  <span
                    className={`text-white py-1 px-3 rounded ${solicitud.estadoColor}`}
                  >
                    {solicitud.estado}
                  </span>
                </td>
                <td className="border border-gray-300 p-3 text-center flex gap-2 justify-center">
                  <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-400">
                    Ver Detalles
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-400">
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Tabla del Historial de Solicitudes */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b bg-blue-700 text-white">
          Historial de Solicitudes
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Residente</th>
              <th className="border border-gray-300 p-3 text-left">Fecha</th>
              <th className="border border-gray-300 p-3 text-left">Asunto</th>
              <th className="border border-gray-300 p-3 text-left">Descripción</th>
              <th className="border border-gray-300 p-3 text-center">Estado</th>
              <th className="border border-gray-300 p-3 text-left">Técnico Asignado</th>
              <th className="border border-gray-300 p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {historialSolicitudes.map((solicitud) => (
              <tr key={solicitud.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{solicitud.residente}</td>
                <td className="border border-gray-300 p-3">{solicitud.fecha}</td>
                <td className="border border-gray-300 p-3">{solicitud.asunto}</td>
                <td className="border border-gray-300 p-3">{solicitud.descripcion}</td>
                <td className="border border-gray-300 p-3 text-center">
                  <span
                    className={`text-white py-1 px-3 rounded ${solicitud.estadoColor}`}
                  >
                    {solicitud.estado}
                  </span>
                </td>
                <td className="border border-gray-300 p-3">{solicitud.tecnico}</td>
                <td className="border border-gray-300 p-3 text-center flex gap-2 justify-center">
                  <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-400">
                    Ver Detalles
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-400">
                    Cancelar
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

export default SolicitudesMantenimiento;
