import React, { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, MenuItem, Typography, Select } from "@mui/material";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";
import { motion } from "framer-motion";

// Encabezado
const EncabezadoNotificaciones = () => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-2">
        Enviar Notificaciones
      </h1>
    </motion.div>
);

const EnviarNotificaciones = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    audiencia: [],
    plantilla: "",
    asunto: "",
    mensaje: "",
    urgente: false,
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCheckboxChange = (value) => {
    const audiencia = form.audiencia.includes(value)
        ? form.audiencia.filter((item) => item !== value)
        : [...form.audiencia, value];
    setForm({ ...form, audiencia });
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Notificación enviada con éxito.");
    }, 2000);
  };

  const handlePreview = () => {
    alert("Previsualizar notificación:\n\n" + JSON.stringify(form, null, 2));
  };

  const handleReset = () => {
    setForm({
      audiencia: [],
      plantilla: "",
      asunto: "",
      mensaje: "",
      urgente: false,
    });
  };

  if (loading) {
    return <LoadingSpinner text="Enviando notificación..." />;
  }

  return (
      <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
        <EncabezadoNotificaciones />

        <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
        >
          {/* Audiencia */}
          <Typography variant="h6">Audiencia:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {["Todos", "Residentes", "Personal de Seguridad", "Técnicos", "Seleccionar usuarios específicos"].map(
                (audiencia) => (
                    <FormControlLabel
                        key={audiencia}
                        control={
                          <Checkbox
                              checked={form.audiencia.includes(audiencia)}
                              onChange={() => handleCheckboxChange(audiencia)}
                          />
                        }
                        label={audiencia}
                    />
                )
            )}
          </Box>

          {/* Plantilla */}
          <Typography variant="h6">Usar una Plantilla de Notificación:</Typography>
          <Select
              value={form.plantilla}
              onChange={(e) => handleChange("plantilla", e.target.value)}
              displayEmpty
              fullWidth
              sx={{ minWidth: "200px" }}
          >
            <MenuItem value="">
              <em>Selecciona una plantilla (opcional)</em>
            </MenuItem>
            <MenuItem value="Recordatorio de Pago">Recordatorio de Pago</MenuItem>
            <MenuItem value="Aviso de Seguridad">Aviso de Seguridad</MenuItem>
            <MenuItem value="Evento Especial">Evento Especial</MenuItem>
          </Select>

          {/* Asunto */}
          <Typography variant="h6">Asunto:</Typography>
          <TextField
              placeholder="Asunto de la notificación"
              value={form.asunto}
              onChange={(e) => handleChange("asunto", e.target.value)}
              fullWidth
          />

          {/* Mensaje */}
          <Typography variant="h6">Mensaje:</Typography>
          <TextField
              placeholder="Escribir el mensaje aquí..."
              value={form.mensaje}
              onChange={(e) => handleChange("mensaje", e.target.value)}
              fullWidth
              multiline
              rows={4}
          />

          {/* Notificación urgente */}
          <FormControlLabel
              control={
                <Checkbox
                    checked={form.urgente}
                    onChange={(e) => handleChange("urgente", e.target.checked)}
                />
              }
              label="Marcar como notificación urgente"
          />

          {/* Botones */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
            <Button
                variant="contained"
                sx={{ backgroundColor: "#22c55e", "&:hover": { backgroundColor: "#16a34a" } }}
                onClick={handleSubmit}
            >
              Enviar notificación
            </Button>
            <Button
                variant="outlined"
                sx={{ color: "#1d4ed8", borderColor: "#1d4ed8" }}
                onClick={handlePreview}
            >
              Previsualizar
            </Button>
            <Button
                variant="contained"
                sx={{ backgroundColor: "#ef4444", "&:hover": { backgroundColor: "#dc2626" } }}
                onClick={handleReset}
            >
              Limpiar campos
            </Button>
          </Box>
        </Box>
      </Box>
  );
};

export default EnviarNotificaciones;
