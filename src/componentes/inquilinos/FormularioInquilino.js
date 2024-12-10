import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const FormularioInquilino = ({ open, onClose, inquilino, onSave }) => {
  const [form, setForm] = React.useState(
    inquilino || { name: "", email: "", DNI: "" }
  );

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {inquilino ? "Editar Inquilino" : "Crear Inquilino"}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {inquilino ? "Guardar Cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioInquilino;
