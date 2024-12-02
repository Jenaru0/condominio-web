import React from "react";

const ReportePagos = () => {
  const pagos = [
    {
      id: "BO001",
      propietario: "Juan Pérez",
      monto: "S/. 500.00",
      fecha: "05/10/2024",
      referencia: "TRX12345",
      estado: "Pagado",
      concepto: "Multa por Ruido",
    },
    {
      id: "BO002",
      propietario: "María López",
      monto: "S/. 480.00",
      fecha: "04/10/2024",
      referencia: "TRX67890",
      estado: "Pendiente",
      concepto: "Multa por Ruido",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#2869A7] mb-4">Reportes de Pagos</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-[#80BAE4] text-white">
            <tr>
              <th className="px-4 py-2">ID Boleta</th>
              <th className="px-4 py-2">Propietario</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Referencia</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Concepto</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{pago.id}</td>
                <td className="px-4 py-2">{pago.propietario}</td>
                <td className="px-4 py-2">{pago.monto}</td>
                <td className="px-4 py-2">{pago.fecha}</td>
                <td className="px-4 py-2">{pago.referencia}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      pago.estado === "Pagado" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {pago.estado}
                  </span>
                </td>
                <td className="px-4 py-2">{pago.concepto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportePagos;
