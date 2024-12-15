import React from "react";

const Boton = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
    >
        {label}
    </button>
);

export default Boton;
