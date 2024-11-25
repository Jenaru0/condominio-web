// Importa el módulo express
const express = require('express');

// Importa las funciones del controlador de autenticación y usuario
const { getAuthenticatedUser } = require('../controllers/authController'); // Asegúrate de importar la función
const { registerUser, loginUser, getUserProfile, createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

// Importa el middleware de autenticación
const authMiddleware = require('../middlewares/authMiddleware');

// Crea una instancia del enrutador de express
const router = express.Router();

// Ruta para registrar usuario
// POST /registro - Llama a la función registerUser del controlador de usuario
router.post('/registro', registerUser);

// Ruta para iniciar sesión de usuario
// POST /login - Llama a la función loginUser del controlador de usuario
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario autenticado
// GET /perfil - Usa el middleware de autenticación y luego llama a la función getUserProfile del controlador de usuario
router.get('/perfil', authMiddleware, getUserProfile);

// Ruta para obtener al usuario autenticado
// GET /me - Usa el middleware de autenticación y luego llama a la función getAuthenticatedUser del controlador de autenticación
router.get('/me', authMiddleware, getAuthenticatedUser);

// Ruta para crear un nuevo usuario
// POST / - Usa el middleware de autenticación y luego llama a la función createUser del controlador de usuario
router.post('/', authMiddleware, createUser);

// Ruta para obtener todos los usuarios
// GET / - Usa el middleware de autenticación y luego llama a la función getUsers del controlador de usuario
router.get('/', authMiddleware, getUsers);

// Ruta para actualizar un usuario por ID
// PUT /:id - Usa el middleware de autenticación y luego llama a la función updateUser del controlador de usuario
router.put('/:id', authMiddleware, updateUser);

// Ruta para eliminar un usuario por ID
// DELETE /:id - Usa el middleware de autenticación y luego llama a la función deleteUser del controlador de usuario
router.delete('/:id', authMiddleware, deleteUser);

// Exporta el enrutador para que pueda ser usado en otras partes de la aplicación
module.exports = router;