const mongoose = require("mongoose");

const pisoSchema = new mongoose.Schema({
  piso: { type: Number, required: true },
});

const edificioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  pisos: [pisoSchema], // Opcional, solo para indicar cuántos pisos tiene el edificio.
});

module.exports = mongoose.model("Edificio", edificioSchema);
