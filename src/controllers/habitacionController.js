const Habitacion = require("../models/Habitacion");

// Obtener habitaciones por edificio
exports.getHabitacionesPorEdificio = async (req, res) => {
  try {
    const { edificioId } = req.params;
    const habitaciones = await Habitacion.find({ edificio: edificioId });
    res.status(200).json(habitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener habitaciones", error });
  }
};
