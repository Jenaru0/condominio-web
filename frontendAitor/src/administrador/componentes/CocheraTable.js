import React from 'react';
import './CocheraTable.css';

const CocheraTable = ({ data }) => {
    return (
        <div className="table-container">
            <table className="cochera-table">
                <thead>
                <tr>
                    <th>ID Cochera</th>
                    <th>Número de Cochera</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>Asignada a</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map((cochera) => (
                    <tr key={cochera.id}>
                        <td>{cochera.id}</td>
                        <td>{cochera.numero}</td>
                        <td>{cochera.ubicacion}</td>
                        <td>
                            <span
                                className={`status-badge ${
                                    cochera.estado === 'Disponible' ? 'available' : 'occupied'
                                }`}
                            >
                                {cochera.estado}
                            </span>
                        </td>
                        <td>{cochera.asignada}</td>
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

export default CocheraTable;
