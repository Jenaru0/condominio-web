import React from "react";
import { Box, Button } from "@mui/material";

// Componente de Filtros de Incidentes
const FiltrosDeIncidentes = ({ filtros, cambiarFiltro, aplicarFiltros, restablecerFiltros }) => (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: "8px", boxShadow: 1, mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <select value={filtros.estado} onChange={(e) => cambiarFiltro("estado", e.target.value)} className="border rounded-lg px-4 py-2">
            <option value="">Estado (Todos)</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Resuelto">Resuelto</option>
        </select>
        <select value={filtros.prioridad} onChange={(e) => cambiarFiltro("prioridad", e.target.value)} className="border rounded-lg px-4 py-2">
            <option value="">Prioridad (Todas)</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
        </select>
        <input type="date" value={filtros.fechaInicio} onChange={(e) => cambiarFiltro("fechaInicio", e.target.value)} className="border rounded-lg px-4 py-2" />
        <input type="date" value={filtros.fechaFin} onChange={(e) => cambiarFiltro("fechaFin", e.target.value)} className="border rounded-lg px-4 py-2" />
        <input type="text" value={filtros.busqueda} placeholder="Buscar descripción..." onChange={(e) => cambiarFiltro("busqueda", e.target.value)} className="border rounded-lg px-4 py-2" />
        <Button variant="contained" onClick={aplicarFiltros} sx={{ backgroundColor: "#1d4ed8" }}>
            Aplicar
        </Button>
        <Button variant="outlined" onClick={restablecerFiltros} sx={{ borderColor: "#1d4ed8", color: "#1d4ed8" }}>
            Limpiar
        </Button>
    </Box>
);

export default FiltrosDeIncidentes;
