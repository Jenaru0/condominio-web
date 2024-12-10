const express = require("express");
const router = express.Router();
const habitacionController = require("../controllers/habitacionController");

router.get("/", habitacionController.listarHabitaciones);
router.post("/", habitacionController.crearHabitacion);
router.put("/:id", habitacionController.editarHabitacion);
router.delete("/:id", habitacionController.eliminarHabitacion);

module.exports = router;
