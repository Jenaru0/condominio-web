import React from "react";
import { motion } from "framer-motion";

const EncabezadoAccesos = () => (
    <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-2">
            Control de Accesos
        </h1>
    </motion.div>
);

export default EncabezadoAccesos;
