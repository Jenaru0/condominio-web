import React from "react";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FiltrosDocumentos = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px", // Consistent padding as in FiltrosPagos
            borderRadius: "12px", // Match the border radius of FiltrosPagos
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Match box shadow
            display: "flex",
            flexWrap: "wrap",
            gap: "16px", // Match gap between elements
            alignItems: "center",
            marginBottom: "20px", // Match margin bottom spacing
        }}
    >
        <TextField
            label="Nombre"
            value={filters.nombre}
            onChange={(e) => onFilterChange("nombre", e.target.value)}
            placeholder="Buscar por nombre..."
            sx={{
                minWidth: "200px",
                "& .MuiInputLabel-root": {
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                },
                "& .MuiInputBase-root": { fontFamily: "'Montserrat', sans-serif" },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1d4ed8",
                },
            }}
        />
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Tipo</InputLabel>
            <Select
                value={filters.tipo}
                onChange={(e) => onFilterChange("tipo", e.target.value)}
                sx={{
                    "& .MuiSelect-select": { fontFamily: "'Montserrat', sans-serif" },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1d4ed8",
                    },
                }}
            >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Contrato">Contrato</MenuItem>
                <MenuItem value="Reglamento">Reglamento</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Estado</InputLabel>
            <Select
                value={filters.estado}
                onChange={(e) => onFilterChange("estado", e.target.value)}
                sx={{
                    "& .MuiSelect-select": { fontFamily: "'Montserrat', sans-serif" },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1d4ed8",
                    },
                }}
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
            sx={{
                minWidth: "200px",
                "& .MuiInputLabel-root": {
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                },
                "& .MuiInputBase-root": { fontFamily: "'Montserrat', sans-serif" },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1d4ed8",
                },
            }}
        />
        <TextField
            label="Fecha Fin"
            type="date"
            value={filters.fechaFin}
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
                minWidth: "200px",
                "& .MuiInputLabel-root": {
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                },
                "& .MuiInputBase-root": { fontFamily: "'Montserrat', sans-serif" },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1d4ed8",
                },
            }}
        />
        <Box sx={{ display: "flex", gap: "16px" }}>
            <Button
                variant="contained"
                onClick={onApplyFilters}
                sx={{
                    backgroundColor: "#1d4ed8",
                    color: "#ffffff",
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    padding: "8px 16px",
                    "&:hover": {
                        backgroundColor: "#1e40af",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                Buscar
            </Button>
            <Button
                variant="outlined"
                onClick={onResetFilters}
                sx={{
                    backgroundColor: "#ffffff",
                    color: "#1d4ed8",
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    padding: "8px 16px",
                    "&:hover": {
                        backgroundColor: "#e5e7eb",
                        borderColor: "#1d4ed8",
                    },
                }}
            >
                Reiniciar
            </Button>
        </Box>
    </Box>
);

export default FiltrosDocumentos;
