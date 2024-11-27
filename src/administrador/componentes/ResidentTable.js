import React from 'react';
import './ResidentTable.css';

const ResidentTable = ({ data }) => {
    return (
        <div className="table-container">
            <table className="resident-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Tipo</th>
                    <th>Propietario Asociado</th>
                    <th>Edificio</th>
                    <th>Piso</th>
                    <th>Número de Departamento</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map((resident) => (
                    <tr key={resident.id}>
                        <td>{resident.id}</td>
                        <td>{resident.nombre}</td>
                        <td>{resident.email}</td>
                        <td>{resident.telefono}</td>
                        <td>
                                <span
                                    className={`type-badge ${
                                        resident.tipo === 'Propietario' ? 'owner' : 'tenant'
                                    }`}
                                >
                                    {resident.tipo}
                                </span>
                        </td>
                        <td>{resident.propietarioAsociado}</td>
                        <td>{resident.edificio}</td>
                        <td>{resident.piso}</td>
                        <td>{resident.departamento}</td>
                        <td>
                            <button className="edit-btn">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="delete-btn">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResidentTable;
