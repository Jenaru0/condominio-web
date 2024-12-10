const mongoose = require("mongoose");

const EdificioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del edificio es obligatorio"],
    unique: true,
    trim: true,
  },
  direccion: {
    type: String,
    required: [true, "La dirección es obligatoria"],
    trim: true,
  },
  pisos: {
    type: Number,
    required: [true, "El número de pisos es obligatorio"],
    min: [1, "El edificio debe tener al menos un piso"],
  },
});

module.exports = mongoose.model("Edificio", EdificioSchema);
