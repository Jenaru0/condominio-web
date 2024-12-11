import React from "react";
import { Box, Typography } from "@mui/material";

const ResumenFacturacion = ({ resumen }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "16px",
        }}
    >
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            Resumen
        </Typography>
        <Box sx={{ display: "flex", gap: "16px" }}>
            <Box sx={{ backgroundColor: "#bbf7d0", padding: "16px", borderRadius: "8px", flex: 1 }}>
                <Typography>Total Pagado</Typography>
                <Typography variant="h5">S/ {resumen.totalPagado.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ backgroundColor: "#fef08a", padding: "16px", borderRadius: "8px", flex: 1 }}>
                <Typography>Total Pendiente</Typography>
                <Typography variant="h5">S/ {resumen.totalPendiente.toFixed(2)}</Typography>
            </Box>
        </Box>
    </Box>
);

export default ResumenFacturacion;
