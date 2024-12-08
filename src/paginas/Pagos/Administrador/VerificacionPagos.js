import React, { useState, useEffect } from "react";
//import axios from "axios";

// Componente para manejar los filtros de la tabla de pagos
const PaymentFilters = ({ onFilterChange, filters }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <select
      value={filters.estado}
      onChange={(e) => onFilterChange("estado", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Estado (Todos)</option>
      <option value="Pendiente">Pendiente</option>
      <option value="Pagado">Pagado</option>
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

// Componente principal para Verificación de Pagos
const VerificacionPagos = () => {
  const [pagos, setPagos] = useState([]);
  const [filteredPagos, setFilteredPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    estado: "",
    fechaInicio: "",
    fechaFin: "",
    busqueda: "",
  });

  useEffect(() => {
    // Simulación de datos de la colección Pagos
    const mockPagos = [
      {
        _id: "1",
        usuario_id: "101",
        monto: 350.0,
        fecha_pago: "2023-12-01",
        concepto: "Mantenimiento mensual",
        metodo_pago: "Tarjeta de crédito",
        estado: "Pagado",
        factura_url: "https://example.com/factura1.pdf",
      },
      {
        _id: "2",
        usuario_id: "102",
        monto: 450.0,
        fecha_pago: "2023-11-25",
        concepto: "Mantenimiento mensual",
        metodo_pago: "Transferencia bancaria",
        estado: "Pendiente",
        factura_url: "https://example.com/factura2.pdf",
      },
    ];

    // Simulación de datos de la colección Usuarios
    const mockUsuarios = [
      { _id: "101", name: "Juan Pérez" },
      { _id: "102", name: "María López" },
    ];

    setTimeout(() => {
      const pagosConUsuario = mockPagos.map((pago) => ({
        ...pago,
        usuario: mockUsuarios.find((usuario) => usuario._id === pago.usuario_id)
          ?.name,
      }));
      setPagos(pagosConUsuario);
      setFilteredPagos(pagosConUsuario);
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
        (pago.usuario?.toLowerCase().includes(filters.busqueda.toLowerCase()) ??
          false);

      return (
        matchesEstado &&
        matchesFechaInicio &&
        matchesFechaFin &&
        matchesBusqueda
      );
    });

    setFilteredPagos(filtered);
  }, [filters, pagos]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando pagos...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Verificación de Pagos
      </h1>

      {/* Filtros */}
      <PaymentFilters onFilterChange={handleFilterChange} filters={filters} />

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Monto</th>
              <th className="px-4 py-2 text-left">Fecha de Pago</th>
              <th className="px-4 py-2 text-left">Concepto</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Método de Pago</th>
              <th className="px-4 py-2 text-left">Factura</th>
            </tr>
          </thead>
          <tbody>
            {filteredPagos.length > 0 ? (
              filteredPagos.map((pago) => (
                <tr key={pago._id} className="border-t">
                  <td className="px-4 py-2">{pago.usuario || "No asignado"}</td>
                  <td className="px-4 py-2">S/ {pago.monto.toFixed(2)}</td>
                  <td className="px-4 py-2">{pago.fecha_pago}</td>
                  <td className="px-4 py-2">{pago.concepto}</td>
                  <td className="px-4 py-2">{pago.estado}</td>
                  <td className="px-4 py-2">{pago.metodo_pago}</td>
                  <td className="px-4 py-2">
                    <a
                      href={pago.factura_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Ver Factura
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
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

export default VerificacionPagos;
