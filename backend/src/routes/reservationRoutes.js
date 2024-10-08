const express = require('express');
const { createReservation, getUserReservations } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear una reserva (requiere autenticación)
router.post('/crear', authMiddleware, createReservation);

// Ruta para obtener las reservas del usuario (requiere autenticación)
router.get('/', authMiddleware, getUserReservations);

module.exports = router;
