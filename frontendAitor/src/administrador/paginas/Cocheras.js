import React, { useState } from 'react';
import { cocheraData } from '../config/CocheraData';
import CocheraFilter from '../componentes/CocheraFilter';
import CocheraTable from '../componentes/CocheraTable';
import '../styles/global.css'; // Nueva ruta correcta

const Cocheras = () => {
    const [filteredData, setFilteredData] = useState(cocheraData);

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = cocheraData.filter(
            (cochera) =>
                cochera.id.toLowerCase().includes(lowerCaseQuery) ||
                cochera.numero.toLowerCase().includes(lowerCaseQuery) ||
                cochera.asignada.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredData(filtered);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Cocheras</h2>
                <button className="action-btn">
                    <i className="fas fa-plus"></i> Asignar Nueva Cochera
                </button>
            </div>
            <CocheraFilter onSearch={handleSearch} />
            <CocheraTable data={filteredData} />
        </div>
    );
};

export default Cocheras;
