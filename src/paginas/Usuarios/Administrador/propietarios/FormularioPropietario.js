import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import { crearUsuario, editarUsuario } from "../../../../api/usuarioService";
import { listarEdificios } from "../../../../api/edificioService";

const FormularioPropietario = ({ open, onClose, propietario, onSave }) => {
  const [form, setForm] = useState(
    propietario || {
      name: "",
      email: "",
      telefono: "",
      DNI: "",
      password: "",
      edificio_id: "",
      piso: "",
      numero: "",
    }
  );
  const [edificios, setEdificios] = useState([]); // Aseguramos inicialización como array vacío

  useEffect(() => {
    // Cargar edificios desde la API
    const cargarEdificios = async () => {
      try {
        const response = await listarEdificios();
        setEdificios(response.data || []); // Garantizamos que response.data sea un array
      } catch (error) {
        console.error("Error al cargar edificios:", error);
        alert("No se pudieron cargar los edificios. Intenta más tarde.");
        setEdificios([]); // Evitar undefined en caso de error
      }
    };

    cargarEdificios();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    // Validaciones
    if (
      !form.name ||
      !form.email ||
      !form.telefono ||
      !form.DNI ||
      !form.password ||
      !form.edificio_id ||
      !form.piso ||
      !form.numero
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!/^\d{8}$/.test(form.DNI)) {
      alert("El DNI debe tener 8 dígitos.");
      return;
    }

    if (!/^\+?\d+$/.test(form.telefono)) {
      alert("El teléfono debe contener solo números.");
      return;
    }

    if (parseInt(form.piso, 10) <= 0) {
      alert("El piso debe ser un número positivo.");
      return;
    }

    if (parseInt(form.numero, 10) <= 0) {
      alert("El número del departamento debe ser un número positivo.");
      return;
    }

    const data = {
      ...form,
      rol: "residente",
      tipo_residente: "propietario",
    };

    try {
      if (propietario) {
        await editarUsuario(propietario._id, data); // Actualizar propietario
        alert("Propietario actualizado exitosamente.");
      } else {
        await crearUsuario(data); // Crear propietario
        alert("Propietario creado exitosamente.");
      }
      onSave(); // Llamar al manejador onSave
      onClose();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      alert(
        "Hubo un error al guardar el propietario. Por favor, inténtalo de nuevo."
      );
    }
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
            Completa los siguientes campos para{" "}
            {propietario ? "editar" : "crear"} un propietario.
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
              label="Teléfono"
              fullWidth
              value={form.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
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
            <TextField
              label="Edificio"
              select
              fullWidth
              value={form.edificio_id}
              onChange={(e) => handleChange("edificio_id", e.target.value)}
            >
              {Array.isArray(edificios) && edificios.length > 0 ? (
                edificios.map((edificio) => (
                  <MenuItem key={edificio._id} value={edificio._id}>
                    {edificio.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value="">
                  No hay edificios disponibles
                </MenuItem>
              )}
            </TextField>
            <TextField
              label="Piso"
              type="number"
              fullWidth
              value={form.piso}
              onChange={(e) => handleChange("piso", e.target.value)}
            />
            <TextField
              label="Número de Departamento"
              fullWidth
              value={form.numero}
              onChange={(e) => handleChange("numero", e.target.value)}
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
