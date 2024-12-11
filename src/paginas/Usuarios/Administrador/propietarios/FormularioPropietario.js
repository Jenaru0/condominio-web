import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioPropietario = ({ open, onClose, propietario, onSave }) => {
    const [form, setForm] = React.useState(
        propietario || {
            name: "",
            email: "",
            DNI: "",
            password: "",
        }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.DNI || !form.password) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        onSave({
            ...form,
            rol: "residente",
            tipo_residente: "propietario",
        });
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
                    {propietario ? "Editar Propietario" : "Crear Propietario"}
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
                        Completa los siguientes campos para {propietario ? "editar" : "crear"} un propietario.
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
                            label="Nombre"
                            fullWidth
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <TextField
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                        <TextField
                            label="DNI"
                            fullWidth
                            value={form.DNI}
                            onChange={(e) => handleChange("DNI", e.target.value)}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
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
                            backgroundColor: "#22c55e",
                            "&:hover": { backgroundColor: "#16a34a" },
                        }}
                    >
                        {propietario ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioPropietario;
