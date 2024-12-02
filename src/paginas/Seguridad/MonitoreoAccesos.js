import React, { useState, useEffect } from "react";

const MonitoreoAccesos = () => {
  const [accesos, setAccesos] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      const response = await fetch("/api/accesos");
      const data = await response.json();
      setAccesos(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Monitoreo de Accesos</h1>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Hora de Acceso</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {accesos.map((acceso, index) => (
            <tr key={index}>
              <td>{acceso.usuario}</td>
              <td>{acceso.hora}</td>
              <td>{acceso.accion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitoreoAccesos;
