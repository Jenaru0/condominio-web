import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import FiltrosPagos from "./FiltrosPagos";
import ListaPagos from "./ListaPagos";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

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

  // Simulación de carga de datos
  useEffect(() => {
    const mockPagos = [
      {
        _id: "1",
        usuario: "Juan Pérez",
        monto: 350.0,
        fecha_pago: "2023-12-01",
        concepto: "Mantenimiento mensual",
        metodo_pago: "Tarjeta de crédito",
        estado: "Pagado",
        factura_url: "https://example.com/factura1.pdf",
      },
      {
        _id: "2",
        usuario: "María López",
        monto: 450.0,
        fecha_pago: "2023-11-25",
        concepto: "Mantenimiento mensual",
        metodo_pago: "Transferencia bancaria",
        estado: "Pendiente",
        factura_url: "https://example.com/factura2.pdf",
      },
      {
        _id: "3",
        usuario: "Carlos Gómez",
        monto: 320.0,
        fecha_pago: "2023-11-15",
        concepto: "Extraordinario: remodelación",
        metodo_pago: "Efectivo",
        estado: "Atrasado",
        factura_url: "https://example.com/factura3.pdf",
      },
    ];

    setTimeout(() => {
      setPagos(mockPagos);
      setFilteredPagos(mockPagos);
      setLoading(false);
    }, 2000);
  }, []);

  // Aplicar filtros
  useEffect(() => {
    const filtered = pagos.filter((pago) => {
      const matchesEstado = !filters.estado || pago.estado === filters.estado;
      const matchesFechaInicio =
          !filters.fechaInicio || new Date(pago.fecha_pago) >= new Date(filters.fechaInicio);
      const matchesFechaFin =
          !filters.fechaFin || new Date(pago.fecha_pago) <= new Date(filters.fechaFin);
      const matchesBusqueda =
          pago.concepto.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
          pago.usuario.toLowerCase().includes(filters.busqueda.toLowerCase());

      return matchesEstado && matchesFechaInicio && matchesFechaFin && matchesBusqueda;
    });

    setFilteredPagos(filtered);
  }, [filters, pagos]);

  // Manejar cambios en los filtros
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <LoadingSpinner text="Cargando pagos..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        {/* Encabezado reutilizable */}
        <div className="mb-8">
          <Encabezado titulo="Verificación de Pagos" />
        </div>

        {/* Filtros */}
        <FiltrosPagos filters={filters} onFilterChange={handleFilterChange} />

        {/* Tabla de pagos */}
        <ListaPagos pagos={filteredPagos} />
      </Box>
  );
};

export default VerificacionPagos;
