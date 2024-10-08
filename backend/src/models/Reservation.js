const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  area: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // Ejemplo: '10:00-12:00'
});

module.exports = mongoose.model('Reservation', reservationSchema);
