import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state
    try {
      console.log("Datos enviados:", { email, password }); // Depuración
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response || error.message
      );
      setError("Credenciales incorrectas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sección Izquierda */}
      <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-800 text-white p-8">
        <img
          src="https://www.grupo-sanjose.com/data/foto/gran_1437497471_218267892.jpg"
          alt="Condominio Parques de la Huaca"
          className="w-2/3 rounded-lg shadow-lg"
        />
        <h2 className="text-3xl font-bold mt-4">
          Condominio Parques de la Huaca
        </h2>
        <p className="text-gray-300 mt-2">
          Gestiona tu condominio de manera eficiente y transparente.
        </p>
      </div>

      {/* Sección Derecha */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">Iniciar Sesión</h3>
          <p className="text-gray-600 mb-6">
            Accede para gestionar tu condominio
          </p>

          {/* Mensaje de Error */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-800"
                >
                  Recuérdame
                </label>
              </div>
              <Link
                to="/olvidaste-contrasena"
                className="text-sm text-blue-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg shadow ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="loader animate-spin mr-2"></span>
                  Cargando...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
