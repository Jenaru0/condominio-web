// routes/reservationRoutes.js
const express = require('express');
const { createReservation, getUserReservations, checkAvailability } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Crear reserva
router.post('/crear', authMiddleware, createReservation);

// Obtener reservas del usuario
router.get('/', authMiddleware, getUserReservations);

// Verificar disponibilidad
router.post('/disponibilidad', authMiddleware, checkAvailability);

// Cancelar reserva
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Reserva cancelada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cancelar la reserva', error });
  }
});

module.exports = router;
