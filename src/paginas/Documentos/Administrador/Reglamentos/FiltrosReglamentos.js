import React from "react";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

const FiltrosReglamentos = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
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
            alignItems: "center",
        }}
    >
        <TextField
            label="Nombre"
            value={filters.nombre}
            onChange={(e) => onFilterChange("nombre", e.target.value)}
            placeholder="Buscar por nombre..."
            sx={{ minWidth: "200px" }}
        />
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Estado</InputLabel>
            <Select
                value={filters.estado}
                onChange={(e) => onFilterChange("estado", e.target.value)}
            >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Vigente">Vigente</MenuItem>
                <MenuItem value="Expirado">Expirado</MenuItem>
            </Select>
        </FormControl>
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

export default FiltrosReglamentos;
