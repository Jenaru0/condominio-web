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

const FiltrosPagos = ({ filters, onFilterChange }) => {
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
                marginBottom: "24px",
            }}
        >
            <FormControl sx={{ minWidth: "200px", fontFamily: "'Montserrat', sans-serif" }}>
                <InputLabel>Estado</InputLabel>
                <Select
                    value={filters.estado}
                    onChange={(e) => onFilterChange("estado", e.target.value)}
                    sx={{
                        "& .MuiSelect-select": { fontFamily: "'Montserrat', sans-serif" },
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
                }}
            />

            <Button
                variant="contained"
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
        </Box>
    );
};

export default FiltrosPagos;
