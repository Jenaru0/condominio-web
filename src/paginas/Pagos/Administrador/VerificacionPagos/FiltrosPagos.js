import React from "react";
import {
    Box,
    FormControl,
    Select,
    MenuItem,
    TextField,
    Button,
    InputLabel,
} from "@mui/material";

const FiltrosPagos = ({ filters, onFilterChange, onResetFilters }) => {
    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                padding: "16px", // Reducimos el padding
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexWrap: "wrap",
                gap: "16px", // Reducimos el espacio entre los elementos
                alignItems: "center",
                marginBottom: "20px", // Reducimos la separación con el siguiente elemento
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
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Pagado">Pagado</MenuItem>
                    <MenuItem value="Atrasado">Atrasado</MenuItem>
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
                placeholder="Concepto o Usuario"
                value={filters.busqueda}
                onChange={(e) => onFilterChange("busqueda", e.target.value)}
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
                    onClick={onResetFilters} // Llamamos a la función para reiniciar los filtros
                >
                    Reiniciar
                </Button>
            </Box>
        </Box>
    );
};

export default FiltrosPagos;
