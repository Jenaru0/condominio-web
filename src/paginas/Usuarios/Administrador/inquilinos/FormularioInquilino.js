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

const FormularioInquilino = ({ open, onClose, inquilino, onSave }) => {
    const [form, setForm] = React.useState(
        inquilino || { name: "", email: "", DNI: "" }
    );

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.DNI) {
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
                    {inquilino ? "Editar Inquilino" : "Crear Inquilino"}
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
                        Completa los siguientes campos para {inquilino ? "editar" : "crear"} un inquilino.
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
                            label="Email"
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
                            backgroundColor: "#f97316",
                            fontFamily: "'Montserrat', sans-serif",
                            "&:hover": { backgroundColor: "#ea580c" },
                        }}
                    >
                        {inquilino ? "Guardar Cambios" : "Crear"}
                    </Button>
                </DialogActions>
            </motion.div>
        </Dialog>
    );
};

export default FormularioInquilino;
