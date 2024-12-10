const Edificio = require("../models/Edificio");
const Habitacion = require("../models/Habitacion");

exports.listarEdificios = async (req, res) => {
  try {
    const edificios = await Edificio.find();
    res.status(200).json(edificios);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los edificios" });
  }
};

exports.crearEdificio = async (req, res) => {
  try {
    const { nombre, direccion, pisos } = req.body;
    const edificioExistente = await Edificio.findOne({ nombre });
    if (edificioExistente)
      return res
        .status(409)
        .json({ error: "El nombre del edificio ya existe" });

    const nuevoEdificio = new Edificio({ nombre, direccion, pisos });
    await nuevoEdificio.save();
    res.status(201).json(nuevoEdificio);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el edificio" });
  }
};

exports.editarEdificio = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const edificio = await Edificio.findById(id);
    if (!edificio)
      return res.status(404).json({ error: "Edificio no encontrado" });

    const nombreDuplicado = await Edificio.findOne({
      nombre: datosActualizados.nombre,
      _id: { $ne: id },
    });
    if (nombreDuplicado)
      return res
        .status(409)
        .json({ error: "El nombre del edificio ya existe" });

    Object.assign(edificio, datosActualizados);
    await edificio.save();
    res.status(200).json(edificio);
  } catch (error) {
    res.status(400).json({ error: "Error al editar el edificio" });
  }
};

exports.eliminarEdificio = async (req, res) => {
  try {
    const { id } = req.params;
    const habitacionesAsociadas = await Habitacion.find({ edificio_id: id });

    if (habitacionesAsociadas.length > 0) {
      return res.status(409).json({
        error:
          "No se puede eliminar un edificio que tiene habitaciones asociadas",
      });
    }

    const edificio = await Edificio.findByIdAndDelete(id);
    if (!edificio)
      return res.status(404).json({ error: "Edificio no encontrado" });

    res.status(200).json({ message: "Edificio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el edificio" });
  }
};
