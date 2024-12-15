import React from "react";
import { Bar } from "react-chartjs-2";

const EstadisticasAccesos = ({ stats }) => {
    const dataChart = {
        labels: ["Entradas", "Salidas"],
        datasets: [
            {
                label: "Estadísticas de Accesos",
                data: [stats.entradas, stats.salidas],
                backgroundColor: ["#4CAF50", "#FFC107"],
            },
        ],
    };

    return (
        <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Estadísticas</h2>
            <Bar data={dataChart} />
        </div>
    );
};

export default EstadisticasAccesos;
