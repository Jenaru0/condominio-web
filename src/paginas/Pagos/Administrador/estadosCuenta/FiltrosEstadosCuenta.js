import React from "react";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

const FiltrosEstadosCuenta = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            marginBottom: "24px",
        }}
    >
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Estado</InputLabel>
            <Select
                value={filters.estado}
                onChange={(e) => onFilterChange("estado", e.target.value)}
                sx={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Pagado">Pagado</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Atrasado">Atrasado</MenuItem>
            </Select>
        </FormControl>
        <TextField
            label="Fecha Inicio"
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
        />
        <TextField
            label="Fecha Fin"
            type="date"
            value={filters.fechaFin}
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
        />
        <TextField
            label="Búsqueda"
            value={filters.busqueda}
            onChange={(e) => onFilterChange("busqueda", e.target.value)}
            placeholder="Buscar por concepto o usuario"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
        />
        <Box sx={{ display: "flex", gap: "16px" }}>
            <Button
                variant="contained"
                onClick={onApplyFilters}
                sx={{
                    backgroundColor: "#1d4ed8",
                    color: "#ffffff",
                    fontFamily: "'Montserrat', sans-serif",
                    "&:hover": { backgroundColor: "#1e40af" },
                }}
            >
                Aplicar
            </Button>
            <Button
                variant="outlined"
                onClick={onResetFilters}
                sx={{
                    color: "#1d4ed8",
                    borderColor: "#1d4ed8",
                    fontFamily: "'Montserrat', sans-serif",
                    "&:hover": { backgroundColor: "#e0f2fe", borderColor: "#1e40af" },
                }}
            >
                Reiniciar
            </Button>
        </Box>
    </Box>
);

export default FiltrosEstadosCuenta;
