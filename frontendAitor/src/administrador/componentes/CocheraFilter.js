import React from 'react';
import './CocheraFilter.css';

const CocheraFilter = ({ onSearch }) => {
    const handleSearch = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="cochera-filter">
            <div className="filter-group">
                <select className="filter-select">
                    <option value="Todos">Ubicación</option>
                    <option value="Subterráneo">Subterráneo</option>
                    <option value="Superficie">Superficie</option>
                </select>
                <select className="filter-select">
                    <option value="Todos">Estados</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupada">Ocupada</option>
                </select>
                <input
                    type="text"
                    placeholder="Buscar por ID, número o propietario"
                    className="filter-input"
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
};

export default CocheraFilter;
