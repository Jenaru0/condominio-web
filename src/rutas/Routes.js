// src/Routes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "../diseños/ProtectedLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../paginas/Autenticacion/LoginPage";
import Dashboard from "../paginas/Dashboard/Dashboard";
import GestionUsuarios from "../paginas/Usuarios/Administrador/GestionUsuarios";
import ResidentesInquilinos from "../paginas/Usuarios/Administrador/ResidentesInquilinos";
import GestionCocheras from "../paginas/Propiedades/GestionCocheras";
import Reportes from "../paginas/Reportes/Administrador/Reportes";
import SolicitudesMantenimiento from "../paginas/Mantenimiento/Administrador/SolicitudesMantenimiento";
import EnviarNotificaciones from "../paginas/Notificaciones/Administrador/EnviarNotificaciones";
import GestionCorrespondencia from "../paginas/Correspondencia/Administrador/GestionCorrespondencia";
import GestionEventos from "../paginas/Eventos/Administrador/GestionEventos";
import MonitoreoAccesos from "../paginas/Seguridad/MonitoreoAccesos";
import Contratos from "../paginas/Documentos/Administrador/Contratos";
import AyudaSoporte from "../paginas/AyudaSoporte/AyudaSoporte";
import Configuracion from "../paginas/Configuracion/Configuracion";
import Usuario from "../paginas/Usuarios/Administrador/Usuario";
import ReportePagos from "../paginas/Reportes/Administrador/ReportePagos";
import ReportesMantenimiento from "../paginas/Reportes/Administrador/ReportesMantenimiento";
import ReportesCorrespondencia from "../paginas/Reportes/Administrador/ReportesCorrespondencia";
// Importa otros componentes según sea necesario

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas (login) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rutas protegidas (con Sidebar) */}
      <Route element={<ProtectedLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/residentes-inquilinos"
          element={
            <ProtectedRoute>
              <ResidentesInquilinos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-cocheras"
          element={
            <ProtectedRoute>
              <GestionCocheras />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <ProtectedRoute>
              <Reportes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solicitudes-mantenimiento"
          element={
            <ProtectedRoute>
              <SolicitudesMantenimiento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enviar-notificaciones"
          element={
            <ProtectedRoute>
              <EnviarNotificaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-correspondencia"
          element={
            <ProtectedRoute>
              <GestionCorrespondencia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Gestion-eventos"
          element={
            <ProtectedRoute>
              <GestionEventos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Monitoreo-accesos"
          element={
            <ProtectedRoute>
              <MonitoreoAccesos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Contratos"
          element={
            <ProtectedRoute>
              <Contratos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ayuda-soporte"
          element={
            <ProtectedRoute>
              <AyudaSoporte />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion"
          element={
            <ProtectedRoute>
              <Configuracion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuario"
          element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reporte-pagos"
          element={
            <ProtectedRoute>
              <ReportePagos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes-mantenimiento"
          element={
            <ProtectedRoute>
              <ReportesMantenimiento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes-correspondencia"
          element={
            <ProtectedRoute>
              <ReportesCorrespondencia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-usuarios"
          element={
            <ProtectedRoute>
              <GestionUsuarios />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
