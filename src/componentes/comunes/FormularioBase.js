import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Box,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioBase = ({ open, onClose, title, initialData, fields, onSave }) => {
    const [form, setForm] = useState(initialData || {});

    useEffect(() => {
        setForm(initialData || {});
    }, [initialData]);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        const emptyField = fields.find((f) => f.required && !form[f.name]);
        if (emptyField) {
            alert(`El campo ${emptyField.label} es obligatorio.`);
            return;
        }
        onSave(form);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <DialogTitle sx={{ fontWeight: 700, color: "#374151", textAlign: "center", fontSize: "1.8rem" }}>
                    {title}
                </DialogTitle>
                <DialogContent dividers sx={{ padding: "24px", backgroundColor: "#f9fafb" }}>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {fields.map((field) => {
                            if (field.type === "select") {
                                return (
                                    <FormControl fullWidth key={field.name}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select
                                            value={form[field.name] || ""}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                        >
                                            <MenuItem value="">Seleccionar</MenuItem>
                                            {field.options.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                );
                            }
                            return (
                                <TextField
                                    key={field.name}
                                    label={field.label}
                                    type={field.type || "text"}
                                    fullWidth
                                    value={form[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            );
                        })}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: "16px 24px", backgroundColor: "#f9fafb" }}>
                    <Button onClick={onClose} sx={{ color: "#6b7280", textTransform: "none", fontWeight: 600 }}>
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
                        Guardar
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioBase;
