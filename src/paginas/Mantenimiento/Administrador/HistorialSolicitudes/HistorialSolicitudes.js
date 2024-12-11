import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EncabezadoHistorialSolicitudes from "./EncabezadoHistorialSolicitudes";
import FiltrosHistorialSolicitudes from "./FiltrosHistorialSolicitudes";
import ListaHistorialSolicitudes from "./ListaHistorialSolicitudes";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const HistorialSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockData = [
            {
                id: 1,
                residente: "Juan Pérez",
                fechaSolicitud: "2024-12-01",
                asunto: "Problema eléctrico",
                descripcion: "Cambio de cableado",
                estado: "Resuelto",
                fechaResolucion: "2024-12-03",
            },
            {
                id: 2,
                residente: "María López",
                fechaSolicitud: "2024-11-28",
                asunto: "Fuga de agua",
                descripcion: "Reparación de tuberías",
                estado: "Cancelado",
                fechaResolucion: null,
            },
        ];

        setTimeout(() => {
            setSolicitudes(mockData);
            setFilteredSolicitudes(mockData.filter((s) => ["Resuelto", "Cancelado"].includes(s.estado)));
            setLoading(false);
        }, 2000);
    }, []);

    const handleFilter = (filters) => {
        const { estado, residente, fechaDesde, fechaHasta } = filters;
        const filtered = solicitudes.filter((s) => {
            const matchesEstado = !estado || s.estado === estado;
            const matchesResidente = !residente || s.residente.toLowerCase().includes(residente.toLowerCase());
            const matchesFechaDesde = !fechaDesde || new Date(s.fechaSolicitud) >= new Date(fechaDesde);
            const matchesFechaHasta = !fechaHasta || new Date(s.fechaSolicitud) <= new Date(fechaHasta);

            return matchesEstado && matchesResidente && matchesFechaDesde && matchesFechaHasta;
        });
        setFilteredSolicitudes(filtered);
    };

    if (loading) {
        return <LoadingSpinner text="Cargando historial de solicitudes..." />;
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            <EncabezadoHistorialSolicitudes />
            <FiltrosHistorialSolicitudes onFilter={handleFilter} />
            <ListaHistorialSolicitudes solicitudes={filteredSolicitudes} />
        </Box>
    );
};

export default HistorialSolicitudes;
