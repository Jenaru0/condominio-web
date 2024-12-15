import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Box, Button } from "@mui/material";
import Encabezado from "../../../componentes/comunes/Encabezado";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import FiltrosDeIncidentes from "./FiltrosDeIncidentes";
import EstadisticasIncidentes from "./EstadisticasIncidentes";
import ListaIncidentes from "./ListaIncidentes";

const IncidentesSeguridad = () => {
    const [incidentes, setIncidentes] = useState([]);
    const [filteredIncidentes, setFilteredIncidentes] = useState([]);
    const [filtros, setFiltros] = useState({ estado: "", prioridad: "", fechaInicio: "", fechaFin: "", busqueda: "" });
    const [estadisticas, setEstadisticas] = useState({ pendiente: 0, enProceso: 0, resuelto: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockIncidentes = [
            { _id: "1", descripcion: "Robo en Edificio A", fechaIncidente: "2023-12-01", prioridad: "Alta", estado: "Pendiente" },
            { _id: "2", descripcion: "Daño en estacionamiento", fechaIncidente: "2023-11-25", prioridad: "Media", estado: "En Proceso" },
            { _id: "3", descripcion: "Acceso no autorizado", fechaIncidente: "2023-12-05", prioridad: "Alta", estado: "Resuelto" },
        ];
        setTimeout(() => {
            setIncidentes(mockIncidentes);
            setFilteredIncidentes(mockIncidentes);
            calcularEstadisticas(mockIncidentes);
            setLoading(false);
        }, 1000);
    }, []);

    const calcularEstadisticas = (data) => {
        setEstadisticas({
            pendiente: data.filter((i) => i.estado === "Pendiente").length,
            enProceso: data.filter((i) => i.estado === "En Proceso").length,
            resuelto: data.filter((i) => i.estado === "Resuelto").length,
        });
    };

    const cambiarFiltro = (clave, valor) => setFiltros((prev) => ({ ...prev, [clave]: valor }));

    const exportarExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredIncidentes.map(({ _id, ...rest }) => rest));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Incidentes");
        saveAs(new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })]), "incidentes_seguridad.xlsx");
    };

    if (loading) return <LoadingSpinner text="Cargando incidentes de seguridad..." />;

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            <Encabezado titulo="Incidentes de Seguridad" />
            <FiltrosDeIncidentes filtros={filtros} cambiarFiltro={cambiarFiltro} aplicarFiltros={() => {}} restablecerFiltros={() => setFiltros({})} />
            <EstadisticasIncidentes estadisticas={estadisticas} />
            <Box className="flex justify-end mb-2">
                <Button variant="contained" onClick={exportarExcel} sx={{ backgroundColor: "#1d4ed8" }}>
                    Exportar a Excel
                </Button>
            </Box>
            <ListaIncidentes incidentes={filteredIncidentes} />
        </Box>
    );
};

export default IncidentesSeguridad;
