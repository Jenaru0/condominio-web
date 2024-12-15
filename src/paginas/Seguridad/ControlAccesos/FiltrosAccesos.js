import React from "react";

const FiltrosAccesos = ({ filters, onFilterChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="bg-white shadow p-4 rounded-lg mb-6">
            <input
                name="busqueda"
                type="text"
                placeholder="Buscar por nombre o DNI"
                value={filters.busqueda}
                onChange={handleInputChange}
                className="border p-2 rounded w-full mb-4"
            />
            {/* Futuros inputs para otros filtros */}
        </div>
    );
};

export default FiltrosAccesos;
