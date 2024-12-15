import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import FiltrosSolicitudes from "./FiltrosSolicitudes";
import ListaSolicitudesMantenimiento from "./ListaSolicitudesMantenimiento";
import FormularioSolicitudMantenimiento from "./FormularioSolicitudMantenimiento";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";

const SolicitudesMantenimiento = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
    const [filtros, setFiltros] = useState({ estado: "", residente: "", fecha: "" });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [solicitudToDelete, setSolicitudToDelete] = useState(null);

    // Simulación de carga de datos
    useEffect(() => {
        const mockData = [
            {
                id: 1,
                residente: "Juan Pérez",
                fecha: "2024-12-10",
                asunto: "Problema de gasfitería",
                descripcion: "Reparación de tuberías",
                estado: "Pendiente",
                estadoColor: "#facc15",
            },
            {
                id: 2,
                residente: "María López",
                fecha: "2024-12-08",
                asunto: "Problema eléctrico",
                descripcion: "Cambio de cableado",
                estado: "En Progreso",
                estadoColor: "#3b82f6",
            },
            {
                id: 3,
                residente: "Carlos Gómez",
                fecha: "2024-11-30",
                asunto: "Problema general",
                descripcion: "Revisión de puertas",
                estado: "Resuelto",
                estadoColor: "#22c55e",
            },
        ];

        setTimeout(() => {
            setSolicitudes(mockData);
            setFilteredSolicitudes(mockData);
            setLoading(false);
        }, 2000);
    }, []);

    // Abrir y cerrar diálogo
    const handleOpenDialog = (solicitud = null) => {
        setSelectedSolicitud(solicitud);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedSolicitud(null);
        setDialogOpen(false);
    };

    // Guardar cambios
    const handleSave = (form) => {
        if (selectedSolicitud) {
            setSolicitudes((prev) =>
                prev.map((s) => (s.id === selectedSolicitud.id ? { ...form } : s))
            );
        } else {
            setSolicitudes((prev) => [...prev, { ...form, id: prev.length + 1 }]);
        }
        filterSolicitudes();
        handleCloseDialog();
    };

    // Confirmación de eliminación
    const handleOpenDeleteDialog = (solicitud) => {
        setSolicitudToDelete(solicitud);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setSolicitudToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        setSolicitudes((prev) => prev.filter((s) => s.id !== solicitudToDelete.id));
        filterSolicitudes();
        handleCloseDeleteDialog();
    };

    // Filtrar solicitudes
    const filterSolicitudes = () => {
        const filtered = solicitudes.filter((solicitud) => {
            const matchesEstado = !filtros.estado || solicitud.estado === filtros.estado;
            const matchesResidente =
                !filtros.residente ||
                solicitud.residente.toLowerCase().includes(filtros.residente.toLowerCase());
            const matchesFecha = !filtros.fecha || solicitud.fecha === filtros.fecha;

            return matchesEstado && matchesResidente && matchesFecha;
        });

        setFilteredSolicitudes(filtered);
    };

    const resetFilters = () => {
        setFiltros({ estado: "", residente: "", fecha: "" });
        setFilteredSolicitudes(solicitudes);
    };

    const handleSearch = () => {
        filterSolicitudes();
    };

    if (loading) {
        return <LoadingSpinner text="Cargando solicitudes de mantenimiento..." />;
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            {/* Encabezado común con botón reutilizable */}
            <div className="flex justify-between items-center mb-8">
                <Encabezado titulo="Solicitudes de Mantenimiento" />
                <Boton label="+ Nueva Solicitud" onClick={() => handleOpenDialog()} />
            </div>

            {/* Filtros de solicitudes */}
            <FiltrosSolicitudes
                filtros={filtros}
                setFiltros={setFiltros}
                onSearch={handleSearch}
                resetFilters={resetFilters}
            />

            {/* Lista de solicitudes */}
            <ListaSolicitudesMantenimiento
                solicitudes={filteredSolicitudes}
                onEdit={handleOpenDialog}
                onDelete={handleOpenDeleteDialog}
            />

            {/* Formulario de solicitud */}
            {dialogOpen && (
                <FormularioSolicitudMantenimiento
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    solicitud={selectedSolicitud}
                    onSave={handleSave}
                />
            )}

            {/* Confirmación de eliminación */}
            <ConfirmacionEliminacion
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                text="¿Estás seguro de eliminar esta solicitud?"
            />
        </Box>
    );
};

export default SolicitudesMantenimiento;
