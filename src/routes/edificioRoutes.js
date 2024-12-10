const express = require("express");
const router = express.Router();
const edificioController = require("../controllers/edificioController");

router.get("/", edificioController.listarEdificios);
router.post("/", edificioController.crearEdificio);
router.put("/:id", edificioController.editarEdificio);
router.delete("/:id", edificioController.eliminarEdificio);

module.exports = router;
