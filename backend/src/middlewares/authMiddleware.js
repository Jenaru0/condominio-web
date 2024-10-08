const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado, token no proporcionado' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // El objeto decoded debería contener el `id` del usuario
    console.log('Usuario autenticado:', decoded); // Para depuración
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};

module.exports = authMiddleware;
