import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EncabezadoAreas from "./EncabezadoAreas";
import ListaAreas from "./ListaAreas";
import FormularioArea from "./FormularioArea";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const ConfiguracionAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const cargarDatos = () => {
      const mockAreas = [
        {
          id: 1,
          nombre: "Piscina",
          capacidad_maxima: 20,
          ubicacion: "Edificio A",
          horario_inicio: "09:00",
          horario_fin: "18:00",
          estado: "Activo",
        },
        {
          id: 2,
          nombre: "Sala de Eventos",
          capacidad_maxima: 50,
          ubicacion: "Edificio B",
          horario_inicio: "10:00",
          horario_fin: "20:00",
          estado: "Activo",
        },
        {
          id: 3,
          nombre: "Gimnasio",
          capacidad_maxima: 15,
          ubicacion: "Edificio A",
          horario_inicio: "06:00",
          horario_fin: "22:00",
          estado: "Inactivo",
        },
      ];

      setTimeout(() => {
        setAreas(mockAreas);
        setLoading(false);
      }, 3000); // Simulación de retraso de 3 segundos
    };

    cargarDatos();
  }, []);

  const handleOpenDialog = (area = null) => {
    setSelectedArea(area);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedArea(null);
    setDialogOpen(false);
  };

  const handleSave = (form) => {
    if (selectedArea) {
      // Actualizar área existente
      setAreas((prev) =>
          prev.map((a) => (a.id === selectedArea.id ? { ...form } : a))
      );
    } else {
      // Crear nueva área
      setAreas((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta área?")) {
      setAreas((prev) => prev.filter((area) => area.id !== id));
    }
  };

  if (loading) {
    return <LoadingSpinner text="Cargando áreas comunes..." />;
  }

  return (
      <Box
          sx={{
            padding: 4,
            backgroundColor: "#f3f4f6",
            minHeight: "100vh",
            fontFamily: "'Montserrat', sans-serif",
          }}
      >
        <EncabezadoAreas onAdd={() => handleOpenDialog()} />
        <ListaAreas
            areas={areas}
            onEdit={handleOpenDialog}
            onDelete={handleDelete}
        />
        {dialogOpen && (
            <FormularioArea
                open={dialogOpen}
                onClose={handleCloseDialog}
                area={selectedArea}
                onSave={handleSave}
            />
        )}
      </Box>
  );
};

export default ConfiguracionAreas;
