import React from "react";
import { motion } from "framer-motion";

const EncabezadoEmpleados = ({ onAdd }) => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-yellow-500 pb-2">
            Empleados
        </h1>
        <button
            onClick={onAdd}
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-300"
        >
            + Crear Empleado
        </button>
    </motion.div>
);

export default EncabezadoEmpleados;
