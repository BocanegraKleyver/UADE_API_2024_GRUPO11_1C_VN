import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUsuarioContext } from '../context/UsuarioContext'; 
import RolService from '../Services/rolService';

const UsuarioScreen = () => {
  const { usuarios, usuarioSeleccionado, fetchUsuarios, createUsuario, updateUsuario, deleteUsuario,setUsuarioSeleccionado  } = useUsuarioContext();
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    usuario: '',
    password:'',
    idRol: null
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await RolService.getAllRoles();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCrearUsuario = async () => {
    try {
      await createUsuario(nuevoUsuario);
      limpiarFormulario();
    } catch (error) {
      console.error('Error creando usuario:', error);
    }
  };

  const handleActualizarUsuario = async () => {
    try {
      if (!usuarioSeleccionado) {
        console.error('No hay usuario seleccionado para actualizar.');
        return;
      }
  
      
      await updateUsuario(usuarioSeleccionado.id, nuevoUsuario);
      limpiarFormulario();
      setModoEdicion(false);
    } catch (error) {
      console.error(`Error actualizando usuario con ID ${usuarioSeleccionado.id}:`, error);
    }
  };

  const handleEliminarUsuario = async (id) => {
    try {
      await deleteUsuario(id);
    } catch (error) {
      console.error(`Error eliminando usuario con ID ${id}:`, error);
    }
  };

  const seleccionarUsuarioParaEditar = (usuario) => {
    setNuevoUsuario({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail,
      usuario: usuario.usuario,
      password: usuario.password,
      idRol: usuario.idRol
    });
    setModoEdicion(true);
    setUsuarioSeleccionado(usuario);
  };

  const limpiarFormulario = () => {
    setNuevoUsuario({
      nombre: '',
      apellido: '',
      mail: '',
      usuario: '',
      password: '',
      idRol: null
    });
    setModoEdicion(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      <ul className="space-y-4 mb-8">
        {usuarios.map(usuario => (
          <li key={usuario.id} className="flex flex-col p-4 bg-white shadow-md rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{usuario.nombre} {usuario.apellido}</p>
                <p>Email: {usuario.mail}</p>
                <p>Usuario: {usuario.usuario}</p>
                <p>Rol: {roles.find(r => r.id === usuario.idRol)?.descripcion}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => seleccionarUsuarioParaEditar(usuario)}
                >
                  Editar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleEliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{modoEdicion ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoUsuario.nombre}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellido"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoUsuario.apellido}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoUsuario.mail}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, mail: e.target.value })}
          />
          <input
            type="text"
            placeholder="Usuario"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoUsuario.usuario}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, usuario: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoUsuario.password}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
          />
          <select
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoUsuario.idRol || ''}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, idRol: parseInt(e.target.value) })}
          >
            <option value="">Seleccionar Rol</option>
            {roles.map(rol => (
              <option key={rol.id} value={rol.id}>{rol.descripcion}</option>
            ))}
          </select>
          <button
            className={`px-4 py-2 ${modoEdicion ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded-md`}
            onClick={modoEdicion ? handleActualizarUsuario : handleCrearUsuario}
          >
            {modoEdicion ? 'Actualizar' : 'Crear'}
          </button>
          {modoEdicion && (
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => {
                limpiarFormulario();
                setModoEdicion(false);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="block bg-gray-500 text-white py-2 px-4 rounded-md text-center mt-4"
        >
          ATRAS
        </button>
        <Link
          to="/"
          className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4"
        >
          Volver a la pantalla principal
        </Link>
      </div>
    </div>
  );
};

export default UsuarioScreen;
