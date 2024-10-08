const Reservation = require('../models/Reservation');

// Crear una nueva reserva
const createReservation = async (req, res) => {
  const { area, date, timeSlot } = req.body;
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
    res.status(500).json({ mensaje: 'Error al crear la reserva' });
  }
};

// Obtener las reservas del usuario
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las reservas' });
  }
};

module.exports = { createReservation, getUserReservations };
