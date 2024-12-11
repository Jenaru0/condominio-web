// src/Routes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "../diseños/ProtectedLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../paginas/Autenticacion/LoginPage";
import Dashboard from "../paginas/Dashboard/Dashboard";
import Propietarios from "../paginas/Usuarios/Administrador/propietarios/Propietarios";
import Inquilinos from "../paginas/Usuarios/Administrador/inquilinos/Inquilinos";
import Empleados from "../paginas/Usuarios/Administrador/empleados/Empleados";
import RolesPermisos from "../paginas/Usuarios/Administrador/rolesypermisos/RolesPermisos";
import Departamentos from "../paginas/Propiedades/departamentos/Departamentos";
import Cocheras from "../paginas/Propiedades/cocheras/Cocheras";
import SolicitudesServicio from "../paginas/Mantenimiento/Administrador/SolicitudesServicio";
import Reservas from "../paginas/AreasComunes/Administrador/reservas/Reservas";
import ConfiguracionAreas from "../paginas/AreasComunes/Administrador/configuracionAreas/ConfiguracionAreas";
import Correspondencia from "../paginas/Correspondencia/Administrador/Correspondencia";
import Eventos from "../paginas/Eventos/Administrador/Eventos";
import VerificacionPagos from "../paginas/Pagos/Administrador/VerificacionPagos";
import EstadosCuenta from "../paginas/Pagos/Administrador/EstadosCuenta";
import Facturacion from "../paginas/Pagos/Administrador/Facturacion";
import GestionDocumentos from "../paginas/Documentos/Administrador/GestionDocumentos";
import ReportesFinancieros from "../paginas/Reportes/Administrador/ReportesFinancieros";
import ReportesOperativos from "../paginas/Reportes/Administrador/ReportesOperativos";
import ControlAccesos from "../paginas/Seguridad/ControlAccesos";
import IncidentesSeguridad from "../paginas/Seguridad/IncidentesSeguridad";
import SolicitudesMantenimiento from "../paginas/Mantenimiento/Administrador/SolicitudesMantenimiento";
import EnviarNotificaciones from "../paginas/Notificaciones/Administrador/EnviarNotificaciones";
import AyudaSoporte from "../paginas/AyudaSoporte/AyudaSoporte";
import Configuracion from "../paginas/Configuracion/Configuracion";
import Usuario from "../paginas/Usuarios/Administrador/Usuario";
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
          path="/usuarios/propietarios"
          element={
            <ProtectedRoute>
              <Propietarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/inquilinos"
          element={
            <ProtectedRoute>
              <Inquilinos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/empleados"
          element={
            <ProtectedRoute>
              <Empleados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/roles-permisos"
          element={
            <ProtectedRoute>
              <RolesPermisos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/propiedades/departamentos"
          element={
            <ProtectedRoute>
              <Departamentos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mantenimiento/solicitudes-servicio"
          element={
            <ProtectedRoute>
              <SolicitudesServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Areas-comunes/reservas"
          element={
            <ProtectedRoute>
              <Reservas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Areas-comunes/configuracion"
          element={
            <ProtectedRoute>
              <ConfiguracionAreas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/correspondencia"
          element={
            <ProtectedRoute>
              <Correspondencia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventos"
          element={
            <ProtectedRoute>
              <Eventos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagos/verificacion-pagos"
          element={
            <VerificacionPagos>
              <Eventos />
            </VerificacionPagos>
          }
        />
        <Route
          path="/pagos/estados-de-cuenta"
          element={
            <EstadosCuenta>
              <Eventos />
            </EstadosCuenta>
          }
        />
        <Route
          path="/pagos/facturacion"
          element={
            <Facturacion>
              <Eventos />
            </Facturacion>
          }
        />
        <Route
          path="/documentos/gestion-documentos"
          element={
            <GestionDocumentos>
              <Eventos />
            </GestionDocumentos>
          }
        />
        <Route
          path="/reportes/financieros"
          element={
            <ReportesFinancieros>
              <Eventos />
            </ReportesFinancieros>
          }
        />
        <Route
          path="/reportes/operativos"
          element={
            <ReportesOperativos>
              <Eventos />
            </ReportesOperativos>
          }
        />
        <Route
          path="/seguridad/control-accesos"
          element={
            <ProtectedRoute>
              <ControlAccesos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seguridad/incidentes-seguridad"
          element={
            <ProtectedRoute>
              <IncidentesSeguridad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/propiedades/cocheras"
          element={
            <ProtectedRoute>
              <Cocheras />
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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
