import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";

const estadoColores = {
    Pendiente: "#f59e0b", // Amarillo
    "En Progreso": "#3b82f6", // Azul
    Resuelto: "#10b981", // Verde
    Cancelado: "#ef4444", // Rojo
};

const FormularioSolicitudMantenimiento = ({ open, onClose, solicitud, onSave }) => {
    const [form, setForm] = useState(
        solicitud || {
            residente: "",
            fecha: "",
            asunto: "",
            descripcion: "",
            estado: "Pendiente",
        }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.residente || !form.fecha || !form.asunto || !form.descripcion || !form.estado) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        onSave({ ...form, id: solicitud?.id || Date.now() });
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
                    {solicitud ? "Editar Solicitud" : "Crear Solicitud"}
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
                        Completa los siguientes campos para {solicitud ? "editar" : "crear"} una solicitud.
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
                            label="Residente"
                            fullWidth
                            value={form.residente}
                            onChange={(e) => handleChange("residente", e.target.value)}
                            sx={{
                                "& .MuiInputLabel-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                },
                                "& .MuiInputBase-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                },
                            }}
                        />
                        <TextField
                            label="Fecha"
                            type="date"
                            fullWidth
                            value={form.fecha}
                            onChange={(e) => handleChange("fecha", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiInputLabel-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                },
                                "& .MuiInputBase-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                },
                            }}
                        />
                        <TextField
                            label="Asunto"
                            fullWidth
                            value={form.asunto}
                            onChange={(e) => handleChange("asunto", e.target.value)}
                            sx={{
                                "& .MuiInputLabel-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                },
                                "& .MuiInputBase-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                },
                            }}
                        />
                        <TextField
                            label="Descripción"
                            multiline
                            rows={4}
                            fullWidth
                            value={form.descripcion}
                            onChange={(e) => handleChange("descripcion", e.target.value)}
                            sx={{
                                "& .MuiInputLabel-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                },
                                "& .MuiInputBase-root": {
                                    fontFamily: "'Montserrat', sans-serif",
                                },
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={form.estado}
                                onChange={(e) => handleChange("estado", e.target.value)}
                                sx={{
                                    "& .MuiSelect-select": {
                                        backgroundColor: estadoColores[form.estado] || "#f3f4f6",
                                        color: "#ffffff",
                                        borderRadius: "4px",
                                    },
                                }}
                            >
                                {Object.keys(estadoColores).map((estado) => (
                                    <MenuItem key={estado} value={estado}>
                                        {estado}
                                    </MenuItem>
                                ))}
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
                            backgroundColor: "#1d4ed8",
                            fontFamily: "'Montserrat', sans-serif",
                            "&:hover": { backgroundColor: "#1e40af" },
                        }}
                    >
                        {solicitud ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioSolicitudMantenimiento;
