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
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioCochera = ({ open, onClose, cochera, onSave, users }) => {
    const [form, setForm] = useState(
        cochera || {
            numero: "",
            nivel: "",
            edificio: "",
            estado: "Disponible",
            usuario_asignado: "",
        }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.numero || !form.nivel || !form.edificio) {
            alert("Los campos Número, Nivel y Edificio son obligatorios.");
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
                    {cochera ? "Editar Cochera" : "Crear Cochera"}
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
                            label="Número de Cochera"
                            fullWidth
                            value={form.numero}
                            onChange={(e) => handleChange("numero", e.target.value)}
                        />
                        <TextField
                            label="Nivel"
                            fullWidth
                            value={form.nivel}
                            onChange={(e) => handleChange("nivel", e.target.value)}
                        />
                        <TextField
                            label="Edificio"
                            fullWidth
                            value={form.edificio}
                            onChange={(e) => handleChange("edificio", e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={form.estado}
                                onChange={(e) => handleChange("estado", e.target.value)}
                            >
                                <MenuItem value="Disponible">Disponible</MenuItem>
                                <MenuItem value="Asignado">Asignado</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Usuario Asignado</InputLabel>
                            <Select
                                value={form.usuario_asignado}
                                onChange={(e) => handleChange("usuario_asignado", e.target.value)}
                                disabled={form.estado === "Disponible"}
                            >
                                <MenuItem value="">No asignado</MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name}
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
                            backgroundColor: "#3b82f6",
                            "&:hover": { backgroundColor: "#2563eb" },
                        }}
                    >
                        {cochera ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioCochera;