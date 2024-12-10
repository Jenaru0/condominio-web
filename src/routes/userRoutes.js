const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.obtenerUsuarios);
router.post("/", userController.crearUsuario);
router.put("/:id", userController.editarUsuario);
router.delete("/:id", userController.eliminarUsuario);

router.get("/propietarios", userController.listarPropietarios);
router.get("/inquilinos", userController.listarInquilinos);
router.get("/empleados", userController.listarEmpleados);

module.exports = router;
