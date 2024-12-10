import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Encabezado = ({ onAdd }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "#F5F5F5",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2E2E2E" }}>
      Inquilinos
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={onAdd}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        padding: "8px 16px",
        borderRadius: "8px",
      }}
    >
      + Crear Inquilino
    </Button>
  </Box>
);

export default Encabezado;
