import React from "react";
import { Bar } from "react-chartjs-2";

const GraficoFinancieros = ({ datosGrafico }) => (
    <div
        className="bg-white shadow rounded-lg p-6 mb-6"
        style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
    >
        <h2 className="text-xl font-semibold mb-4">Gráfico Financiero</h2>
        <Bar data={datosGrafico} />
    </div>
);

export default GraficoFinancieros;
