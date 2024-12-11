import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ text = "Cargando..." }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.p
            className="text-2xl font-semibold text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
            }}
        >
            {text}
        </motion.p>
    </div>
);

export default LoadingSpinner;
