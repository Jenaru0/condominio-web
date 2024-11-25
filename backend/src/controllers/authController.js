const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ error: 'Error en el registro de usuario' });
    }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Obtener al usuario autenticado
exports.getAuthenticatedUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado en la base de datos' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error al obtener el usuario autenticado:', error);
        res.status(500).json({ error: 'Error al obtener el usuario autenticado' });
    }
};
