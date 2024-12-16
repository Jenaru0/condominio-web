import React from "react";
import {
    Box,
    TextField,
    Button,
} from "@mui/material";

const FiltrosAccesos = ({ filters, onFilterChange, onResetFilters }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

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
            <TextField
                name="busqueda"
                label="Buscar por nombre o DNI"
                value={filters.busqueda}
                onChange={handleInputChange}
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
                fullWidth
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

export default FiltrosAccesos;
