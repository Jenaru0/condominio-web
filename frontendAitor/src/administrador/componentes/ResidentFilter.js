import React from 'react';
import './ResidentFilter.css';

const ResidentFilter = ({ onSearch }) => {
    const handleSearch = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="resident-filter">
            <div className="filter-group">
                <select className="filter-select">
                    <option value="Todos">Edificio</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
                <select className="filter-select">
                    <option value="Todos">Piso</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <select className="filter-select">
                    <option value="Todos">Tipo de residente</option>
                    <option value="Propietario">Propietario</option>
                    <option value="Inquilino">Inquilino</option>
                </select>
                <input
                    type="text"
                    placeholder="Buscar por ID, Nombre, Email o Teléfono"
                    className="filter-input"
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
};

export default ResidentFilter;
