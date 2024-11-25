const express = require('express');
const { createEdificio, getEdificios, updateEdificio, deleteEdificio } = require('../controllers/edificioController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createEdificio);
router.get('/', authMiddleware, getEdificios);
router.put('/:id', authMiddleware, updateEdificio);
router.delete('/:id', authMiddleware, deleteEdificio);

module.exports = router;