import React from "react";
import { motion } from "framer-motion";

const EncabezadoInquilinos = ({ onAdd }) => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-orange-500 pb-2">
            Inquilinos
        </h1>
        <button
            onClick={onAdd}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
        >
            + Crear Inquilino
        </button>
    </motion.div>
);

export default EncabezadoInquilinos;
