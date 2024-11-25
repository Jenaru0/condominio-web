// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  rol: { type: String, required: true },
  habitacion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' },
  propietario_asociado: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  password: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
