import React from "react";
import { Box, TextField, Button } from "@mui/material";

const FiltrosFinancieros = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
        }}
    >
        <TextField
            label="Fecha Inicio"
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: "200px" }}
        />
        <TextField
            label="Fecha Fin"
            type="date"
            value={filters.fechaFin}
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: "200px" }}
        />
        <TextField
            label="Categoría"
            value={filters.categoria}
            onChange={(e) => onFilterChange("categoria", e.target.value)}
            placeholder="Buscar por categoría..."
            sx={{ minWidth: "200px" }}
        />
        <TextField
            label="Rango de Monto"
            value={filters.monto}
            onChange={(e) => onFilterChange("monto", e.target.value)}
            placeholder="Ejemplo: 100"
            sx={{ minWidth: "200px" }}
        />
        <Box sx={{ display: "flex", gap: "8px" }}>
            <Button
                variant="contained"
                onClick={onApplyFilters}
                sx={{ backgroundColor: "#1d4ed8" }}
            >
                Aplicar
            </Button>
            <Button
                variant="outlined"
                onClick={onResetFilters}
                sx={{ color: "#1d4ed8", borderColor: "#1d4ed8" }}
            >
                Limpiar
            </Button>
        </Box>
    </Box>
);

export default FiltrosFinancieros;
