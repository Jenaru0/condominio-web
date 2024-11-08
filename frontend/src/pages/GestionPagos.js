import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GestionPagos.css';

const GestionPagos = () => {
  const [pagos, setPagos] = useState([]);
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [editingPago, setEditingPago] = useState(null);

  // Definir la función fetchPagos fuera de useEffect para que esté disponible en todo el componente
  const fetchPagos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/pagos', { headers: { Authorization: `Bearer ${token}` } });
      setPagos(response.data.pagos);
    } catch (error) {
      console.error("Error al obtener pagos", error);
    }
  };

  // Llamar a fetchPagos al montar el componente
  useEffect(() => {
    fetchPagos();
  }, []);

  // Función para agregar un nuevo pago
  const handleAddPago = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/pagos/crear', { monto, fecha }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Pago agregado exitosamente");
      setMonto('');
      setFecha('');
      fetchPagos(); // Actualizar la lista de pagos después de agregar
    } catch (error) {
      console.error("Error al agregar el pago", error);
    }
  };

  // Función para editar un pago existente
  const handleEditPago = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/pagos/${id}`, { monto, fecha }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Pago actualizado");
      setEditingPago(null);
      setMonto('');
      setFecha('');
      fetchPagos(); // Actualizar la lista de pagos después de editar
    } catch (error) {
      console.error("Error al editar el pago", error);
    }
  };

  // Función para eliminar un pago
  const handleDeletePago = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/pagos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      alert("Pago eliminado");
      fetchPagos(); // Actualizar la lista de pagos después de eliminar
    } catch (error) {
      console.error("Error al eliminar el pago", error);
    }
  };

  return (
    <div className="gestion-pagos-container">
      <h2>Gestión de Pagos</h2>
      
      {/* Formulario para agregar o editar pago */}
      <div className="pago-form">
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        {editingPago ? (
          <button onClick={() => handleEditPago(editingPago)}>Actualizar Pago</button>
        ) : (
          <button onClick={handleAddPago}>Agregar Pago</button>
        )}
      </div>

      {/* Lista de pagos */}
      <table className="pago-table">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.monto}</td>
              <td>{pago.fecha}</td>
              <td>
                <button onClick={() => { setEditingPago(pago.id); setMonto(pago.monto); setFecha(pago.fecha); }}>Editar</button>
                <button onClick={() => handleDeletePago(pago.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionPagos;
