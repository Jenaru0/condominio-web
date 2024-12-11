import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

const FormularioRol = ({ open, onClose, rol, onSave, permisos }) => {
  const [form, setForm] = React.useState(
    rol || {
      name: "",
      assignedPermissions: [],
    }
  );

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCheckboxChange = (permiso) => {
    setForm((prev) => ({
      ...prev,
      assignedPermissions: prev.assignedPermissions.includes(permiso)
        ? prev.assignedPermissions.filter((p) => p !== permiso)
        : [...prev.assignedPermissions, permiso],
    }));
  };

  const handleSubmit = () => {
    if (!form.name) {
      alert("El nombre del rol es obligatorio.");
      return;
    }
    onSave({ ...form, id: rol?.id || Date.now() });
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
          {rol ? "Editar Rol" : "Crear Rol"}
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
            Completa los campos para {rol ? "editar" : "crear"} un rol.
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
              label="Nombre del Rol"
              fullWidth
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Permisos Asignados
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {permisos.map((permiso) => (
                  <FormControlLabel
                    key={permiso}
                    control={
                      <Checkbox
                        checked={form.assignedPermissions.includes(permiso)}
                        onChange={() => handleCheckboxChange(permiso)}
                      />
                    }
                    label={permiso}
                  />
                ))}
              </Box>
            </Box>
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
              backgroundColor: "#9333ea",
              "&:hover": { backgroundColor: "#7c3aed" },
            }}
          >
            {rol ? "Guardar Cambios" : "Crear"}
          </Button>
        </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default FormularioRol;
