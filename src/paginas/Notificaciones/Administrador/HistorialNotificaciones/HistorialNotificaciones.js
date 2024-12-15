import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FiltroHistorialNotificaciones from "./FiltroHistorialNotificaciones";
import ListaHistorialNotificaciones from "./ListaHistorialNotificaciones";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import Encabezado from "../../../../componentes/comunes/Encabezado";

const HistorialNotificaciones = () => {
    const [loading, setLoading] = useState(true);
    const [notificaciones, setNotificaciones] = useState([]);
    const [filteredNotificaciones, setFilteredNotificaciones] = useState([]);
    const [filters, setFilters] = useState({
        busqueda: "",
        audiencia: "",
        fechaInicio: "",
        fechaFin: "",
    });

    useEffect(() => {
        // Simulación de datos
        const mockNotificaciones = [
            {
                id: "1",
                asunto: "Recordatorio de Pago",
                mensaje: "Por favor, realiza el pago antes del 10 de diciembre.",
                audiencia: "Residentes",
                fechaEnvio: "2023-12-05",
            },
            {
                id: "2",
                asunto: "Aviso de Seguridad",
                mensaje: "Se ha reportado un acceso no autorizado.",
                audiencia: "Todos",
                fechaEnvio: "2023-12-03",
            },
            {
                id: "3",
                asunto: "Evento Especial",
                mensaje: "Te invitamos al evento de fin de año el 20 de diciembre.",
                audiencia: "Residentes",
                fechaEnvio: "2023-12-01",
            },
        ];

        setTimeout(() => {
            setNotificaciones(mockNotificaciones);
            setFilteredNotificaciones(mockNotificaciones);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const filtered = notificaciones.filter((notificacion) => {
            const matchesBusqueda =
                notificacion.asunto.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
                notificacion.mensaje.toLowerCase().includes(filters.busqueda.toLowerCase());
            const matchesAudiencia =
                !filters.audiencia || notificacion.audiencia === filters.audiencia;
            const matchesFechaInicio =
                !filters.fechaInicio || new Date(notificacion.fechaEnvio) >= new Date(filters.fechaInicio);
            const matchesFechaFin =
                !filters.fechaFin || new Date(notificacion.fechaEnvio) <= new Date(filters.fechaFin);

            return matchesBusqueda && matchesAudiencia && matchesFechaInicio && matchesFechaFin;
        });

        setFilteredNotificaciones(filtered);
    }, [filters, notificaciones]);

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const handleApplyFilters = () => {
        console.log("Filtros aplicados:", filters);
    };

    const handleResetFilters = () => {
        setFilters({
            busqueda: "",
            audiencia: "",
            fechaInicio: "",
            fechaFin: "",
        });
    };

    if (loading) {
        return <LoadingSpinner text="Cargando historial de notificaciones..." />;
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            <div className="flex justify-between items-center mb-8">
                <Encabezado titulo="Historial de Notificaciones" />
            </div>

            <FiltroHistorialNotificaciones
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />

            <ListaHistorialNotificaciones filteredNotificaciones={filteredNotificaciones} />
        </Box>
    );
};

export default HistorialNotificaciones;
