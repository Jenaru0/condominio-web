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

const FormularioReserva = ({ open, onClose, reserva, onSave, users, areas }) => {
    const [form, setForm] = useState({
        usuario_id: "",
        area_comun: "",
        fecha_reserva: "",
        hora_inicio: "",
        hora_fin: "",
        estado: "Pendiente",
    });

    useEffect(() => {
        if (reserva) {
            setForm(reserva);
        } else {
            setForm({
                usuario_id: "",
                area_comun: "",
                fecha_reserva: "",
                hora_inicio: "",
                hora_fin: "",
                estado: "Pendiente",
            });
        }
    }, [reserva]);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (
            !form.usuario_id ||
            !form.area_comun ||
            !form.fecha_reserva ||
            !form.hora_inicio ||
            !form.hora_fin
        ) {
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
                    {reserva ? "Editar Reserva" : "Crear Reserva"}
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
                        <FormControl fullWidth>
                            <InputLabel>Usuario</InputLabel>
                            <Select
                                value={form.usuario_id}
                                onChange={(e) => handleChange("usuario_id", e.target.value)}
                            >
                                <MenuItem value="">Seleccionar Usuario</MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Área Común</InputLabel>
                            <Select
                                value={form.area_comun}
                                onChange={(e) => handleChange("area_comun", e.target.value)}
                            >
                                <MenuItem value="">Seleccionar Área Común</MenuItem>
                                {areas.map((area) => (
                                    <MenuItem key={area} value={area}>
                                        {area}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Fecha"
                            type="date"
                            value={form.fecha_reserva}
                            onChange={(e) => handleChange("fecha_reserva", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <TextField
                                label="Hora Inicio"
                                type="time"
                                value={form.hora_inicio}
                                onChange={(e) => handleChange("hora_inicio", e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Hora Fin"
                                type="time"
                                value={form.hora_fin}
                                onChange={(e) => handleChange("hora_fin", e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={form.estado}
                                onChange={(e) => handleChange("estado", e.target.value)}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="Confirmada">Confirmada</MenuItem>
                                <MenuItem value="Cancelada">Cancelada</MenuItem>
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
                        {reserva ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioReserva;
