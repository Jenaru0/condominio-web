import React, { useState } from "react";

const EnvioNotificaciones = () => {
  // Estados para el formulario
  const [audiencia, setAudiencia] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esUrgente, setEsUrgente] = useState(false);

  // Funciones manejadoras
  const handleAudienciaChange = (opcion) => {
    setAudiencia((prev) =>
      prev.includes(opcion)
        ? prev.filter((item) => item !== opcion)
        : [...prev, opcion]
    );
  };

  const handleEnviar = () => {
    console.log({
      audiencia,
      plantilla,
      asunto,
      mensaje,
      esUrgente,
    });
    alert("Notificación enviada");
  };

  const handlePrevisualizar = () => {
    alert(
      `Previsualización:\n\nAsunto: ${asunto}\nMensaje: ${mensaje}\nAudiencia: ${audiencia.join(
        ", "
      )}\nUrgente: ${esUrgente ? "Sí" : "No"}`
    );
  };

  const handleLimpiar = () => {
    setAudiencia([]);
    setPlantilla("");
    setAsunto("");
    setMensaje("");
    setEsUrgente(false);
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full max-w-screen-xl bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Envío de Notificaciones</h1>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          🔔 Notificaciones
        </button>
      </header>

      {/* Formulario */}
      <section className="w-full max-w-screen-xl mt-6 bg-white shadow-md rounded-lg p-6">
        {/* Selección de Audiencia */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Audiencia:</h2>
          <div className="flex flex-wrap gap-4">
            {["Todos", "Residentes", "Personal de Seguridad", "Técnicos", "Seleccionar usuarios específicos"].map(
              (opcion) => (
                <label key={opcion} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={audiencia.includes(opcion)}
                    onChange={() => handleAudienciaChange(opcion)}
                  />
                  {opcion}
                </label>
              )
            )}
          </div>
        </div>

        {/* Plantilla */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Usar una Plantilla de Notificación:
          </h2>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={plantilla}
            onChange={(e) => setPlantilla(e.target.value)}
          >
            <option value="">Selecciona una plantilla (opcional)</option>
            <option value="plantilla1">Plantilla 1</option>
            <option value="plantilla2">Plantilla 2</option>
          </select>
        </div>

        {/* Asunto */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Asunto:</h2>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Asunto de la notificación"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
        </div>

        {/* Mensaje */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Mensaje:</h2>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="5"
            placeholder="Escribir el mensaje aquí..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
        </div>

        {/* Notificación Urgente */}
        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={esUrgente}
              onChange={() => setEsUrgente(!esUrgente)}
            />
            Marcar como notificación urgente
          </label>
        </div>

        {/* Botones */}
        <div className="flex justify-between">
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
            onClick={handleEnviar}
          >
            📤 Enviar notificación
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
            onClick={handlePrevisualizar}
          >
            👁️ Previsualizar
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
            onClick={handleLimpiar}
          >
            ❌ Limpiar campos
          </button>
        </div>
      </section>
    </div>
  );
};

export default EnvioNotificaciones;
