import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EncabezadoReglamentos from "./EncabezadoReglamentos";
import FiltrosReglamentos from "./FiltrosReglamentos";
import TablaReglamentos from "./TablaReglamentos";
import FormularioReglamento from "./FormularioReglamento";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";

const GestionReglamentos = () => {
    const [reglamentos, setReglamentos] = useState([]);
    const [filteredReglamentos, setFilteredReglamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        nombre: "",
        estado: "",
        fechaInicio: "",
        fechaFin: "",
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedReglamento, setSelectedReglamento] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const mockReglamentos = [
            {
                _id: "1",
                nombre_documento: "Reglamento Interno 2023",
                estado: "Vigente",
                fecha_expiracion: "2024-12-31",
                documento_url: "https://example.com/reglamento1.pdf",
            },
            {
                _id: "2",
                nombre_documento: "Normas de Convivencia 2022",
                estado: "Expirado",
                fecha_expiracion: "2023-11-30",
                documento_url: "https://example.com/reglamento2.pdf",
            },
        ];

        setTimeout(() => {
            setReglamentos(mockReglamentos);
            setFilteredReglamentos(mockReglamentos);
            setLoading(false);
        }, 1000);
    }, []);

    const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

    const applyFilters = () => {
        const filtered = reglamentos.filter((reglamento) => {
            const matchesNombre =
                !filters.nombre || reglamento.nombre_documento.toLowerCase().includes(filters.nombre.toLowerCase());
            const matchesEstado = !filters.estado || reglamento.estado === filters.estado;
            const matchesFechaInicio =
                !filters.fechaInicio || new Date(reglamento.fecha_expiracion) >= new Date(filters.fechaInicio);
            const matchesFechaFin =
                !filters.fechaFin || new Date(reglamento.fecha_expiracion) <= new Date(filters.fechaFin);
            return matchesNombre && matchesEstado && matchesFechaInicio && matchesFechaFin;
        });
        setFilteredReglamentos(filtered);
    };

    const resetFilters = () => {
        setFilters({
            nombre: "",
            estado: "",
            fechaInicio: "",
            fechaFin: "",
        });
        setFilteredReglamentos(reglamentos);
    };

    const handleOpenDialog = (reglamento = null) => {
        setSelectedReglamento(reglamento);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedReglamento(null);
        setDialogOpen(false);
    };

    const handleSave = (form) => {
        if (selectedReglamento) {
            setReglamentos((prev) =>
                prev.map((reg) => (reg._id === selectedReglamento._id ? { ...form, _id: reg._id } : reg))
            );
        } else {
            setReglamentos((prev) => [...prev, { ...form, _id: Date.now().toString() }]);
        }
        applyFilters();
        handleCloseDialog();
    };

    const openConfirmDialog = (id) => {
        setDeleteId(id);
        setConfirmDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setDeleteId(null);
        setConfirmDialogOpen(false);
    };

    const handleDelete = () => {
        setReglamentos((prev) => prev.filter((reg) => reg._id !== deleteId));
        applyFilters();
        closeConfirmDialog();
    };

    if (loading) return <LoadingSpinner text="Cargando reglamentos..." />;

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            <EncabezadoReglamentos onAdd={() => handleOpenDialog()} />
            <FiltrosReglamentos
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
            />
            <TablaReglamentos
                reglamentos={filteredReglamentos}
                onView={(url) => window.open(url, "_blank")}
                onEdit={(doc) => handleOpenDialog(doc)}
                onDelete={(id) => openConfirmDialog(id)}
            />
            {dialogOpen && (
                <FormularioReglamento
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    reglamento={selectedReglamento}
                    onSave={handleSave}
                />
            )}
            {confirmDialogOpen && (
                <ConfirmacionEliminacion
                    open={confirmDialogOpen}
                    onClose={closeConfirmDialog}
                    onConfirm={handleDelete}
                    text="¿Estás seguro de eliminar este reglamento?"
                />
            )}
        </Box>
    );
};

export default GestionReglamentos;
