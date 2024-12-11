import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import EncabezadoEstadosCuenta from "./EncabezadoEstadosCuenta";
import FiltrosEstadosCuenta from "./FiltrosEstadosCuenta";
import TablaEstadosCuenta from "./TablaEstadosCuenta";
import ResumenEstadosCuenta from "./ResumenEstadosCuenta";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const EstadosCuenta = () => {
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
      { _id: "2", usuario: "María López", monto: 450, fecha_pago: "2023-11-25", concepto: "Mantenimiento mensual", estado: "Pendiente" },
      { _id: "3", usuario: "Carlos Ramírez", monto: 400, fecha_pago: "2023-12-05", concepto: "Reserva de área común", estado: "Pagado" },
    ];

    setTimeout(() => {
      setPagos(mockPagos);
      setFilteredPagos(mockPagos);
      calcularResumen(mockPagos);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "estados_de_cuenta.xlsx");
  };

  if (loading) return <LoadingSpinner text="Cargando estados de cuenta..." />;

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        <EncabezadoEstadosCuenta onExport={exportarExcel} />
        <FiltrosEstadosCuenta
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
        />
        <ResumenEstadosCuenta resumen={resumen} />
        <TablaEstadosCuenta pagos={filteredPagos} />
      </Box>
  );
};

export default EstadosCuenta;
