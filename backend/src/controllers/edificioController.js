const Edificio = require('../models/Edificio');

// Crear edificio
exports.createEdificio = async (req, res) => {
  try {
    const newEdificio = new Edificio(req.body);
    await newEdificio.save();
    res.status(201).json({ mensaje: 'Edificio creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el edificio', error });
  }
};

// Obtener todos los edificios
exports.getEdificios = async (req, res) => {
  try {
    const edificios = await Edificio.find();
    res.status(200).json(edificios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los edificios', error });
  }
};

// Actualizar edificio
exports.updateEdificio = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEdificio = await Edificio.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedEdificio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el edificio', error });
  }
};

// Eliminar edificio
exports.deleteEdificio = async (req, res) => {
  try {
    const { id } = req.params;
    await Edificio.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Edificio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el edificio', error });
  }
};