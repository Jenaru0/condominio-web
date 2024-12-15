import React from "react";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import Boton from "../../../../componentes/comunes/Boton";

const FiltroHistorialNotificaciones = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
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
            label="Buscar por asunto o mensaje"
            value={filters.busqueda}
            onChange={(e) => onFilterChange("busqueda", e.target.value)}
            placeholder="Ejemplo: Pago pendiente"
            sx={{ minWidth: "200px" }}
        />
        <Select
            value={filters.audiencia}
            onChange={(e) => onFilterChange("audiencia", e.target.value)}
            displayEmpty
            sx={{ minWidth: "200px" }}
        >
            <MenuItem value="">
                <em>Audiencia (Todos)</em>
            </MenuItem>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Residentes">Residentes</MenuItem>
            <MenuItem value="Personal de Seguridad">Personal de Seguridad</MenuItem>
            <MenuItem value="Técnicos">Técnicos</MenuItem>
        </Select>
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
            <Boton label="Aplicar" onClick={onApplyFilters} />
            <Boton label="Limpiar" onClick={onResetFilters} />
        </Box>
    </Box>
);

export default FiltroHistorialNotificaciones;
