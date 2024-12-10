const mongoose = require("mongoose");


const habitacionSchema = new mongoose.Schema(
  {
    numero: {
      type: String,
      required: [true, "El número de la habitación es obligatorio"],
      trim: true,
    },
    piso: {
      type: Number,
      required: [true, "El piso es obligatorio"],
    },
    edificio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Edificio",
      required: [true, "El ID del edificio es obligatorio"],
    },
    ocupado_propietario: {
      type: Boolean,
      default: false,
    },
    ocupado_inquilino: {
      type: Boolean,
      default: false,
    },
    propietario_asociado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    inquilino_asociado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true, // Crea automáticamente los campos `createdAt` y `updatedAt`
  }
);

// Índices para evitar duplicados de números dentro del mismo edificio
habitacionSchema.index(
  { numero: 1, edificio_id: 1 },
  {
    unique: true,
    message: "Ya existe una habitación con este número en el edificio",
  }
);

module.exports = mongoose.model("Habitacion", habitacionSchema);
