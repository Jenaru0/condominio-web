const User = require("../models/User");
const Habitacion = require("../models/Habitacion");

// Obtener todos los usuarios con filtros opcionales
exports.obtenerUsuarios = async (req, res) => {
  try {
    const { rol, tipo_residente, nombre, email, habitacion } = req.query;
    const filtro = {};

    if (rol) filtro.rol = rol;
    if (tipo_residente) filtro.tipo_residente = tipo_residente;
    if (nombre) filtro.name = { $regex: nombre, $options: "i" };
    if (email) filtro.email = { $regex: email, $options: "i" };
    if (habitacion) filtro.habitacion_id = habitacion;

    const usuarios = await User.find(filtro)
      .populate("habitacion_id", "numero piso")
      .populate("propietario_asociado", "name email");

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body);

    const { name, DNI, email, rol, tipo_residente, habitacion_id, password } =
      req.body;

    // Validaciones personalizadas
    if (!["residente", "administrador", "empleado"].includes(rol)) {
      return res.status(400).json({ error: "Rol no válido" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: "El campo 'password' es obligatorio." });
    }

    if (
      tipo_residente &&
      !["propietario", "inquilino"].includes(tipo_residente)
    ) {
      return res.status(400).json({ error: "Tipo de residente no válido" });
    }

    if (habitacion_id && !(await Habitacion.findById(habitacion_id))) {
      return res.status(400).json({ error: "La habitación no existe" });
    }

    const nuevoUsuario = new User({
      name,
      DNI,
      email,
      rol,
      tipo_residente,
      habitacion_id: habitacion_id || null,
      password,
    });

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error completo:", error);

    // Manejar errores de validación de Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    // Manejar errores de clave duplicada
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyValue)[0];
      return res
        .status(400)
        .json({ error: `El ${campoDuplicado} ya está registrado` });
    }

    res.status(400).json({ error: "Error al crear usuario" });
  }
};

// Editar un usuario existente
exports.editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    if (
      datosActualizados.habitacion_id &&
      !(await Habitacion.findById(datosActualizados.habitacion_id))
    ) {
      return res.status(400).json({ error: "La habitación no existe" });
    }

    const usuario = await User.findByIdAndUpdate(id, datosActualizados, {
      new: true,
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al editar usuario:", error.message);
    res.status(400).json({ error: "Error al editar usuario" });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findById(id);

    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.deleteOne();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

// Listar propietarios
exports.listarPropietarios = async (req, res) => {
  req.query.tipo_residente = "propietario";
  return this.obtenerUsuarios(req, res);
};

// Listar inquilinos
exports.listarInquilinos = async (req, res) => {
  req.query.tipo_residente = "inquilino";
  return this.obtenerUsuarios(req, res);
};

// Listar empleados
exports.listarEmpleados = async (req, res) => {
  req.query.rol = "empleado";
  return this.obtenerUsuarios(req, res);
};
