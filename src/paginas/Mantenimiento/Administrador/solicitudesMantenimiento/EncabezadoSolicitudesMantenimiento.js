import React from "react";
import { motion } from "framer-motion";

const EncabezadoSolicitudesMantenimiento = ({ onAdd }) => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-600 pb-2">
            Solicitudes de Mantenimiento
        </h1>
        <button
            onClick={onAdd}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
        >
            + Nueva Solicitud
        </button>
    </motion.div>
);

export default EncabezadoSolicitudesMantenimiento;
