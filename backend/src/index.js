require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware global
app.use(express.json());
app.use(cors());
app.use(helmet());

// Importar las rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/usuarios', userRoutes);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos', error);
  });

// Ruta raíz para ver si el servidor está activo
app.get('/', (req, res) => {
  res.send('Servidor activo');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});
