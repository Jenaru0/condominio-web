import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioReglamento = ({ open, onClose, reglamento, onSave }) => {
    const [form, setForm] = useState(
        reglamento || {
            nombre_documento: "",
            tipo: "Reglamento",
            estado: "Vigente",
            fecha_expiracion: "",
        }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.nombre_documento || !form.fecha_expiracion) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        onSave({ ...form, id: reglamento?.id || Date.now() });
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
                    {reglamento ? "Editar Reglamento" : "Crear Reglamento"}
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        padding: "24px",
                        backgroundColor: "#f9fafb",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: "#6b7280",
                            marginBottom: "16px",
                            textAlign: "center",
                        }}
                    >
                        Completa los siguientes campos para {reglamento ? "editar" : "crear"} un reglamento.
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <TextField
                            label="Nombre del Reglamento"
                            fullWidth
                            value={form.nombre_documento}
                            onChange={(e) => handleChange("nombre_documento", e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={form.estado}
                                onChange={(e) => handleChange("estado", e.target.value)}
                            >
                                <MenuItem value="Vigente">Vigente</MenuItem>
                                <MenuItem value="Expirado">Expirado</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Fecha de Expiración"
                            type="date"
                            value={form.fecha_expiracion}
                            onChange={(e) => handleChange("fecha_expiracion", e.target.value)}
                            InputLabelProps={{ shrink: true }}
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
                            backgroundColor: "#1d4ed8",
                            "&:hover": { backgroundColor: "#1e40af" },
                        }}
                    >
                        {reglamento ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioReglamento;
