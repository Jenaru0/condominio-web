// src/Routes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Dashboard from "./pages/Dashboard";
import ResidentesInquilinos from "./pages/ResidentesInquilinos";
import GestionCocheras from "./pages/GestionCocheras";
import Reportes from "./pages/Reportes";
import SolicitudesMantenimiento from "./pages/SolicitudesMantenimiento";
import EnvioNotificaciones from "./pages/EnvioNotificaciones";
import GestionCorrespondencia from "./pages/GestionCorrespondencia";
import EventosCondominio from "./pages/EventosCondominio";
import ControlMonitoreoAccesos from "./pages/ControlMonitoreoAccesos";
import GestionContratos from "./pages/GestionContratos";
import AyudaSoporte from "./pages/AyudaSoporte";
import Configuracion from "./pages/Configuracion";
import Usuario from "./pages/Usuario";
import ReportePagos from "./pages/ReportePagos";
import ReporteMantenimiento from "./pages/ReporteMantenimiento";
import ReporteCorrespondencia from "./pages/ReporteCorrespondencia";

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
          path="/envio-notificaciones"
          element={
            <ProtectedRoute>
              <EnvioNotificaciones />
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
          path="/eventos-condominio"
          element={
            <ProtectedRoute>
              <EventosCondominio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/control-monitoreo-accesos"
          element={
            <ProtectedRoute>
              <ControlMonitoreoAccesos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-contratos"
          element={
            <ProtectedRoute>
              <GestionContratos />
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
          path="/reporte-mantenimiento"
          element={
            <ProtectedRoute>
              <ReporteMantenimiento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reporte-correspondencia"
          element={
            <ProtectedRoute>
              <ReporteCorrespondencia />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
