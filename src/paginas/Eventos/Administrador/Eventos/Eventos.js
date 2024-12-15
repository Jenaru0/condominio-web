import React, { useState, useEffect } from "react";
import Encabezado from "../../../../componentes/comunes/Encabezado";
import Boton from "../../../../componentes/comunes/Boton";
import FiltrosEventos from "./FiltrosEventos";
import ListaEventos from "./ListaEventos";
import FormularioEvento from "./FormularioEvento";
import LoadingSpinner from "../../../../componentes/comunes/LoadingSpinner";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado inicial de carga
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  // Simulación de carga de datos
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
          estadoColor: "bg-green-500",
        },
        {
          id: "E0550",
          nombreEvento: "Fiesta de Navidad",
          fecha: "2024-12-24",
          asistencia: "10 Confirmados",
          estado: "Pendiente",
          estadoColor: "bg-red-500",
        },
      ];
      setEventos(mockEventos);
      setLoading(false);
    }, 3000); // Simulación de carga de 3 segundos
  }, []);

  const handleEliminar = (id) => {
    const nuevoListado = eventos.filter((evento) => evento.id !== id);
    setEventos(nuevoListado);
    alert("Evento eliminado con éxito");
  };

  const handleEdit = (evento) => {
    setSelectedEvento(evento);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedEvento(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (selectedEvento) {
      setEventos((prev) =>
          prev.map((e) => (e.id === selectedEvento.id ? formData : e))
      );
      alert("Evento actualizado con éxito");
    } else {
      setEventos((prev) => [...prev, { ...formData, id: `E${prev.length + 1}` }]);
      alert("Evento creado con éxito");
    }
    setIsModalOpen(false);
  };

  if (loading) {
    return <LoadingSpinner text="Cargando eventos..." />;
  }

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Encabezado y Botón */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Gestión de Eventos del Condominio" />
          <Boton label="+ Crear Nuevo Evento" onClick={handleCreate} />
        </div>

        {/* Filtros */}
        <FiltrosEventos />

        {/* Lista de Eventos */}
        <ListaEventos eventos={eventos} onEdit={handleEdit} onDelete={handleEliminar} />

        {/* Formulario */}
        {isModalOpen && (
            <FormularioEvento
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={selectedEvento}
            />
        )}
      </div>
  );
};

export default Eventos;
