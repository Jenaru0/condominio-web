require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware global
app.use(express.json());
app.use(helmet());

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL del frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeceras necesarias
}));

// Importar las rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const edificioRoutes = require('./routes/edificioRoutes');

// Registrar las rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/usuarios', userRoutes); // Rutas de usuario
app.use('/api/edificios', edificioRoutes);
// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Ruta raíz para verificar si el servidor está activo
app.get('/', (req, res) => {
  res.send('Servidor activo');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});
