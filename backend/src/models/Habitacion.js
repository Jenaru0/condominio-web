const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  piso: { type: Number, required: true },
  ocupado: { type: Boolean, default: false },
  edificio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Edificio', required: true },
});

module.exports = mongoose.model('Habitacion', habitacionSchema);
