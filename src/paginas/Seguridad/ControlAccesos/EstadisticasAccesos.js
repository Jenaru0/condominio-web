import React from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

const EstadisticasAccesos = ({ dataChart }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "16px",
            marginBottom: "16px",
        }}
    >
        <Box
            sx={{
                flex: 1,
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                padding: "16px",
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                Estadísticas de Accesos
            </Typography>
            <Bar data={dataChart} />
        </Box>
    </Box>
);

export default EstadisticasAccesos;
