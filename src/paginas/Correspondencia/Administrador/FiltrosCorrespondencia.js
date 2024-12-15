import React from "react";

const FiltrosCorrespondencia = ({ filters, setFilters, search, setSearch }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
            value={filters.tipo_correspondencia}
            onChange={(e) =>
                setFilters({ ...filters, tipo_correspondencia: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
        >
            <option value="">Tipo (Todos)</option>
            <option value="Paquete">Paquete</option>
            <option value="Carta">Carta</option>
            <option value="Notificación">Notificación</option>
        </select>
        <select
            value={filters.estado}
            onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
            className="border rounded-lg px-4 py-2 w-full"
        >
            <option value="">Estado (Todos)</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Entregado">Entregado</option>
        </select>
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por descripción o usuario..."
            className="border rounded-lg px-4 py-2 w-full"
        />
    </div>
);

export default FiltrosCorrespondencia;
