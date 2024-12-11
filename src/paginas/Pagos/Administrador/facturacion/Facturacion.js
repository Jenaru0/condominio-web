import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { jsPDF } from "jspdf";
import EncabezadoFacturacion from "./EncabezadoFacturacion";
import FiltrosFacturacion from "./FiltrosFacturacion";
import ResumenFacturacion from "./ResumenFacturacion";
import TablaFacturacion from "./TablaFacturacion";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const Facturacion = () => {
  const [pagos, setPagos] = useState([]);
  const [filteredPagos, setFilteredPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumen, setResumen] = useState({ totalPagado: 0, totalPendiente: 0 });
  const [filters, setFilters] = useState({
    estado: "",
    fechaInicio: "",
    fechaFin: "",
    busqueda: "",
  });

  useEffect(() => {
    const mockPagos = [
      { _id: "1", usuario: "Juan Pérez", monto: 350, fecha_pago: "2023-12-01", concepto: "Mantenimiento mensual", estado: "Pagado" },
      { _id: "2", usuario: "María López", monto: 450, fecha_pago: "2023-11-25", concepto: "Reserva de área común", estado: "Pendiente" },
    ];

    setTimeout(() => {
      setPagos(mockPagos);
      setFilteredPagos(mockPagos);
      calcularResumen(mockPagos);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const applyFilters = () => {
    const filtered = pagos.filter((pago) => {
      const matchesEstado = !filters.estado || pago.estado === filters.estado;
      const matchesFechaInicio = !filters.fechaInicio || new Date(pago.fecha_pago) >= new Date(filters.fechaInicio);
      const matchesFechaFin = !filters.fechaFin || new Date(pago.fecha_pago) <= new Date(filters.fechaFin);
      const matchesBusqueda = pago.usuario.toLowerCase().includes(filters.busqueda.toLowerCase()) || pago.concepto.toLowerCase().includes(filters.busqueda.toLowerCase());
      return matchesEstado && matchesFechaInicio && matchesFechaFin && matchesBusqueda;
    });
    setFilteredPagos(filtered);
    calcularResumen(filtered);
  };

  const resetFilters = () => {
    setFilters({ estado: "", fechaInicio: "", fechaFin: "", busqueda: "" });
    setFilteredPagos(pagos);
    calcularResumen(pagos);
  };

  const calcularResumen = (data) => {
    const totalPagado = data.filter((pago) => pago.estado === "Pagado").reduce((sum, pago) => sum + pago.monto, 0);
    const totalPendiente = data.filter((pago) => pago.estado === "Pendiente").reduce((sum, pago) => sum + pago.monto, 0);
    setResumen({ totalPagado, totalPendiente });
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

  if (loading) return <LoadingSpinner text="Cargando facturas..." />;

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        <EncabezadoFacturacion onExportAll={() => console.log("Exportar todas las facturas")} />
        <FiltrosFacturacion
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
        />
        <ResumenFacturacion resumen={resumen} />
        <TablaFacturacion pagos={filteredPagos} generarPDF={generarPDF} />
      </Box>
  );
};

export default Facturacion;
