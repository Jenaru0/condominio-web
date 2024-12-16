import React from "react";
import { Box, TextField, Button } from "@mui/material";

const FiltrosFinancieros = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px", // Consistent with previous design
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Consistent with previous design
            marginBottom: "20px", // Consistent with previous design
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
        }}
    >
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
        <TextField
            label="Categoría"
            value={filters.categoria}
            onChange={(e) => onFilterChange("categoria", e.target.value)}
            placeholder="Buscar por categoría..."
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
            label="Rango de Monto"
            value={filters.monto}
            onChange={(e) => onFilterChange("monto", e.target.value)}
            placeholder="Ejemplo: 100"
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

export default FiltrosFinancieros;
