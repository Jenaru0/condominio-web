import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const FormularioPropietario = ({ open, onClose, propietario, onSave }) => {
  const [form, setForm] = React.useState(
    propietario || {
      name: "",
      email: "",
      DNI: "",
      rol: "residente",
      tipo_residente: "propietario",
    }
  );

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    // Validar campos antes de guardar
    if (!form.name || !form.email || !form.DNI || !form.password) {
      alert("Todos los campos, incluida la contraseña, son obligatorios.");
      return;
    }

    // Enviar datos al backend
    onSave({
      ...form,
      rol: "residente",
      tipo_residente: "propietario",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {propietario ? "Editar Propietario" : "Crear Propietario"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          fullWidth
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          label="Email"
          fullWidth
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          sx={{ marginBottom: "16px" }}
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
          value={form.password || ""}
          onChange={(e) => handleChange("password", e.target.value)}
          sx={{ marginBottom: "16px" }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {propietario ? "Guardar Cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioPropietario;
