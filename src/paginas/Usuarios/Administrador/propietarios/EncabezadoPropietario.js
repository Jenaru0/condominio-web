import React from "react";
import { motion } from "framer-motion";

const EncabezadoPropietarios = ({ onAdd }) => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">
            Propietarios
        </h1>
        <button
            onClick={onAdd}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
            + Crear Propietario
        </button>
    </motion.div>
);

export default EncabezadoPropietarios;
