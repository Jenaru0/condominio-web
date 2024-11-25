const express = require('express');
const { getAuthenticatedUser } = require('../controllers/authController'); // Asegúrate de importar la función
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para registrar usuario
router.post('/registro', registerUser);

// Ruta para iniciar sesión de usuario
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario autenticado
router.get('/perfil', authMiddleware, getUserProfile);

// Ruta para obtener al usuario autenticado
router.get('/me', authMiddleware, getAuthenticatedUser);

module.exports = router;
