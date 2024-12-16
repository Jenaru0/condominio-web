import React, { useState } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    MenuItem,
    Typography,
    Select,
    Modal,
    Button,
    Grid,
    CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Send, Visibility, Delete } from "@mui/icons-material";
import Encabezado from "../../../../componentes/comunes/Encabezado";

const EnviarNotificaciones = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        audiencia: [],
        plantilla: "",
        asunto: "",
        mensaje: "",
        urgente: false,
        usuariosSeleccionados: "",
    });
    const [openModal, setOpenModal] = useState(false);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);

    // Manejar cambios en los campos
    const handleChange = (field, value) => setForm({ ...form, [field]: value });

    const handleCheckboxChange = (value) => {
        const audiencia = form.audiencia.includes(value)
            ? form.audiencia.filter((item) => item !== value)
            : [...form.audiencia, value];
        setForm({ ...form, audiencia });
    };

    const handleSubmit = () => {
        if (!form.asunto || !form.mensaje) {
            alert("Por favor completa el Asunto y el Mensaje.");
            return;
        }
        if (form.audiencia.includes("Seleccionar usuarios específicos") && !form.usuariosSeleccionados) {
            alert("Por favor selecciona los usuarios específicos.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenModal(true);
        }, 2000);
    };

    const handlePreview = () => setOpenPreviewModal(true);

    const handleReset = () => {
        setForm({
            audiencia: [],
            plantilla: "",
            asunto: "",
            mensaje: "",
            urgente: false,
            usuariosSeleccionados: "",
        });
    };

    const handleModalClose = () => setOpenModal(false);
    const handlePreviewClose = () => setOpenPreviewModal(false);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size={50} />
                <Typography sx={{ marginLeft: 2 }}>Enviando notificación...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            {/* Encabezado */}
            <Encabezado titulo="Enviar Notificaciones" />

            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: "24px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    marginTop: 4,
                }}
            >
                {/* Formulario */}
                <Grid container spacing={2}>
                    {/* Audiencia */}
                    <Grid item xs={12}>
                        <Typography variant="h6">Audiencia:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={2}>
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
                    </Grid>

                    {/* Selección de usuarios específicos */}
                    {form.audiencia.includes("Seleccionar usuarios específicos") && (
                        <Grid item xs={12}>
                            <TextField
                                label="Usuarios Específicos"
                                placeholder="Escribe usuarios separados por comas"
                                value={form.usuariosSeleccionados}
                                onChange={(e) => handleChange("usuariosSeleccionados", e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    )}

                    {/* Plantilla */}
                    <Grid item xs={12}>
                        <Typography variant="h6">Plantilla de Notificación:</Typography>
                        <Select
                            value={form.plantilla}
                            onChange={(e) => handleChange("plantilla", e.target.value)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Selecciona una plantilla</em>
                            </MenuItem>
                            <MenuItem value="Recordatorio de Pago">Recordatorio de Pago</MenuItem>
                            <MenuItem value="Aviso de Seguridad">Aviso de Seguridad</MenuItem>
                            <MenuItem value="Evento Especial">Evento Especial</MenuItem>
                        </Select>
                    </Grid>

                    {/* Asunto */}
                    <Grid item xs={12}>
                        <TextField
                            label="Asunto"
                            placeholder="Asunto de la notificación"
                            value={form.asunto}
                            onChange={(e) => handleChange("asunto", e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    {/* Mensaje */}
                    <Grid item xs={12}>
                        <TextField
                            label="Mensaje"
                            placeholder="Escribe tu mensaje aquí..."
                            value={form.mensaje}
                            onChange={(e) => handleChange("mensaje", e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>

                    {/* Urgente */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.urgente}
                                    onChange={(e) => handleChange("urgente", e.target.checked)}
                                />
                            }
                            label="Marcar como urgente"
                        />
                    </Grid>

                    {/* Botones */}
                    <Grid item xs={12} display="flex" justifyContent="space-between">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleReset}>
                                Limpiar campos
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button variant="contained" color="primary" startIcon={<Visibility />} onClick={handlePreview}>
                                Previsualizar
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
                                startIcon={<Send />}
                                onClick={handleSubmit}
                            >
                                Enviar notificación
                            </Button>
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>

            {/* Modal de confirmación */}
            <Modal open={openModal} onClose={handleModalClose}>
                <Box sx={modalStyles}>
                    <Typography variant="h6">¡Notificación Enviada!</Typography>
                    <Typography>La notificación fue enviada correctamente.</Typography>
                    <Button onClick={handleModalClose} variant="contained" sx={{ marginTop: 2 }}>
                        Cerrar
                    </Button>
                </Box>
            </Modal>

            {/* Modal de previsualización */}
            <Modal open={openPreviewModal} onClose={handlePreviewClose}>
                <Box sx={modalStyles}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Previsualización
                    </Typography>
                    <Box
                        sx={{
                            textAlign: "left",
                            backgroundColor: "#f4f4f4",
                            padding: "16px",
                            borderRadius: "8px",
                            overflowX: "auto",
                            maxHeight: "300px",
                        }}
                    >
                        <Typography variant="body1">
                            <strong>Audiencia:</strong> {form.audiencia.join(", ") || "N/A"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Plantilla:</strong> {form.plantilla || "N/A"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Asunto:</strong> {form.asunto || "N/A"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Mensaje:</strong> {form.mensaje || "N/A"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Urgente:</strong> {form.urgente ? "Sí" : "No"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Usuarios Seleccionados:</strong>{" "}
                            {form.usuariosSeleccionados || "N/A"}
                        </Typography>
                    </Box>
                    <Button onClick={handlePreviewClose} variant="contained" sx={{ marginTop: 2 }}>
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: 24,
    maxWidth: "500px",
    textAlign: "center",
};

export default EnviarNotificaciones;
