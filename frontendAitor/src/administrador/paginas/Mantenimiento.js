import React from 'react';
import { maintenancePendientes, maintenanceHistorial } from '../config/MaintenanceData';
import MantenimientoTable from '../componentes/MantenimientoTable';
import '../styles/global.css';

const Mantenimiento = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Mantenimiento</h2>
                <button className="action-btn">
                    <i className="fas fa-plus"></i> Nueva Solicitud
                </button>
            </div>
            <MantenimientoTable pendientes={maintenancePendientes} historial={maintenanceHistorial} />
        </div>
    );
};

export default Mantenimiento;
