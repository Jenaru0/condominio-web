// src/Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResidentesInquilinos from './pages/ResidentesInquilinos';
import GestionCocheras from './pages/GestionCocheras';
import Reportes from './pages/Reportes';
import SolicitudesMantenimiento from './pages/SolicitudesMantenimiento';
import EnvioNotificaciones from './pages/EnvioNotificaciones';
import GestionCorrespondencia from './pages/GestionCorrespondencia';
import EventosCondominio from './pages/EventosCondominio';
import ControlMonitoreoAccesos from './pages/ControlMonitoreoAccesos';
import GestionContratos from './pages/GestionContratos';
import AyudaSoporte from './pages/AyudaSoporte';
import Configuracion from './pages/Configuracion';
import Usuario from './pages/Usuario';
import LoginPage from './components/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta raíz que redirige al login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Ruta de Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas de las diferentes secciones */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/residentes-inquilinos" element={<ResidentesInquilinos />} />
      <Route path="/gestion-cocheras" element={<GestionCocheras />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/solicitudes-mantenimiento" element={<SolicitudesMantenimiento />} />
      <Route path="/envio-notificaciones" element={<EnvioNotificaciones />} />
      <Route path="/gestion-correspondencia" element={<GestionCorrespondencia />} />
      <Route path="/eventos-condominio" element={<EventosCondominio />} />
      <Route path="/control-monitoreo-accesos" element={<ControlMonitoreoAccesos />} />
      <Route path="/gestion-contratos" element={<GestionContratos />} />
      <Route path="/ayuda-soporte" element={<AyudaSoporte />} />
      <Route path="/configuracion" element={<Configuracion />} />
      <Route path="/usuario" element={<Usuario />} />
    </Routes>
  );
};

export default AppRoutes;
