const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  try {
      const { name, email, password, role } = req.body;
      console.log('Datos recibidos para registro:', { name, email, password, role });

      // Encripta la contraseña antes de crear el usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Contraseña encriptada:', hashedPassword);

      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      console.log('Usuario guardado en la base de datos:', user);

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: 'Error en el registro de usuario' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Datos recibidos para login:', { email, password });
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(401).json({ error: 'Correo electrónico no registrado' });
      }
      console.log('Usuario encontrado:', user);
  
      const esValida = await bcrypt.compare(password, user.password);
      if (!esValida) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
      console.log('Contraseña válida');
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Token generado:', token);
      res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Obtener al usuario autenticado
exports.getAuthenticatedUser = async (req, res) => {
    try {
        if (!req.user) {
            console.log('Usuario no autenticado en la solicitud');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log('Usuario autenticado:', req.user);

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            console.log('Usuario no encontrado en la base de datos');
            return res.status(404).json({ message: 'Usuario no encontrado en la base de datos' });
        }
        console.log('Usuario encontrado en la base de datos:', user);

        res.json({ user });
    } catch (error) {
        console.error('Error al obtener el usuario autenticado:', error);
        res.status(500).json({ error: 'Error al obtener el usuario autenticado' });
    }
};
