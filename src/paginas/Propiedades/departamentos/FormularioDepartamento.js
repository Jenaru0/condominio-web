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

const FormularioDepartamento = ({
                                    open,
                                    onClose,
                                    departamento,
                                    onSave,
                                    buildings,
                                    owners,
                                    tenants,
                                }) => {
    const [form, setForm] = useState(
        departamento || {
            numero: "",
            piso: "",
            edificio_id: "",
            propietario_asociado: "",
            inquilino_asociado: "",
        }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.numero || !form.piso || !form.edificio_id) {
            alert("Los campos Número, Piso y Edificio son obligatorios.");
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
                    {departamento ? "Editar Departamento" : "Crear Departamento"}
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
                            label="Número de Departamento"
                            fullWidth
                            value={form.numero}
                            onChange={(e) => handleChange("numero", e.target.value)}
                        />
                        <TextField
                            label="Piso"
                            type="number"
                            fullWidth
                            value={form.piso}
                            onChange={(e) => handleChange("piso", e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Edificio</InputLabel>
                            <Select
                                value={form.edificio_id}
                                onChange={(e) => handleChange("edificio_id", e.target.value)}
                            >
                                <MenuItem value="">Seleccionar Edificio</MenuItem>
                                {buildings.map((building) => (
                                    <MenuItem key={building._id} value={building._id}>
                                        {building.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Propietario Asociado</InputLabel>
                            <Select
                                value={form.propietario_asociado}
                                onChange={(e) =>
                                    handleChange("propietario_asociado", e.target.value)
                                }
                            >
                                <MenuItem value="">No Asociado</MenuItem>
                                {owners.map((owner) => (
                                    <MenuItem key={owner._id} value={owner._id}>
                                        {owner.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Inquilino Asociado</InputLabel>
                            <Select
                                value={form.inquilino_asociado}
                                onChange={(e) =>
                                    handleChange("inquilino_asociado", e.target.value)
                                }
                            >
                                <MenuItem value="">No Asociado</MenuItem>
                                {tenants.map((tenant) => (
                                    <MenuItem key={tenant._id} value={tenant._id}>
                                        {tenant.name}
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
                            fontFamily: "'Montserrat', sans-serif",
                            "&:hover": { backgroundColor: "#2563eb" },
                        }}
                    >
                        {departamento ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioDepartamento;
