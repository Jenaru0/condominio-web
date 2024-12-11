import React, { useState } from "react";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FiltrosHistorialSolicitudes = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        estado: "",
        residente: "",
        fechaDesde: "",
        fechaHasta: "",
    });

    const handleChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    const handleApplyFilters = () => {
        onFilter(filters);
    };

    const handleClearFilters = () => {
        setFilters({
            estado: "",
            residente: "",
            fechaDesde: "",
            fechaHasta: "",
        });
        onFilter({});
    };

    return (
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
            }}
        >
            {/* Filtro por estado */}
            <FormControl
                sx={{
                    minWidth: "200px",
                    fontFamily: "'Montserrat', sans-serif",
                }}
            >
                <InputLabel>Estado</InputLabel>
                <Select
                    value={filters.estado}
                    onChange={(e) => handleChange("estado", e.target.value)}
                    sx={{
                        "& .MuiSelect-select": {
                            fontFamily: "'Montserrat', sans-serif",
                        },
                    }}
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="Resuelto">Resuelto</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                </Select>
            </FormControl>

            {/* Filtro por residente */}
            <FormControl
                sx={{
                    minWidth: "200px",
                    fontFamily: "'Montserrat', sans-serif",
                }}
            >
                <TextField
                    label="Residente"
                    value={filters.residente}
                    onChange={(e) => handleChange("residente", e.target.value)}
                    sx={{
                        "& .MuiInputLabel-root": {
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                        },
                        "& .MuiInputBase-root": {
                            fontFamily: "'Montserrat', sans-serif",
                        },
                    }}
                />
            </FormControl>

            {/* Filtro por fecha desde */}
            <FormControl
                sx={{
                    minWidth: "200px",
                    fontFamily: "'Montserrat', sans-serif",
                }}
            >
                <TextField
                    label="Fecha Desde"
                    type="date"
                    value={filters.fechaDesde}
                    onChange={(e) => handleChange("fechaDesde", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        "& .MuiInputLabel-root": {
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                        },
                        "& .MuiInputBase-root": {
                            fontFamily: "'Montserrat', sans-serif",
                        },
                    }}
                />
            </FormControl>

            {/* Filtro por fecha hasta */}
            <FormControl
                sx={{
                    minWidth: "200px",
                    fontFamily: "'Montserrat', sans-serif",
                }}
            >
                <TextField
                    label="Fecha Hasta"
                    type="date"
                    value={filters.fechaHasta}
                    onChange={(e) => handleChange("fechaHasta", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        "& .MuiInputLabel-root": {
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                        },
                        "& .MuiInputBase-root": {
                            fontFamily: "'Montserrat', sans-serif",
                        },
                    }}
                />
            </FormControl>

            {/* Botón de búsqueda */}
            <Button
                variant="contained"
                onClick={handleApplyFilters}
                sx={{
                    backgroundColor: "#1d4ed8",
                    color: "#ffffff",
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#1e40af" },
                }}
            >
                Buscar
            </Button>

            {/* Botón para reiniciar filtros */}
            <Button
                variant="outlined"
                onClick={handleClearFilters}
                sx={{
                    color: "#1d4ed8",
                    borderColor: "#1d4ed8",
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { borderColor: "#1e40af", backgroundColor: "#e0f2fe" },
                }}
            >
                Reiniciar
            </Button>
        </Box>
    );
};

export default FiltrosHistorialSolicitudes;
