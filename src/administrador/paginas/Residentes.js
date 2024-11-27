import React, { useState } from 'react';
import { residentData } from '../config/residentData';
import ResidentFilter from '../componentes/ResidentFilter';
import ResidentTable from '../componentes/ResidentTable';
import '../styles/global.css'; // Nueva ruta correcta

const Residentes = () => {
    const [filteredData, setFilteredData] = useState(residentData);

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = residentData.filter(
            (resident) =>
                resident.id.toLowerCase().includes(lowerCaseQuery) ||
                resident.nombre.toLowerCase().includes(lowerCaseQuery) ||
                resident.email.toLowerCase().includes(lowerCaseQuery) ||
                resident.telefono.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredData(filtered);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Residentes</h2>
                <button className="action-btn">
                    <i className="fas fa-user-plus"></i> Añadir Nuevo Residente
                </button>
            </div>
            <ResidentFilter onSearch={handleSearch} />
            <ResidentTable data={filteredData} />
        </div>
    );
};

export default Residentes;
