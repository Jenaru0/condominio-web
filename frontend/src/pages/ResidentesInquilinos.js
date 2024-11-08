// src/pages/ResidentesInquilinos.js
import React from 'react';
import '../styles/ResidentesInquilinos.css';

const ResidentesInquilinos = () => {
  return (
    <div className="residentes-container">
      <h1>Residentes</h1>
      <p>Gestiona los residentes del condominio</p>
      <button className="add-resident-btn">Añadir Nuevo Residente</button>
      {/* Aquí se puede agregar la tabla de residentes */}
    </div>
  );
};

export default ResidentesInquilinos;
