// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [pagosPendientes, setPagosPendientes] = useState(0);
  const [solicitudesMantenimiento, setSolicitudesMantenimiento] = useState(0);
  const [visitasRecientes, setVisitasRecientes] = useState(0);
  const [boletasPago, setBoletasPago] = useState(0);
  const [correspondencia, setCorrespondencia] = useState(0);
  const [reservasProximas, setReservasProximas] = useState(0);
  const [eventosProximos, setEventosProximos] = useState(0);
  const [incidentesSeguridad, setIncidentesSeguridad] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const pagosResponse = await axios.get('/api/pagos', { headers });
        const reservasResponse = await axios.get('/api/reservas', { headers });
        const notificacionesResponse = await axios.get('/api/notificaciones', { headers });

        setPagosPendientes(pagosResponse.data.pendientes || 0);
        setSolicitudesMantenimiento(pagosResponse.data.solicitudes || 0);
        setVisitasRecientes(reservasResponse.data.visitas || 0);
        setBoletasPago(notificacionesResponse.data.boletas || 0);
        setCorrespondencia(notificacionesResponse.data.paquetes || 0);
        setReservasProximas(reservasResponse.data.reservas || 0);
        setEventosProximos(reservasResponse.data.eventos || 0);
        setIncidentesSeguridad(reservasResponse.data.incidentes || 0);
      } catch (error) {
        console.error("Error al obtener datos del Dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="header">
          <h1>Panel de Control</h1>
          <p>Resumen del estado actual del condominio</p>
        </div>
        <div className="cards-container">
          <div className="card">
            <h3>Pagos Pendientes</h3>
            <p>{pagosPendientes}</p>
            <Link to="/pagos-pendientes">Ver todos los pagos</Link>
          </div>
          <div className="card">
            <h3>Solicitudes de Mantenimiento</h3>
            <p>{solicitudesMantenimiento} Pendientes</p>
            <Link to="/solicitudes-mantenimiento">Ver todas las solicitudes</Link>
          </div>
          <div className="card">
            <h3>Visitas Recientes</h3>
            <p>{visitasRecientes} Autorizados</p>
            <Link to="/visitas-recientes">Ver detalles de acceso</Link>
          </div>
          <div className="card">
            <h3>Boletas de Pago Subidas</h3>
            <p>{boletasPago} Nuevas</p>
            <Link to="/boletas-pago">Ver todas las boletas</Link>
          </div>
          <div className="card">
            <h3>Correspondencia Recibida</h3>
            <p>{correspondencia} Paquetes</p>
            <Link to="/correspondencia-recibida">Ver toda la correspondencia</Link>
          </div>
          <div className="card">
            <h3>Reservas Próximas</h3>
            <p>{reservasProximas} Áreas Comunes Reservadas</p>
            <Link to="/reservas-proximas">Gestionar reservas</Link>
          </div>
          <div className="card">
            <h3>Eventos del Condominio</h3>
            <p>{eventosProximos} Próximos</p>
            <Link to="/eventos-condominio">Ver eventos</Link>
          </div>
          <div className="card">
            <h3>Incidentes de Seguridad</h3>
            <p>{incidentesSeguridad} Incidentes Registrados</p>
            <Link to="/incidentes-seguridad">Ver incidentes</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
