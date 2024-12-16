import React from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";

// Componente de Filtros de Incidentes
const FiltrosDeIncidentes = ({ filtros, cambiarFiltro, aplicarFiltros, restablecerFiltros }) => (
    <Box
        sx={{
            backgroundColor: "#fff",
            padding: 3,
            borderRadius: "8px",
            boxShadow: 1,
            mb: 2,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
        }}
    >
        {/* Filtro Estado */}
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Estado</InputLabel>
            <Select
                value={filtros.estado}
                onChange={(e) => cambiarFiltro("estado", e.target.value)}
                sx={{
                    "& .MuiSelect-select": { fontFamily: "'Montserrat', sans-serif" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
                }}
            >
                <MenuItem value="">Estado (Todos)</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="En Proceso">En Proceso</MenuItem>
                <MenuItem value="Resuelto">Resuelto</MenuItem>
            </Select>
        </FormControl>

        {/* Filtro Prioridad */}
        <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Prioridad</InputLabel>
            <Select
                value={filtros.prioridad}
                onChange={(e) => cambiarFiltro("prioridad", e.target.value)}
                sx={{
                    "& .MuiSelect-select": { fontFamily: "'Montserrat', sans-serif" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
                }}
            >
                <MenuItem value="">Prioridad (Todas)</MenuItem>
                <MenuItem value="Alta">Alta</MenuItem>
                <MenuItem value="Media">Media</MenuItem>
                <MenuItem value="Baja">Baja</MenuItem>
            </Select>
        </FormControl>

        {/* Filtro Fecha Inicio */}
        <TextField
            label="Fecha Inicio"
            type="date"
            value={filtros.fechaInicio}
            onChange={(e) => cambiarFiltro("fechaInicio", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
                "& .MuiInputLabel-root": { fontFamily: "'Montserrat', sans-serif", fontWeight: 500 },
                "& .MuiInputBase-root": { fontFamily: "'Montserrat', sans-serif" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
            }}
        />

        {/* Filtro Fecha Fin */}
        <TextField
            label="Fecha Fin"
            type="date"
            value={filtros.fechaFin}
            onChange={(e) => cambiarFiltro("fechaFin", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
                "& .MuiInputLabel-root": { fontFamily: "'Montserrat', sans-serif", fontWeight: 500 },
                "& .MuiInputBase-root": { fontFamily: "'Montserrat', sans-serif" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
            }}
        />

        {/* Filtro Buscar */}
        <TextField
            label="Buscar descripción"
            type="text"
            value={filtros.busqueda}
            placeholder="Buscar descripción..."
            onChange={(e) => cambiarFiltro("busqueda", e.target.value)}
            sx={{
                "& .MuiInputLabel-root": { fontFamily: "'Montserrat', sans-serif", fontWeight: 500 },
                "& .MuiInputBase-root": { fontFamily: "'Montserrat', sans-serif" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1d4ed8" },
            }}
        />

        {/* Botones de Aplicar y Limpiar */}
        <Box sx={{ display: "flex", gap: "16px" }}>
            <Button
                variant="contained"
                onClick={aplicarFiltros}
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
                onClick={restablecerFiltros}
                sx={{
                    borderColor: "#1d4ed8",
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

export default FiltrosDeIncidentes;
