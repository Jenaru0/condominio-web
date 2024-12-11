import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioOperativo = ({ open, onClose, operativo, onSave }) => {
    const [form, setForm] = useState(
        operativo || {
            fecha: "",
            categoria: "",
            estado: "",
            descripcion: "",
        }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.fecha || !form.categoria || !form.estado || !form.descripcion) {
            alert("Todos los campos son obligatorios.");
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
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                    fontFamily: "'Montserrat', sans-serif",
                },
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8rem" }}>
                    {operativo ? "Editar Operativo" : "Agregar Operativo"}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#f9fafb", padding: "24px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <TextField
                            label="Fecha"
                            type="date"
                            fullWidth
                            value={form.fecha}
                            onChange={(e) => handleChange("fecha", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                value={form.categoria}
                                onChange={(e) => handleChange("categoria", e.target.value)}
                            >
                                <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
                                <MenuItem value="Ocupación">Ocupación</MenuItem>
                                <MenuItem value="Eventos">Eventos</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={form.estado}
                                onChange={(e) => handleChange("estado", e.target.value)}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="En Proceso">En Proceso</MenuItem>
                                <MenuItem value="Finalizado">Finalizado</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Descripción"
                            multiline
                            rows={4}
                            fullWidth
                            value={form.descripcion}
                            onChange={(e) => handleChange("descripcion", e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#f9fafb", padding: "16px" }}>
                    <Button onClick={onClose} sx={{ color: "#6b7280" }}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: "#1d4ed8",
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#2563eb" },
                        }}
                    >
                        {operativo ? "Guardar Cambios" : "Agregar"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioOperativo;
