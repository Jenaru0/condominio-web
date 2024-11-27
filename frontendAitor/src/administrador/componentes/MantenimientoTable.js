import React from 'react';
import '../styles/global.css';

const MantenimientoTable = ({ pendientes, historial }) => {
    return (
        <>
            {/* Tabla de Solicitudes Pendientes */}
            <h3 className="section-title">Solicitudes Pendientes</h3>
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Residente</th>
                        <th>Fecha</th>
                        <th>Asunto</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendientes.map((solicitud) => (
                        <tr key={solicitud.id}>
                            <td>{solicitud.residente}</td>
                            <td>{solicitud.fecha}</td>
                            <td>{solicitud.asunto}</td>
                            <td>{solicitud.descripcion}</td>
                            <td>
                                <span className={`badge pendiente`}>Pendiente</span>
                            </td>
                            <td>
                                <button className="table-btn details">Ver Detalles</button>
                                <button className="table-btn cancel">Cancelar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Tabla de Historial de Solicitudes */}
            <h3 className="section-title">Historial de Solicitudes</h3>
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Residente</th>
                        <th>Fecha</th>
                        <th>Asunto</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Técnico Asignado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historial.map((solicitud) => (
                        <tr key={solicitud.id}>
                            <td>{solicitud.residente}</td>
                            <td>{solicitud.fecha}</td>
                            <td>{solicitud.asunto}</td>
                            <td>{solicitud.descripcion}</td>
                            <td>
                                    <span className={`badge ${solicitud.estado.toLowerCase()}`}>
                                        {solicitud.estado}
                                    </span>
                            </td>
                            <td>{solicitud.tecnicoAsignado || 'No Asignado'}</td>
                            <td>
                                <button className="table-btn details">Ver Detalles</button>
                                <button className="table-btn cancel">Cancelar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MantenimientoTable;
