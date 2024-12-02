// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const Joi = require('joi'); // Para validación de datos

// Validar y crear reserva
const createReservation = async (req, res) => {
  const { area, date, timeSlot } = req.body;
  
  // Validación de datos
  const schema = Joi.object({
    area: Joi.string().required(),
    date: Joi.date().required(),
    timeSlot: Joi.string().required(),
  });

  const { error } = schema.validate({ area, date, timeSlot });
  if (error) return res.status(400).json({ mensaje: error.details[0].message });

  // Verificar conflictos de horarios
  const conflict = await Reservation.findOne({ area, date, timeSlot });
  if (conflict) {
    return res.status(400).json({ mensaje: 'Este horario ya está reservado.' });
  }

  try {
    const reservation = new Reservation({
      userId: req.user.id,
      area,
      date,
      timeSlot,
    });
    await reservation.save();
    res.status(201).json({ mensaje: 'Reserva creada con éxito', reservation });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la reserva', error });
  }
};

// controllers/reservationController.js
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id });
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las reservas', error });
  }
};


try {
  const conflict = await Reservation.findOne({ area, date, timeSlot });
  if (conflict) {
    return res.status(400).json({ disponible: false, mensaje: 'El horario no está disponible.' });
  }
  res.status(200).json({ disponible: true, mensaje: 'El horario está disponible.' });
} catch (error) {
  res.status(500).json({ mensaje: 'Error al verificar la disponibilidad', error });
}

module.exports = { createReservation, getUserReservations, checkAvailability };