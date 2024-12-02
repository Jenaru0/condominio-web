const express = require("express");
const {
  getHabitacionesPorEdificio,
} = require("../controllers/habitacionController");
const router = express.Router();

router.get("/edificio/:edificioId", getHabitacionesPorEdificio);

module.exports = router;
