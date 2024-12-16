import React from "react";
import { Box, TextField, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const FiltrosEventos = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
        }}
    >
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Estado</InputLabel>
            <Select
                value={filters.estado}
                onChange={(e) => onFilterChange("estado", e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
                }}
            >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Confirmado">Confirmado</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
            </Select>
        </FormControl>

        <TextField
            label="Fecha"
            type="date"
            value={filters.fecha}
            onChange={(e) => onFilterChange("fecha", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
                minWidth: "200px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
            }}
        />

        <TextField
            label="Buscar"
            placeholder="Nombre del evento"
            value={filters.busqueda}
            onChange={(e) => onFilterChange("busqueda", e.target.value)}
            sx={{
                minWidth: "200px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
            }}
        />

        <Box sx={{ display: "flex", gap: "16px" }}>
            <Button
                variant="contained"
                onClick={onApplyFilters} // Trigger buscar action
                sx={{
                    backgroundColor: "#1d4ed8",
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#1e40af" },
                }}
            >
                Buscar
            </Button>
            <Button
                variant="outlined"
                onClick={onResetFilters} // Trigger reset filters
                sx={{
                    backgroundColor: "#ffffff",
                    color: "#1d4ed8",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#e5e7eb", borderColor: "#1d4ed8" },
                }}
            >
                Reiniciar
            </Button>
        </Box>
    </Box>
);

export default FiltrosEventos;
