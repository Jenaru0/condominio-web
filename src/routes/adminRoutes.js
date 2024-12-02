// backend/src/routes/adminRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Ruta protegida: Solo para usuarios autenticados con rol de administrador
router.get(
    '/dashboard',              // Ruta para el dashboard de administración
    authMiddleware,            // Verifica que el usuario esté autenticado
    roleMiddleware('admin'),   // Verifica que el usuario tenga rol de 'admin'
    adminController.getDashboard // Controlador que maneja la lógica del dashboard
);

// Otras rutas de administrador
router.post(
    '/create-user',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.createUser // Controlador que maneja la creación de un usuario
);

router.delete(
    '/delete-user/:id',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.deleteUser // Controlador que maneja la eliminación de un usuario
);

module.exports = router;
