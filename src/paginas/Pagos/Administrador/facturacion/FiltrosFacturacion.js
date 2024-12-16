import React from "react";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FiltrosFacturacion = ({ filters, onFilterChange, onResetFilters }) => (
    <Box
        sx={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px", // Updated to match the original design
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Updated shadow
            marginBottom: "20px", // Increased margin for better separation
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
        }}
    >
        <FormControl sx={{ minWidth: "200px", fontFamily: "'Montserrat', sans-serif" }}>
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
                <MenuItem value="Pagado">Pagado</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
            </Select>
        </FormControl>

        <TextField
            label="Fecha Inicio"
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
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
            label="Buscar"
            value={filters.busqueda}
            onChange={(e) => onFilterChange("busqueda", e.target.value)}
            placeholder="Concepto o usuario..."
            sx={{
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
                onClick={() => {}}
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

export default FiltrosFacturacion;
