const Habitacion = require("../models/Habitacion");
const Edificio = require("../models/Edificio");
const User = require("../models/User");

const mongoose = require("mongoose");

exports.listarHabitaciones = async (req, res) => {
  try {
    const { edificio_id } = req.query;

    // Validar si el edificio_id es un ObjectId válido
    if (edificio_id && !mongoose.Types.ObjectId.isValid(edificio_id)) {
      return res.status(400).json({ error: "El ID del edificio no es válido" });
    }

    // Construir el filtro para la consulta
    const filtro = edificio_id ? { edificio_id } : {};

    // Consultar las habitaciones y poblar los datos asociados
    const habitaciones = await Habitacion.find(filtro)
      .populate({ path: "edificio_id", select: "nombre direccion" })
      .populate({
        path: "propietario_asociado",
        select: "name email",
        options: { strictPopulate: false },
      })
      .populate({
        path: "inquilino_asociado",
        select: "name email",
        options: { strictPopulate: false },
      });

    // Si no se encontraron habitaciones, retornar un mensaje adecuado
    if (!habitaciones || habitaciones.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron habitaciones." });
    }

    res.status(200).json(habitaciones);
  } catch (error) {
    console.error("Error al listar las habitaciones:", error);
    res.status(500).json({ error: "Error al listar las habitaciones" });
  }
};

exports.crearHabitacion = async (req, res) => {
  try {
    const {
      numero,
      piso,
      edificio_id,
      propietario_asociado,
      inquilino_asociado,
    } = req.body;

    // Validar que el edificio exista
    const edificio = await Edificio.findById(edificio_id);
    if (!edificio)
      return res.status(404).json({ error: "El edificio no existe" });

    // Validar duplicados por número dentro del edificio
    const habitacionDuplicada = await Habitacion.findOne({
      numero,
      edificio_id,
    });
    if (habitacionDuplicada)
      return res
        .status(409)
        .json({ error: "El número de habitación ya existe en este edificio" });

    // Crear la nueva habitación
    const nuevaHabitacion = new Habitacion({
      numero,
      piso,
      edificio_id,
      propietario_asociado: propietario_asociado || null,
      inquilino_asociado: inquilino_asociado || null,
    });

    await nuevaHabitacion.save();
    res.status(201).json(nuevaHabitacion);
  } catch (error) {
    console.error("Error al crear la habitación:", error);
    res.status(400).json({ error: "Error al crear la habitación" });
  }
};

exports.editarHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero, piso, propietario_asociado, inquilino_asociado } = req.body;

    // Verificar si la habitación existe
    const habitacion = await Habitacion.findById(id);
    if (!habitacion)
      return res.status(404).json({ error: "Habitación no encontrada" });

    // Validar duplicados en el mismo edificio
    const habitacionDuplicada = await Habitacion.findOne({
      numero,
      edificio_id: habitacion.edificio_id,
      _id: { $ne: id },
    });
    if (habitacionDuplicada)
      return res
        .status(409)
        .json({ error: "El número de habitación ya existe en este edificio" });

    // Actualizar la habitación
    habitacion.numero = numero || habitacion.numero;
    habitacion.piso = piso || habitacion.piso;
    habitacion.propietario_asociado = propietario_asociado || null;
    habitacion.inquilino_asociado = inquilino_asociado || null;

    await habitacion.save();
    res.status(200).json(habitacion);
  } catch (error) {
    console.error("Error al editar la habitación:", error);
    res.status(400).json({ error: "Error al editar la habitación" });
  }
};

exports.eliminarHabitacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la habitación existe
    const habitacion = await Habitacion.findById(id);
    if (!habitacion)
      return res.status(404).json({ error: "Habitación no encontrada" });

    // Eliminar la habitación
    await habitacion.deleteOne();
    res.status(200).json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    res.status(500).json({ error: "Error al eliminar la habitación" });
  }
};
