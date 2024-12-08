import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// Componente para los filtros de estados de cuenta
const AccountFilters = ({ filters, onFilterChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <select
      value={filters.estado}
      onChange={(e) => onFilterChange("estado", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Estado (Todos)</option>
      <option value="Pagado">Pagado</option>
      <option value="Pendiente">Pendiente</option>
      <option value="Atrasado">Atrasado</option>
    </select>
    <input
      type="date"
      value={filters.fechaInicio}
      onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    />
    <input
      type="date"
      value={filters.fechaFin}
      onChange={(e) => onFilterChange("fechaFin", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    />
    <input
      type="text"
      value={filters.busqueda}
      onChange={(e) => onFilterChange("busqueda", e.target.value)}
      placeholder="Buscar por concepto o usuario..."
      className="border rounded-lg px-4 py-2 w-full"
    />
  </div>
);

// Componente principal para Estados de Cuenta
const EstadosCuenta = () => {
  const [pagos, setPagos] = useState([]);
  const [filteredPagos, setFilteredPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    estado: "",
    fechaInicio: "",
    fechaFin: "",
    busqueda: "",
  });
  const [resumen, setResumen] = useState({
    totalPagado: 0,
    totalPendiente: 0,
  });

  useEffect(() => {
    // Simulación de datos de la colección Pagos
    const mockPagos = [
      {
        _id: "1",
        usuario_id: "101",
        usuario: "Juan Pérez",
        monto: 350.0,
        fecha_pago: "2023-12-01",
        concepto: "Mantenimiento mensual",
        estado: "Pagado",
      },
      {
        _id: "2",
        usuario_id: "102",
        usuario: "María López",
        monto: 450.0,
        fecha_pago: "2023-11-25",
        concepto: "Mantenimiento mensual",
        estado: "Pendiente",
      },
      {
        _id: "3",
        usuario_id: "103",
        usuario: "Carlos Ramírez",
        monto: 400.0,
        fecha_pago: "2023-12-05",
        concepto: "Reserva de área común",
        estado: "Pagado",
      },
    ];

    setTimeout(() => {
      setPagos(mockPagos);
      setFilteredPagos(mockPagos);
      calcularResumen(mockPagos);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Aplicar filtros
    const filtered = pagos.filter((pago) => {
      const matchesEstado = !filters.estado || pago.estado === filters.estado;
      const matchesFechaInicio =
        !filters.fechaInicio ||
        new Date(pago.fecha_pago) >= new Date(filters.fechaInicio);
      const matchesFechaFin =
        !filters.fechaFin ||
        new Date(pago.fecha_pago) <= new Date(filters.fechaFin);
      const matchesBusqueda =
        pago.concepto.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
        pago.usuario.toLowerCase().includes(filters.busqueda.toLowerCase());

      return (
        matchesEstado &&
        matchesFechaInicio &&
        matchesFechaFin &&
        matchesBusqueda
      );
    });

    setFilteredPagos(filtered);
    calcularResumen(filtered);
  }, [filters, pagos]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const calcularResumen = (data) => {
    const totalPagado = data
      .filter((pago) => pago.estado === "Pagado")
      .reduce((sum, pago) => sum + pago.monto, 0);
    const totalPendiente = data
      .filter((pago) => pago.estado === "Pendiente")
      .reduce((sum, pago) => sum + pago.monto, 0);

    setResumen({ totalPagado, totalPendiente });
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPagos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estados de Cuenta");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "estados_de_cuenta.xlsx"
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando estados de cuenta...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Estados de Cuenta
      </h1>

      {/* Filtros */}
      <AccountFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Resumen */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resumen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="text-lg font-semibold">Total Pagado</p>
            <p className="text-2xl">S/ {resumen.totalPagado.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
            <p className="text-lg font-semibold">Total Pendiente</p>
            <p className="text-2xl">S/ {resumen.totalPendiente.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4 flex justify-end">
          <button
            onClick={exportarExcel}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Exportar a Excel
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Monto</th>
              <th className="px-4 py-2 text-left">Fecha de Pago</th>
              <th className="px-4 py-2 text-left">Concepto</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredPagos.length > 0 ? (
              filteredPagos.map((pago) => (
                <tr key={pago._id} className="border-t">
                  <td className="px-4 py-2">{pago.usuario}</td>
                  <td className="px-4 py-2">S/ {pago.monto.toFixed(2)}</td>
                  <td className="px-4 py-2">{pago.fecha_pago}</td>
                  <td className="px-4 py-2">{pago.concepto}</td>
                  <td className="px-4 py-2">{pago.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No se encontraron pagos con los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstadosCuenta;
