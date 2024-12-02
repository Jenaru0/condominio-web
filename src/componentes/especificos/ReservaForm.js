// components/ReservaForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ReservaForm = () => {
  const [area, setArea] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [message, setMessage] = useState('');

  const handleCheckAvailability = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/reservas/disponibilidad',
        { area, date, timeSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAvailable(response.data.disponible);
      setMessage(response.data.mensaje);
    } catch (error) {
      setMessage(error.response?.data?.mensaje || 'Error al verificar disponibilidad');
    }
  };

  const handleReserva = async (e) => {
    e.preventDefault();
    if (!isAvailable) {
      setMessage('Por favor verifica la disponibilidad antes de reservar.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/reservas/crear',
        { area, date, timeSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Reserva creada con éxito');
    } catch (error) {
      setMessage(error.response?.data?.mensaje || 'Error al crear la reserva');
    }
  };

  return (
    <form onSubmit={handleReserva}>
      <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Área" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} placeholder="Horario" required />
      <button type="button" onClick={handleCheckAvailability}>Verificar Disponibilidad</button>
      <button type="submit" disabled={!isAvailable}>Reservar</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ReservaForm;
