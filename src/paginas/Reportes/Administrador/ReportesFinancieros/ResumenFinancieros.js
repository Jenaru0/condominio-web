import React from "react";
import { Box, Typography } from "@mui/material";

const ResumenFinancieros = ({ resumen, grafico }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "16px",
            alignItems: "stretch",
            marginBottom: "16px",
        }}
    >
        {/* Resumen Financiero */}
        <Box
            sx={{
                backgroundColor: "#ffffff",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                flex: 1,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    textAlign: "left", // Alinear título a la izquierda
                }}
            >
                Resumen Financiero
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Box
                    sx={{
                        backgroundColor: "#bbf7d0",
                        padding: "16px",
                        borderRadius: "8px",
                        textAlign: "center",
                    }}
                >
                    <Typography>Total Ingresos</Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        S/ {resumen.totalIngresos.toFixed(2)}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#fecaca",
                        padding: "16px",
                        borderRadius: "8px",
                        textAlign: "center",
                    }}
                >
                    <Typography>Total Egresos</Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        S/ {resumen.totalEgresos.toFixed(2)}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#bfdbfe",
                        padding: "16px",
                        borderRadius: "8px",
                        textAlign: "center",
                    }}
                >
                    <Typography>Balance</Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        S/ {resumen.balance.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </Box>

        {/* Gráfico Financiero */}
        <Box
            sx={{
                backgroundColor: "#ffffff",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                flex: 1,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    textAlign: "left", // Alinear título a la izquierda
                }}
            >
                Gráfico Financiero
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {grafico}
            </Box>
        </Box>
    </Box>
);

export default ResumenFinancieros;
