import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsuarioContext } from '../context/UsuarioContext';

const LoginScreen = () => {
  const { iniciarSesion, usuarioAutenticado } = useUsuarioContext();
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    password: ''
  });
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [inicioSesionExitoso, setInicioSesionExitoso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({
      ...credenciales,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await iniciarSesion(credenciales.usuario, credenciales.password);
      setInicioSesionExitoso(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.');
    }
  };

  const handleRecuperarPassword = async () => {
    setEmailEnviado(true);
    setTimeout(() => {
      setEmailEnviado(false);
    }, 5000);
  };

  // Si el inicio de sesión fue exitoso o el usuario ya está autenticado, redireccionar a /home
  if (inicioSesionExitoso || usuarioAutenticado) {
    return <Link to="/home" />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Inicio de Sesión</h2>

      {emailEnviado && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña. (Este es un mensaje simulado).
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="usuario" className="block text-lg font-semibold">
            Usuario:
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={credenciales.usuario}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-semibold">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credenciales.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Iniciar Sesión
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handleRecuperarPassword}
        >
          Olvidé mi contraseña
        </button>
      </form>

      <div className="mt-4">
        <p>
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-500 underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
