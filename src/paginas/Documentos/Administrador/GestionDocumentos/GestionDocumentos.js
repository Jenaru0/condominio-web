import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EncabezadoGestionDocumentos from "./EncabezadoGestionDocumentos";
import FiltrosDocumentos from "./FiltrosDocumentos";
import TablaDocumentos from "./TablaDocumentos";
import FormularioDocumento from "./FormularioDocumento";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import ConfirmacionEliminacion from "../../../../componentes/comunes/ConfirmacionEliminacion";

const GestionDocumentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [filteredDocumentos, setFilteredDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    nombre: "",
    tipo: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const mockDocumentos = [
      {
        _id: "1",
        nombre_documento: "Contrato de Mantenimiento 2024",
        tipo: "Contrato",
        estado: "Vigente",
        fecha_expiracion: "2024-12-31",
        documento_url: "https://example.com/documento1.pdf",
      },
      {
        _id: "2",
        nombre_documento: "Reglamento Interno 2023",
        tipo: "Reglamento",
        estado: "Expirado",
        fecha_expiracion: "2023-11-30",
        documento_url: "https://example.com/documento2.pdf",
      },
    ];

    setTimeout(() => {
      setDocumentos(mockDocumentos);
      setFilteredDocumentos(mockDocumentos);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const applyFilters = () => {
    const filtered = documentos.filter((doc) => {
      const matchesNombre = !filters.nombre || doc.nombre_documento.toLowerCase().includes(filters.nombre.toLowerCase());
      const matchesTipo = !filters.tipo || doc.tipo === filters.tipo;
      const matchesEstado = !filters.estado || doc.estado === filters.estado;
      const matchesFechaInicio = !filters.fechaInicio || new Date(doc.fecha_expiracion) >= new Date(filters.fechaInicio);
      const matchesFechaFin = !filters.fechaFin || new Date(doc.fecha_expiracion) <= new Date(filters.fechaFin);
      return matchesNombre && matchesTipo && matchesEstado && matchesFechaInicio && matchesFechaFin;
    });
    setFilteredDocumentos(filtered);
  };

  const resetFilters = () => {
    setFilters({
      nombre: "",
      tipo: "",
      estado: "",
      fechaInicio: "",
      fechaFin: "",
    });
    setFilteredDocumentos(documentos);
  };

  const handleOpenDialog = (documento = null) => {
    setSelectedDocumento(documento);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedDocumento(null);
    setDialogOpen(false);
  };

  const handleSave = (form) => {
    if (selectedDocumento) {
      setDocumentos((prev) =>
          prev.map((doc) => (doc._id === selectedDocumento._id ? { ...form, _id: doc._id } : doc))
      );
    } else {
      setDocumentos((prev) => [...prev, { ...form, _id: Date.now().toString() }]);
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
    setDocumentos((prev) => prev.filter((doc) => doc._id !== deleteId));
    applyFilters();
    closeConfirmDialog();
  };

  if (loading) return <LoadingSpinner text="Cargando documentos..." />;

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        <EncabezadoGestionDocumentos onAdd={() => handleOpenDialog()} />
        <FiltrosDocumentos
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
        />
        <TablaDocumentos
            documentos={filteredDocumentos}
            onView={(url) => window.open(url, "_blank")}
            onEdit={(doc) => handleOpenDialog(doc)}
            onDelete={(id) => openConfirmDialog(id)}
        />
        {dialogOpen && (
            <FormularioDocumento
                open={dialogOpen}
                onClose={handleCloseDialog}
                documento={selectedDocumento}
                onSave={handleSave}
            />
        )}
        {confirmDialogOpen && (
            <ConfirmacionEliminacion
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                onConfirm={handleDelete}
                text="¿Estás seguro de eliminar este documento?"
            />
        )}
      </Box>
  );
};

export default GestionDocumentos;
