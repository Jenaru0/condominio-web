// backend/src/middlewares/roleMiddleware.js
module.exports = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user; // Asegúrate de que `req.user` tenga el rol definido
        if (role !== requiredRole) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};
