import React, { useState, useEffect } from "react";

// Componente para los filtros de documentos
const DocumentFilters = ({ filters, onFilterChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
            type="text"
            value={filters.nombre}
            onChange={(e) => onFilterChange("nombre", e.target.value)}
            placeholder="Buscar por nombre..."
            className="border rounded-lg px-4 py-2 w-full"
        />
        <select
            value={filters.tipo}
            onChange={(e) => onFilterChange("tipo", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        >
            <option value="">Tipo (Todos)</option>
            <option value="Contrato">Contrato</option>
            <option value="Reglamento">Reglamento</option>
        </select>
        <select
            value={filters.estado}
            onChange={(e) => onFilterChange("estado", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        >
            <option value="">Estado (Todos)</option>
            <option value="Vigente">Vigente</option>
            <option value="Expirado">Expirado</option>
        </select>
        <input
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        />
        <input
            type="date"
            value={filters.fechaFin}
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
        />
    </div>
);

// Componente principal para la gestión de documentos
const GestionDocumentos = () => {
    const [documentos, setDocumentos] = useState([]);
    const [filteredDocumentos, setFilteredDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        nombre: "",
        tipo: "",
        estado: "",
        fechaInicio: "",
        fechaFin: "",
    });

    useEffect(() => {
        // Simulación de datos de la colección Contratos y Documentos
        const mockDocumentos = [
            {
                _id: "1",
                nombre_documento: "Contrato de Mantenimiento 2024",
                tipo: "Contrato",
                estado: "Vigente",
                fecha_expiracion: "2024-12-31",
                documento_url: "https://example.com/documento1.pdf",
            },
            {
                _id: "2",
                nombre_documento: "Reglamento Interno 2023",
                tipo: "Reglamento",
                estado: "Expirado",
                fecha_expiracion: "2023-11-30",
                documento_url: "https://example.com/documento2.pdf",
            },
        ];

        setTimeout(() => {
            setDocumentos(mockDocumentos);
            setFilteredDocumentos(mockDocumentos);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        // Aplicar filtros dinámicos
        const filtered = documentos.filter((doc) => {
            const matchesNombre =
                !filters.nombre ||
                doc.nombre_documento
                    .toLowerCase()
                    .includes(filters.nombre.toLowerCase());
            const matchesTipo = !filters.tipo || doc.tipo === filters.tipo;
            const matchesEstado = !filters.estado || doc.estado === filters.estado;
            const matchesFechaInicio =
                !filters.fechaInicio ||
                new Date(doc.fecha_expiracion) >= new Date(filters.fechaInicio);
            const matchesFechaFin =
                !filters.fechaFin ||
                new Date(doc.fecha_expiracion) <= new Date(filters.fechaFin);

            return (
                matchesNombre &&
                matchesTipo &&
                matchesEstado &&
                matchesFechaInicio &&
                matchesFechaFin
            );
        });

        setFilteredDocumentos(filtered);
    }, [filters, documentos]);

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const subirDocumento = () => {
        alert("Funcionalidad de subir documentos aún no implementada.");
    };

    const editarDocumento = (id) => {
        alert(
            `Funcionalidad de edición para el documento con ID ${id} aún no implementada.`
        );
    };

    const eliminarDocumento = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este documento?")) {
            setDocumentos((prev) => prev.filter((doc) => doc._id !== id));
            setFilteredDocumentos((prev) => prev.filter((doc) => doc._id !== id));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold">Cargando documentos...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Gestión de Documentos
            </h1>

            {/* Filtros */}
            <DocumentFilters filters={filters} onFilterChange={handleFilterChange} />

            {/* Acciones */}
            <div className="mb-4 flex justify-end">
                <button
                    onClick={subirDocumento}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Subir Nuevo Documento
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-white shadow rounded-lg p-6">
                <table className="table-auto w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Nombre</th>
                        <th className="px-4 py-2 text-left">Tipo</th>
                        <th className="px-4 py-2 text-left">Estado</th>
                        <th className="px-4 py-2 text-left">Fecha de Expiración</th>
                        <th className="px-4 py-2 text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredDocumentos.length > 0 ? (
                        filteredDocumentos.map((doc) => (
                            <tr key={doc._id} className="border-t">
                                <td className="px-4 py-2">{doc.nombre_documento}</td>
                                <td className="px-4 py-2">{doc.tipo}</td>
                                <td className="px-4 py-2">{doc.estado}</td>
                                <td className="px-4 py-2">{doc.fecha_expiracion}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <a
                                        href={doc.documento_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-500 text-white px-2 py-1 rounded-lg"
                                    >
                                        Ver
                                    </a>
                                    <button
                                        onClick={() => editarDocumento(doc._id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => eliminarDocumento(doc._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                No se encontraron documentos con los filtros aplicados.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionDocumentos;
