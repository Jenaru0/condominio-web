import React from "react";
import { motion } from "framer-motion";

const Encabezado = ({ titulo }) => (
    <motion.div
        className="mb-0" // Quitamos el margin bottom para ajustar más
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-4xl font-bold text-gray-800 pb-2 border-b-4 border-blue-500 inline-block">
            {titulo}
        </h1>
    </motion.div>
);

export default Encabezado;
