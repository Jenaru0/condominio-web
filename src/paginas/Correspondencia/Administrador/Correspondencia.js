import React, { useState, useEffect } from "react";
import Encabezado from "../../../componentes/comunes/Encabezado";
import Boton from "../../../componentes/comunes/Boton";
import LoadingSpinner from "../../../componentes/comunes/LoadingSpinner";
import FiltrosCorrespondencia from "./FiltrosCorrespondencia";
import FormularioCorrespondencia from "./FormularioCorrespondencia";
import ListaCorrespondencia from "./ListaCorrespondencia";

const Correspondencia = () => {
  const [correspondencia, setCorrespondencia] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    usuario_id: "",
    tipo_correspondencia: "",
    descripcion: "",
    fecha_recepcion: "",
    estado: "Pendiente",
    notificado: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    tipo_correspondencia: "",
    estado: "",
  });
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const mockCorrespondencia = [
      {
        id: 1,
        usuario_id: "101",
        tipo_correspondencia: "Paquete",
        descripcion: "Amazon - Pedido de libros",
        fecha_recepcion: "2023-12-10",
        estado: "Pendiente",
        notificado: true,
      },
      {
        id: 2,
        usuario_id: "102",
        tipo_correspondencia: "Carta",
        descripcion: "Carta del banco",
        fecha_recepcion: "2023-12-09",
        estado: "Entregado",
        notificado: false,
      },
    ];

    const mockUsers = [
      { id: "101", name: "Juan Pérez" },
      { id: "102", name: "María López" },
    ];

    setTimeout(() => {
      setCorrespondencia(mockCorrespondencia);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = () => {
    if (isEditing) {
      const updatedCorrespondencia = correspondencia.map((item) =>
          item.id === form.id ? form : item
      );
      setCorrespondencia(updatedCorrespondencia);
      alert("Registro de correspondencia actualizado con éxito");
    } else {
      const newCorrespondencia = { ...form, id: correspondencia.length + 1 };
      setCorrespondencia([...correspondencia, newCorrespondencia]);
      alert("Registro de correspondencia creado con éxito");
    }

    closeForm();
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      setCorrespondencia(correspondencia.filter((item) => item.id !== id));
      alert("Registro eliminado con éxito");
    }
  };

  const openForm = () => {
    setForm({
      id: null,
      usuario_id: "",
      tipo_correspondencia: "",
      descripcion: "",
      fecha_recepcion: "",
      estado: "Pendiente",
      notificado: false,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const filteredCorrespondencia = correspondencia.filter((item) => {
    const matchesTipo =
        !filters.tipo_correspondencia ||
        item.tipo_correspondencia === filters.tipo_correspondencia;
    const matchesEstado = !filters.estado || item.estado === filters.estado;

    const user = users.find((u) => u.id === item.usuario_id);
    const matchesSearch =
        item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
        (user?.name.toLowerCase().includes(search.toLowerCase()) ?? false);

    return matchesTipo && matchesEstado && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner text="Cargando registros de correspondencia..." />;
  }

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Encabezado y botón para crear */}
        <div className="flex justify-between items-center mb-8">
          <Encabezado titulo="Gestión de Correspondencia" />
          <Boton label="+ Crear Registro" onClick={openForm} />
        </div>

        {/* Filtros */}
        <FiltrosCorrespondencia
            filters={filters}
            setFilters={setFilters}
            search={search}
            setSearch={setSearch}
        />

        {/* Lista */}
        <ListaCorrespondencia
            correspondencia={filteredCorrespondencia}
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />

        {/* Formulario */}
        {isModalOpen && (
            <FormularioCorrespondencia
                open={isModalOpen}
                form={form}
                setForm={setForm}
                users={users}
                isEditing={isEditing}
                handleSubmit={handleSubmit}
                onClose={closeForm}
            />
        )}
      </div>
  );
};

export default Correspondencia;
