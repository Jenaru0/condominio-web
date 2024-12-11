import React from "react";
import { Box, Typography } from "@mui/material";

const ResumenEstadosCuenta = ({ resumen }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "16px",
        }}
    >
        <Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif", marginBottom: "16px" }}>
            Resumen
        </Typography>
        <Box sx={{ display: "flex", gap: "16px" }}>
            <Box
                sx={{
                    backgroundColor: "#bbf7d0",
                    padding: "16px",
                    borderRadius: "8px",
                    flex: 1,
                }}
            >
                <Typography variant="body1" sx={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Total Pagado
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}
                >
                    S/ {resumen.totalPagado.toFixed(2)}
                </Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: "#fef08a",
                    padding: "16px",
                    borderRadius: "8px",
                    flex: 1,
                }}
            >
                <Typography variant="body1" sx={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Total Pendiente
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}
                >
                    S/ {resumen.totalPendiente.toFixed(2)}
                </Typography>
            </Box>
        </Box>
    </Box>
);

export default ResumenEstadosCuenta;
