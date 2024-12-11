import React from "react";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FiltrosAccesos = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
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
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Tipo de Usuario</InputLabel>
            <Select
                value={filters.tipoUsuario}
                onChange={(e) => onFilterChange("tipoUsuario", e.target.value)}
            >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Residente">Residente</MenuItem>
                <MenuItem value="Visitante">Visitante</MenuItem>
                <MenuItem value="Empleado">Empleado</MenuItem>
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

        <TextField
            label="Búsqueda"
            value={filters.busqueda}
            onChange={(e) => onFilterChange("busqueda", e.target.value)}
            placeholder="DNI, nombre, zona..."
            sx={{ minWidth: "200px" }}
        />

        <Box sx={{ display: "flex", gap: "8px" }}>
            <Button
                variant="contained"
                onClick={onApplyFilters}
                sx={{ backgroundColor: "#1d4ed8", color: "#FFF" }}
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

export default FiltrosAccesos;
