import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioEvento = ({ open, onClose, onSave, initialData }) => {
    const [form, setForm] = useState(
        initialData || {
            nombreEvento: "",
            fecha: "",
            asistencia: "",
            estado: "Pendiente",
        }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.nombreEvento || !form.fecha) {
            alert("Los campos Nombre del Evento y Fecha son obligatorios.");
            return;
        }
        onSave(form);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: "16px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                    fontFamily: "'Montserrat', sans-serif",
                },
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        color: "#374151",
                        textAlign: "center",
                        fontSize: "1.8rem",
                    }}
                >
                    {initialData ? "Editar Evento" : "Crear Evento"}
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        padding: "24px",
                        backgroundColor: "#f9fafb",
                    }}
                >
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <TextField
                            label="Nombre del Evento"
                            value={form.nombreEvento}
                            onChange={(e) => handleChange("nombreEvento", e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Fecha"
                            type="date"
                            value={form.fecha}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => handleChange("fecha", e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Asistencia Confirmada"
                            type="number"
                            value={form.asistencia}
                            onChange={(e) => handleChange("asistencia", e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Estado"
                            value={form.estado}
                            onChange={(e) => handleChange("estado", e.target.value)}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        padding: "16px 24px",
                        backgroundColor: "#f9fafb",
                    }}
                >
                    <Button
                        onClick={onClose}
                        sx={{
                            color: "#6b7280",
                            textTransform: "none",
                            fontWeight: 600,
                            fontFamily: "'Montserrat', sans-serif",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            padding: "10px 24px",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            backgroundColor: "#3b82f6",
                            fontFamily: "'Montserrat', sans-serif",
                            "&:hover": { backgroundColor: "#2563eb" },
                        }}
                    >
                        {initialData ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioEvento;
