const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  DNI: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  telefono: { type: String },
  rol: {
    type: String,
    enum: ["residente", "administrador", "empleado"],
    required: true,
  },
  tipo_residente: {
    type: String,
    enum: ["propietario", "inquilino"],
    default: null,
  },
  habitacion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habitacion",
    default: null,
  },
  propietario_asociado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
