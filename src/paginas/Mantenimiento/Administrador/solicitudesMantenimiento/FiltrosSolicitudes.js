import React from "react";
import { Box, Select, MenuItem, FormControl, InputLabel, TextField, Button } from "@mui/material";

const FiltrosSolicitudes = ({ filtros, setFiltros, onSearch, resetFilters }) => {
    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                padding: "16px",
                borderRadius: "12px", // Updated borderRadius
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Updated shadow for consistency
                display: "flex",
                flexWrap: "wrap",
                gap: "16px", // Updated gap between elements
                alignItems: "center",
                marginBottom: "20px", // Updated margin for consistency
            }}
        >
            {/* Filtro por estado */}
            <FormControl sx={{ minWidth: "200px", fontFamily: "'Montserrat', sans-serif" }}>
                <InputLabel>Estado</InputLabel>
                <Select
                    value={filtros.estado}
                    onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                    sx={{
                        "& .MuiSelect-select": {
                            fontFamily: "'Montserrat', sans-serif",
                        },
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
                    <MenuItem value="En Progreso">En Progreso</MenuItem>
                    <MenuItem value="Resuelto">Resuelto</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                </Select>
            </FormControl>

            {/* Filtro por residente */}
            <FormControl sx={{ minWidth: "200px", fontFamily: "'Montserrat', sans-serif" }}>
                <TextField
                    label="Residente"
                    value={filtros.residente}
                    onChange={(e) => setFiltros({ ...filtros, residente: e.target.value })}
                    sx={{
                        "& .MuiInputLabel-root": {
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                        },
                        "& .MuiInputBase-root": {
                            fontFamily: "'Montserrat', sans-serif",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1d4ed8",
                        },
                    }}
                />
            </FormControl>

            {/* Filtro por fecha */}
            <FormControl sx={{ minWidth: "200px", fontFamily: "'Montserrat', sans-serif" }}>
                <TextField
                    label="Fecha"
                    type="date"
                    value={filtros.fecha}
                    onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        "& .MuiInputLabel-root": {
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                        },
                        "& .MuiInputBase-root": {
                            fontFamily: "'Montserrat', sans-serif",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1d4ed8",
                        },
                    }}
                />
            </FormControl>

            {/* Botón de búsqueda */}
            <Button
                variant="contained"
                onClick={onSearch}
                sx={{
                    backgroundColor: "#1d4ed8",
                    color: "#ffffff",
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: "8px", // Added border radius for consistency
                    "&:hover": {
                        backgroundColor: "#1e40af",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                Buscar
            </Button>

            {/* Botón para reiniciar filtros */}
            <Button
                variant="outlined"
                onClick={resetFilters}
                sx={{
                    color: "#1d4ed8",
                    borderColor: "#1d4ed8",
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: "8px", // Added border radius for consistency
                    "&:hover": {
                        borderColor: "#1e40af",
                        backgroundColor: "#e5e7eb",
                    },
                }}
            >
                Reiniciar
            </Button>
        </Box>
    );
};

export default FiltrosSolicitudes;
