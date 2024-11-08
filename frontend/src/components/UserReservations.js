// components/UserReservations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/reservas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(response.data.reservations);
    } catch (error) {
      setMessage('Error al obtener las reservas');
    }
  };

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/reservas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Reserva cancelada con éxito');
      fetchReservations(); // Actualiza la lista de reservas
    } catch (error) {
      setMessage('Error al cancelar la reserva');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Mis Reservas</h2>
      {message && <p>{message}</p>}
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            Área: {reservation.area} - Fecha: {reservation.date} - Horario: {reservation.timeSlot}
            <button onClick={() => handleCancel(reservation._id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReservations;
