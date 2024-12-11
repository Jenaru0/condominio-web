import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

// Componente para filtros de facturación
const InvoiceFilters = ({ filters, onFilterChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <select
      value={filters.estado}
      onChange={(e) => onFilterChange("estado", e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Estado (Todos)</option>
      <option value="Pagado">Pagado</option>
      <option value="Pendiente">Pendiente</option>
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

// Componente principal para Facturación
const Facturacion = () => {
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
        usuario: "Juan Pérez",
        monto: 350.0,
        fecha_pago: "2023-12-01",
        concepto: "Mantenimiento mensual",
        estado: "Pagado",
        factura_url: "https://example.com/factura1.pdf",
      },
      {
        _id: "2",
        usuario: "María López",
        monto: 450.0,
        fecha_pago: "2023-11-25",
        concepto: "Reserva de área común",
        estado: "Pendiente",
        factura_url: "https://example.com/factura2.pdf",
      },
    ];

    setTimeout(() => {
      setPagos(mockPagos);
      setFilteredPagos(mockPagos);
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
  }, [filters, pagos]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const generarPDF = (pago) => {
    const doc = new jsPDF();
    doc.text("Factura", 105, 10, { align: "center" });
    doc.text(`Usuario: ${pago.usuario}`, 10, 30);
    doc.text(`Monto: S/ ${pago.monto.toFixed(2)}`, 10, 40);
    doc.text(`Concepto: ${pago.concepto}`, 10, 50);
    doc.text(`Fecha de Pago: ${pago.fecha_pago}`, 10, 60);
    doc.text(`Estado: ${pago.estado}`, 10, 70);
    doc.save(`factura_${pago._id}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando facturas...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Facturación</h1>

      {/* Filtros */}
      <InvoiceFilters filters={filters} onFilterChange={handleFilterChange} />

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
              <th className="px-4 py-2 text-left">Acciones</th>
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
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => generarPDF(pago)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                    >
                      Descargar PDF
                    </button>
                    <a
                      href={pago.factura_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-2 py-1 rounded-lg"
                    >
                      Ver Factura
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No se encontraron facturas con los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facturacion;
