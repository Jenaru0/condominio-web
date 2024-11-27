import React, { useState } from 'react';
import '../styles/global.css';

const Notificaciones = () => {
    const [formData, setFormData] = useState({
        audiencia: [],
        plantilla: '',
        asunto: '',
        mensaje: '',
        urgente: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const audiencia = checked
                ? [...prev.audiencia, value]
                : prev.audiencia.filter((item) => item !== value);
            return { ...prev, audiencia };
        });
    };

    const handleClearForm = () => {
        setFormData({
            audiencia: [],
            plantilla: '',
            asunto: '',
            mensaje: '',
            urgente: false,
        });
    };

    const handlePreview = () => {
        alert(`Previsualización:\nAsunto: ${formData.asunto}\nMensaje: ${formData.mensaje}`);
    };

    const handleSendNotification = () => {
        console.log('Enviando notificación:', formData);
        alert('Notificación enviada con éxito');
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Envío de Notificaciones</h2>
            </div>
            <form className="form-container">
                {/* Audiencia */}
                <div className="form-group checkbox-group">
                    <label>Audiencia:</label>
                    <label>
                        <input
                            type="checkbox"
                            value="Todos"
                            onChange={handleCheckboxChange}
                            checked={formData.audiencia.includes('Todos')}
                        />
                        Todos
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Residentes"
                            onChange={handleCheckboxChange}
                            checked={formData.audiencia.includes('Residentes')}
                        />
                        Residentes
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Personal de Seguridad"
                            onChange={handleCheckboxChange}
                            checked={formData.audiencia.includes('Personal de Seguridad')}
                        />
                        Personal de Seguridad
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Técnicos"
                            onChange={handleCheckboxChange}
                            checked={formData.audiencia.includes('Técnicos')}
                        />
                        Técnicos
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Usuarios específicos"
                            onChange={handleCheckboxChange}
                            checked={formData.audiencia.includes('Usuarios específicos')}
                        />
                        Seleccionar usuarios específicos
                    </label>
                </div>

                {/* Plantilla */}
                <div className="form-group">
                    <label>Usar una Plantilla de Notificación:</label>
                    <select
                        name="plantilla"
                        value={formData.plantilla}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona una plantilla (opcional)</option>
                        <option value="Plantilla 1">Plantilla 1</option>
                        <option value="Plantilla 2">Plantilla 2</option>
                        <option value="Plantilla 3">Plantilla 3</option>
                    </select>
                </div>

                {/* Asunto */}
                <div className="form-group">
                    <label>Asunto:</label>
                    <input
                        type="text"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleInputChange}
                        placeholder="Asunto de la notificación"
                    />
                </div>

                {/* Mensaje */}
                <div className="form-group">
                    <label>Mensaje:</label>
                    <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Escribir el mensaje aquí..."
                    />
                </div>

                {/* Urgente */}
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="urgente"
                            checked={formData.urgente}
                            onChange={handleInputChange}
                        />
                        Marcar como notificación urgente
                    </label>
                </div>

                {/* Botones */}
                <div className="button-container">
                    <button type="button" className="send-btn" onClick={handleSendNotification}>
                        Enviar notificación
                    </button>
                    <button type="button" className="preview-btn" onClick={handlePreview}>
                        Previsualizar
                    </button>
                    <button type="button" className="clear-btn" onClick={handleClearForm}>
                        Limpiar campos
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Notificaciones;
