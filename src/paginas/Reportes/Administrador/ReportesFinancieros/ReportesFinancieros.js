import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import FiltrosFinancieros from "./FiltrosFinancieros";
import ResumenFinancieros from "./ResumenFinancieros";
import TablaFinancieros from "./TablaFinancieros";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import { Bar } from "react-chartjs-2";

const Financieros = () => {
  const [finanzas, setFinanzas] = useState([]);
  const [filteredFinanzas, setFilteredFinanzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    categoria: "",
    monto: "",
  });
  const [summary, setSummary] = useState({
    totalIngresos: 0,
    totalEgresos: 0,
    balance: 0,
  });

  useEffect(() => {
    const mockFinanzas = [
      { _id: "1", fecha: "2023-12-01", categoria: "Mantenimiento", tipo: "Ingreso", monto: 350 },
      { _id: "2", fecha: "2023-12-05", categoria: "Limpieza", tipo: "Egreso", monto: 120 },
      { _id: "3", fecha: "2023-12-10", categoria: "Renta", tipo: "Ingreso", monto: 500 },
    ];
    setTimeout(() => {
      setFinanzas(mockFinanzas);
      setFilteredFinanzas(mockFinanzas);
      calcularResumen(mockFinanzas);
      setLoading(false);
    }, 1000);
  }, []);

  const calcularResumen = (data) => {
    const totalIngresos = data.filter((x) => x.tipo === "Ingreso").reduce((sum, x) => sum + x.monto, 0);
    const totalEgresos = data.filter((x) => x.tipo === "Egreso").reduce((sum, x) => sum + x.monto, 0);
    setSummary({ totalIngresos, totalEgresos, balance: totalIngresos - totalEgresos });
  };

  const handleFilterChange = (key, value) => setFilters({ ...filters, [key]: value });

  if (loading) return <LoadingSpinner text="Cargando reportes financieros..." />;

  const datosGrafico = {
    labels: ["Ingresos", "Egresos"],
    datasets: [
      { label: "Resumen Financiero", data: [summary.totalIngresos, summary.totalEgresos], backgroundColor: ["#4CAF50", "#F44336"] },
    ],
  };

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        {/* Encabezado reutilizable */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Reportes Financieros" />
          <Boton label="+ Crear Reporte" onClick={() => console.log("Crear reporte")} />
        </div>

        {/* Contenido principal */}
        <FiltrosFinancieros filters={filters} onFilterChange={handleFilterChange} />
        <ResumenFinancieros
            resumen={summary}
            grafico={<Bar data={datosGrafico} options={{ maintainAspectRatio: true }} />}
        />
        <TablaFinancieros datos={filteredFinanzas} />
      </Box>
  );
};

export default Financieros;
