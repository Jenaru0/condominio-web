const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Habitacion = require('../models/Habitacion'); // Importar el modelo correspondiente

// Esquema de validación para usuarios
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().min(9).max(15).required().messages({
    'string.min': '"telefono" debe tener al menos 10 caracteres',
  }),
  rol: Joi.string().valid('residente', 'inquilino', 'administrador', 'seguridad').required(),
  habitacion_id: Joi.when('rol', {
    is: Joi.valid('residente', 'inquilino'),
    then: Joi.string().required().messages({
      'any.required': '"habitacion_id" es obligatorio para residentes o inquilinos',
    }),
    otherwise: Joi.string().allow(null, '').optional(),
  }),
  propietario_asociado: Joi.when('rol', {
    is: 'inquilino',
    then: Joi.string().required().messages({
      'any.required': '"propietario_asociado" es obligatorio para inquilinos',
    }),
    otherwise: Joi.string().allow(null, '').optional(),
  }),
  password: Joi.string().min(8).required(),
});


// Registro de usuario
exports.registerUser = async (req, res) => {
  try {
    // Validar datos de entrada
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: 'Datos inválidos', detalle: error.details[0].message });
    }

    // Extraer datos del cuerpo de la solicitud
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Usuario ya existe');
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generar y devolver un token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo electrónico
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Generar el token
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, usuario: { id: usuario._id, name: usuario.name, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

// Obtener perfil del usuario
exports.getUserProfile = async (req, res) => {
  try {
    // Buscar el usuario por ID (extraído del token a través del middleware)
    console.log('req.user:', req.user); // Para depuración
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Devolver el perfil del usuario
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener el perfil del usuario' });
  }
};

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);

    // Validar datos de entrada
    const { error } = userSchema.validate(req.body);
    if (error) {
      console.log('Error en validación:', error.details[0].message);
      return res.status(400).json({ mensaje: 'Datos inválidos', detalle: error.details[0].message });
    }

    // Preparar datos del usuario
    const { name, email, telefono, rol, habitacion_id, propietario_asociado, password } = req.body;

    const usuarioData = {
      name,
      email,
      telefono,
      rol,
      password: await bcrypt.hash(password, 10),
    };

    // Asignar campos opcionales solo si son válidos
    if (habitacion_id && habitacion_id.trim() !== '') {
      usuarioData.habitacion_id = habitacion_id;
    }
    if (propietario_asociado && propietario_asociado.trim() !== '') {
      usuarioData.propietario_asociado = propietario_asociado;
    }

    // Crear y guardar el usuario
    const newUser = new User(usuarioData);
    await newUser.save();

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: newUser });
  } catch (error) {
    console.error('Error interno:', error.message);
    res.status(500).json({ mensaje: 'Error interno del servidor', detalle: error.message });
  }
};




// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('habitacion_id').populate('propietario_asociado');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
  }
};