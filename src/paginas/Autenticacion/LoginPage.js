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
    setError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {/* Decoración de Fondo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>

        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Sección Izquierda */}
          <div className="md:w-1/2 bg-gradient-to-b from-blue-500 to-blue-600 text-white p-10 flex flex-col justify-center items-center relative rounded-l-3xl">
            <img
                src="https://www.grupo-sanjose.com/data/foto/gran_1437497471_218267892.jpg"
                alt="Condominio Parques de la Huaca"
                className="w-3/4 rounded-xl shadow-xl"
            />
            <h2 className="text-4xl font-bold mt-6 text-center">
              Condominio Parques de la Huaca
            </h2>
            <p className="text-gray-200 mt-4 text-center text-lg leading-relaxed">
              Gestiona tu condominio de manera eficiente, segura y transparente.
            </p>

            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-700 opacity-20 blur-2xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-52 h-52 bg-blue-800 opacity-30 blur-2xl rounded-full"></div>
          </div>

          {/* Sección Derecha */}
          <div className="md:w-1/2 p-10 flex items-center justify-center rounded-r-3xl">
            <div className="w-full max-w-md">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Iniciar Sesión
              </h3>
              <p className="text-gray-600 mb-4">
                Accede para gestionar tu condominio
              </p>

              {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg">
                    {error}
                  </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Input: Correo Electrónico */}
                <div>
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
                      placeholder="ejemplo@correo.com"
                      className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  />
                </div>

                {/* Input: Contraseña */}
                <div>
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
                        placeholder="••••••••"
                        className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Mostrar u ocultar contraseña"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Opciones: Recuérdame y Olvidé mi Contraseña */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2">Recuérdame</span>
                  </label>
                  <Link
                      to="/olvidaste-contrasena"
                      className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Botón: Iniciar Sesión */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 text-lg font-semibold text-white rounded-xl shadow-xl ${
                        loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    } transition duration-300`}
                >
                  {loading ? (
                      <span className="flex items-center justify-center">
                    <svg
                        className="w-6 h-6 mr-2 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      ></circle>
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
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
      </div>
  );
};

export default LoginPage;
