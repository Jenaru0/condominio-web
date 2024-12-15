import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

// Gráfico de Estadísticas
const EstadisticasIncidentes = ({ estadisticas }) => {
    const chartData = {
        labels: ["Pendiente", "En Proceso", "Resuelto"],
        datasets: [
            {
                label: "Incidentes",
                data: [estadisticas.pendiente, estadisticas.enProceso, estadisticas.resuelto],
                backgroundColor: ["#FFC107", "#007BFF", "#28A745"],
            },
        ],
    };

    return (
        <Box sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: 1, p: 3, mb: 3, maxWidth: "600px", margin: "auto" }}>
            <Typography variant="h6" textAlign="center">Estadísticas</Typography>
            <Pie data={chartData} />
        </Box>
    );
};

export default EstadisticasIncidentes;
