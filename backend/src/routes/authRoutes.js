const express = require('express');
const { register, login, getAuthenticatedUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para verificar autenticación

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getAuthenticatedUser);

module.exports = router;
