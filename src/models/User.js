// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  rol: {
    type: String,
    required: true,
    enum: ["residente", "administrador", "seguridad"],
  },
  tipo_residente: {
    type: String,
    enum: ["propietario", "inquilino"],
    required: false,
  },
  habitacion_id: { type: mongoose.Schema.Types.ObjectId, ref: "Habitacion" },
  propietario_asociado: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);