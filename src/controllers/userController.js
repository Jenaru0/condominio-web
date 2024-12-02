const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Edificio = require("../models/Edificio"); // Importar el modelo de edificio
const Habitacion = require("../models/Habitacion"); // Asegúrate de importar el modelo Habitacion

// Esquema de validación para usuarios
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().min(9).max(15).required(),
  rol: Joi.string().valid("residente", "administrador", "seguridad").required(),
  tipo_residente: Joi.when("rol", {
    is: "residente",
    then: Joi.string().valid("propietario", "inquilino").required(),
    otherwise: Joi.forbidden(),
  }),
  edificio_id: Joi.when("rol", {
    is: "residente",
    then: Joi.string().required(), // Obligatorio para residentes
    otherwise: Joi.allow(null),
  }),
  piso: Joi.when("rol", {
    is: "residente",
    then: Joi.number().required(), // Obligatorio para residentes
    otherwise: Joi.allow(null),
  }),
  habitacion_id: Joi.when("rol", {
    is: "residente",
    then: Joi.string().required(), // Obligatorio para residentes
    otherwise: Joi.allow(null),
  }),
  propietario_asociado: Joi.when("tipo_residente", {
    is: "inquilino",
    then: Joi.string().required(), // Obligatorio para inquilinos
    otherwise: Joi.allow(null),
  }),
  password: Joi.string().min(8).required(),
});

// Registro de usuario
exports.registerUser = async (req, res) => {
  try {
    // Validar datos de entrada
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        detalle: error.details[0].message,
      });
    }

    // Extraer datos del cuerpo de la solicitud
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Usuario ya existe");
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generar y devolver un token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo electrónico
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(400).json({ mensaje: "Credenciales incorrectas" });
    }

    // Generar el token
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      usuario: { id: usuario._id, name: usuario.name, email: usuario.email },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};

// Obtener perfil del usuario
exports.getUserProfile = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Para depuración
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener el perfil del usuario" });
  }
};

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    console.log("Datos recibidos para crear usuario:", req.body);

    const { error } = userSchema.validate(req.body);
    if (error) {
      console.log("Error de validación:", error.details[0].message);
      return res.status(400).json({
        mensaje: "Datos inválidos",
        detalle: error.details[0].message,
      });
    }

    const {
      name,
      email,
      telefono,
      rol,
      tipo_residente,
      edificio_id,
      piso,
      habitacion_id,
      propietario_asociado,
      password,
    } = req.body;

    console.log("Validando edificio con ID:", edificio_id);
    const edificio = await Edificio.findById(edificio_id);
    if (!edificio) {
      console.log("Edificio no encontrado");
      return res.status(404).json({ mensaje: "Edificio no encontrado" });
    }

    console.log("Validando piso:", piso);
    const pisoSeleccionado = edificio.pisos.find((p) => p.piso === piso);
    if (!pisoSeleccionado) {
      console.log("Piso no encontrado");
      return res.status(404).json({ mensaje: "Piso no encontrado" });
    }

    console.log("Validando habitación:", habitacion_id);
    const habitacionSeleccionada = pisoSeleccionado.habitaciones.find(
      (h) => h._id.toString() === habitacion_id && !h.ocupado
    );
    if (!habitacionSeleccionada) {
      console.log("Habitación ocupada o no encontrada");
      return res
        .status(400)
        .json({ mensaje: "Habitación ocupada o no encontrada" });
    }

    console.log("Creando usuario...");
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuarioData = {
      name,
      email,
      telefono,
      rol,
      password: hashedPassword,
      habitacion_id,
      tipo_residente,
      propietario_asociado,
    };

    const newUser = new User(usuarioData);
    await newUser.save();

    habitacionSeleccionada.ocupado = true;
    await edificio.save();

    res
      .status(201)
      .json({ mensaje: "Usuario creado correctamente", usuario: newUser });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ mensaje: "Error al crear el usuario", error });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    console.log("Intentando obtener usuarios...");
    const users = await User.find()
      .populate("habitacion_id", "numero piso edificio_id")
      .populate("propietario_asociado", "name email telefono");

    console.log("Usuarios encontrados:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ mensaje: "Error al obtener los usuarios", error });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Intentando actualizar usuario con ID:", id);
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Usuario actualizado:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ mensaje: "Error al actualizar el usuario", error });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Intentando eliminar usuario con ID:", id);

    const user = await User.findById(id);

    if (user?.rol === "residente" && user?.habitacion_id) {
      console.log("Liberando habitación del usuario...");
      const edificio = await Edificio.findOne({
        "pisos.habitaciones._id": user.habitacion_id,
      });

      if (edificio) {
        const piso = edificio.pisos.find((p) =>
          p.habitaciones.some((h) => h._id.toString() === user.habitacion_id)
        );

        const habitacion = piso.habitaciones.find(
          (h) => h._id.toString() === user.habitacion_id
        );

        habitacion.ocupado = false;
        await edificio.save();
      }
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ mensaje: "Error al eliminar el usuario", error });
  }
};
