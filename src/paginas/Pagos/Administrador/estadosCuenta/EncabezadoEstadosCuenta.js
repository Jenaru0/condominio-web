import React from "react";
import { motion } from "framer-motion";

const EncabezadoEstadosCuenta = ({ onExport }) => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-2">
            Estados de Cuenta
        </h1>
        <button
            onClick={onExport}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
            Exportar a Excel
        </button>
    </motion.div>
);

export default EncabezadoEstadosCuenta;
