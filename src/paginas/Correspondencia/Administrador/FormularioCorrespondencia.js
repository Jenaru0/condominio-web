import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioCorrespondencia = ({
                                       open,
                                       onClose,
                                       form,
                                       setForm,
                                       users,
                                       isEditing,
                                       handleSubmit,
                                   }) => {
    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleFormSubmit = () => {
        if (!form.usuario_id || !form.tipo_correspondencia || !form.descripcion) {
            alert("Los campos Usuario, Tipo y Descripción son obligatorios.");
            return;
        }
        handleSubmit();
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
                    {isEditing ? "Editar Correspondencia" : "Crear Correspondencia"}
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
                        {/* Usuario */}
                        <FormControl fullWidth>
                            <InputLabel>Usuario</InputLabel>
                            <Select
                                value={form.usuario_id}
                                onChange={(e) => handleChange("usuario_id", e.target.value)}
                                required
                            >
                                <MenuItem value="">Seleccionar Usuario</MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Tipo de Correspondencia */}
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Correspondencia</InputLabel>
                            <Select
                                value={form.tipo_correspondencia}
                                onChange={(e) =>
                                    handleChange("tipo_correspondencia", e.target.value)
                                }
                                required
                            >
                                <MenuItem value="Paquete">Paquete</MenuItem>
                                <MenuItem value="Carta">Carta</MenuItem>
                                <MenuItem value="Notificación">Notificación</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Descripción */}
                        <TextField
                            label="Descripción"
                            fullWidth
                            value={form.descripcion}
                            onChange={(e) => handleChange("descripcion", e.target.value)}
                            required
                        />

                        {/* Fecha de Recepción */}
                        <TextField
                            label="Fecha de Recepción"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={form.fecha_recepcion}
                            onChange={(e) =>
                                handleChange("fecha_recepcion", e.target.value)
                            }
                            required
                        />

                        {/* Estado */}
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={form.estado}
                                onChange={(e) => handleChange("estado", e.target.value)}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="Entregado">Entregado</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Notificado */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.notificado}
                                    onChange={(e) =>
                                        handleChange("notificado", e.target.checked)
                                    }
                                />
                            }
                            label="Notificado"
                            sx={{
                                fontWeight: 600,
                                color: "#374151",
                            }}
                        />
                    </Box>
                </DialogContent>

                {/* Botones */}
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
                        onClick={handleFormSubmit}
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
                        {isEditing ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioCorrespondencia;
