const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  habitacion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' },
  numero: { type: String, required: true },
  ocupado: { type: Boolean, default: false },
});

const pisoSchema = new mongoose.Schema({
  piso: { type: Number, required: true },
  habitaciones: [habitacionSchema],
});

const edificioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  pisos: [pisoSchema],
});

module.exports = mongoose.model('Edificio', edificioSchema);