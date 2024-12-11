import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioArea = ({ open, onClose, area, onSave }) => {
    const [form, setForm] = useState({
        nombre: "",
        capacidad_maxima: "",
        ubicacion: "",
        horario_inicio: "",
        horario_fin: "",
        estado: "Activo",
    });

    useEffect(() => {
        if (area) {
            setForm(area);
        }
    }, [area]);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.nombre || !form.capacidad_maxima || !form.ubicacion) {
            alert("Por favor, complete todos los campos obligatorios.");
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
                    {area ? "Editar Área Común" : "Crear Área Común"}
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
                            label="Nombre del Área"
                            fullWidth
                            value={form.nombre}
                            onChange={(e) => handleChange("nombre", e.target.value)}
                            required
                        />
                        <TextField
                            label="Capacidad Máxima"
                            type="number"
                            fullWidth
                            value={form.capacidad_maxima}
                            onChange={(e) => handleChange("capacidad_maxima", e.target.value)}
                            required
                        />
                        <TextField
                            label="Ubicación"
                            fullWidth
                            value={form.ubicacion}
                            onChange={(e) => handleChange("ubicacion", e.target.value)}
                            required
                        />
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <TextField
                                label="Horario Inicio"
                                type="time"
                                fullWidth
                                value={form.horario_inicio}
                                onChange={(e) => handleChange("horario_inicio", e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                            <TextField
                                label="Horario Fin"
                                type="time"
                                fullWidth
                                value={form.horario_fin}
                                onChange={(e) => handleChange("horario_fin", e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Box>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={form.estado}
                                onChange={(e) => handleChange("estado", e.target.value)}
                            >
                                <MenuItem value="Activo">Activo</MenuItem>
                                <MenuItem value="Inactivo">Inactivo</MenuItem>
                            </Select>
                        </FormControl>
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
                            "&:hover": { backgroundColor: "#2563eb" },
                        }}
                    >
                        {area ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioArea;
