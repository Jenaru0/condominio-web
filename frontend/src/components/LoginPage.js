import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/usuarios/login', {// Cambia el URL del backend
        email,
        password,
      }, {
        withCredentials: true, // Asegúrate de mantener esto si usas cookies o tokens
      });
      localStorage.setItem('token', response.data.token);
      alert('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response || error.message);
      alert('Error al iniciar sesión, por favor verifica tus credenciales.');
    }    
  };  
  

  return (
    <div className="login-page-container">
      <div className="login-image-section">
        <div className="illustration">
          <img
            src="https://www.grupo-sanjose.com/data/foto/gran_1437497471_218267892.jpg"
            alt="Condominio Parques de la Huaca"
          />
          <h2>Condominio Parques de la Huaca</h2>
          <p>Gestiona tu condominio de manera eficiente y transparente.</p>
        </div>
      </div>
      <div className="login-form-section">
        <div className="login-form-card">
          <h3 className="login-title">Iniciar Sesión</h3>
          <p className="login-subtitle">Accede para gestionar tu condominio</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-options">
              <div>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Recuérdame</label>
              </div>
              <Link to="/olvidaste-contrasena" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button type="submit" className="btn-login">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
