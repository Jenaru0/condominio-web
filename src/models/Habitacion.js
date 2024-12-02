const mongoose = require("mongoose");

const habitacionSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  piso: { type: Number, required: true },
  edificio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edificio",
    required: true,
  },
  ocupado_propietario: { type: Boolean, default: false },
  ocupado_inquilino: { type: Boolean, default: false },
});

module.exports = mongoose.model("Habitacion", habitacionSchema);
