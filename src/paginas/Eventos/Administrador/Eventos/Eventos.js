import React, { useState, useEffect } from "react";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import FiltrosEventos from "./FiltrosEventos";
import ListaEventos from "./ListaEventos";
import FormularioEvento from "./FormularioEvento";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  // Filtros
  const [filters, setFilters] = useState({
    estado: "",
    fecha: "",
    busqueda: "",
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockEventos = [
        {
          id: "E0549",
          nombreEvento: "Reunión General de Propietarios",
          fecha: "2024-10-05",
          asistencia: "15 Confirmados",
          estado: "Confirmado",
        },
        {
          id: "E0550",
          nombreEvento: "Fiesta de Navidad",
          fecha: "2024-12-24",
          asistencia: "10 Confirmados",
          estado: "Pendiente",
        },
      ];
      setEventos(mockEventos);
      setFilteredEventos(mockEventos);
      setLoading(false);
    }, 3000);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    let eventosFiltrados = [...eventos];
    const { estado, fecha, busqueda } = filters;

    if (estado) {
      eventosFiltrados = eventosFiltrados.filter((evento) => evento.estado === estado);
    }
    if (fecha) {
      eventosFiltrados = eventosFiltrados.filter((evento) => evento.fecha.includes(fecha));
    }
    if (busqueda) {
      eventosFiltrados = eventosFiltrados.filter((evento) =>
          evento.nombreEvento.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    setFilteredEventos(eventosFiltrados);
  };

  const resetFilters = () => {
    setFilters({ estado: "", fecha: "", busqueda: "" });
    setFilteredEventos(eventos);
  };

  if (loading) {
    return <LoadingSpinner text="Cargando eventos..." />;
  }

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Gestión de Eventos del Condominio" />
          <Boton label="+ Crear Nuevo Evento" onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Filtros */}
        <FiltrosEventos
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
        />

        {/* Lista de Eventos */}
        <ListaEventos eventos={filteredEventos} />

        {/* Formulario */}
        {isModalOpen && (
            <FormularioEvento
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={selectedEvento}
            />
        )}
      </div>
  );
};

export default Eventos;
