import React from "react";
import { FaSearch } from "react-icons/fa";

const FiltrosEventos = () => {
    return (
        <section className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
                <select className="border border-gray-300 rounded-lg p-2">
                    <option value="">Estado</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendiente">Pendiente</option>
                </select>
                <input type="date" className="border border-gray-300 rounded-lg p-2" />
                <input
                    type="text"
                    placeholder="Buscar por nombre del evento"
                    className="border border-gray-300 rounded-lg p-2"
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-400">
                    <FaSearch /> Buscar
                </button>
            </div>
        </section>
    );
};

export default FiltrosEventos;
