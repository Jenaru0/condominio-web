import React from "react";
import { Box, Select, MenuItem, FormControl, InputLabel, TextField, Button } from "@mui/material";

const FiltrosSolicitudes = ({ filtros, setFiltros, onSearch, resetFilters }) => {
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
                    value={filtros.estado}
                    onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                    sx={{
                        "& .MuiSelect-select": {
                            fontFamily: "'Montserrat', sans-serif",
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
            <FormControl
                sx={{
                    minWidth: "200px",
                    fontFamily: "'Montserrat', sans-serif",
                }}
            >
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
                    }}
                />
            </FormControl>

            {/* Filtro por fecha */}
            <FormControl
                sx={{
                    minWidth: "200px",
                    fontFamily: "'Montserrat', sans-serif",
                }}
            >
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
                    "&:hover": { backgroundColor: "#1e40af" },
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
                    "&:hover": { borderColor: "#1e40af", backgroundColor: "#e0f2fe" },
                }}
            >
                Reiniciar
            </Button>
        </Box>
    );
};

export default FiltrosSolicitudes;
