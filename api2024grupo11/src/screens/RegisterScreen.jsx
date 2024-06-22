import React, { useState } from 'react';
import { useUsuarioContext } from '../context/UsuarioContext'; 
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  const { createUsuario } = useUsuarioContext();
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    usuario: '',
    password: '',
    idRol: 2 
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsuario(usuario);
      setUsuario({
        nombre: '',
        apellido: '',
        mail: '',
        usuario: '',
        password: '',
        idRol: 2 
      });
      setRegistroExitoso(true);
      
      setTimeout(() => {
        setRegistroExitoso(false);
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al registrar usuario. Por favor, inténtelo nuevamente.');
    }
  };




  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>

      {registroExitoso && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong>¡Registro exitoso!</strong> El usuario ha sido registrado correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-lg font-semibold">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="apellido" className="block text-lg font-semibold">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="mail" className="block text-lg font-semibold">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={usuario.mail}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="usuario" className="block text-lg font-semibold">
            Nombre de usuario:
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuario.usuario}
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
            value={usuario.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Registrar
        </button>
      </form>

      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="block bg-gray-500 text-white py-2 px-4 rounded-md text-center mt-4"
        >
          ATRAS
        </button>
        <Link
          to="/login"
          className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4"
        >
          Volver a la pantalla de inicio de sesión
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;