import React from "react";
import ReactDOM from "react-dom/client"; // Importa createRoot en lugar de render
import "./assets/estilos/index.css";
import App from "./App";
// src/index.js
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contextos/AuthContext";

// Crea la raíz con createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Medición de rendimiento opcional
reportWebVitals();
