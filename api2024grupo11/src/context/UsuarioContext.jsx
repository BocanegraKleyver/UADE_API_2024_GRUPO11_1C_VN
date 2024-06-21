import React, { createContext, useContext, useReducer, useEffect } from 'react';
import UsuarioService from '../Services/usuarioService';


const FETCH_USUARIOS_SUCCESS = 'FETCH_USUARIOS_SUCCESS';
const FETCH_USUARIO_SUCCESS = 'FETCH_USUARIO_SUCCESS';
const CREATE_USUARIO_SUCCESS = 'CREATE_USUARIO_SUCCESS';
const UPDATE_USUARIO_SUCCESS = 'UPDATE_USUARIO_SUCCESS';
const DELETE_USUARIO_SUCCESS = 'DELETE_USUARIO_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const usuarioReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USUARIOS_SUCCESS:
      return {
        ...state,
        usuarios: action.payload,
        usuarioSeleccionado: null,
        error: null
      };
    case FETCH_USUARIO_SUCCESS:
      return {
        ...state,
        usuarioSeleccionado: action.payload,
        error: null
      };
    case CREATE_USUARIO_SUCCESS:
      return {
        ...state,
        usuarios: [...state.usuarios, action.payload],
        error: null
      };
    case UPDATE_USUARIO_SUCCESS:
      return {
        ...state,
        usuarios: state.usuarios.map(usuario =>
          usuario.id === action.payload.id ? action.payload : usuario
        ),
        usuarioSeleccionado: action.payload,
        error: null
      };
    case DELETE_USUARIO_SUCCESS:
      return {
        ...state,
        usuarios: state.usuarios.filter(usuario => usuario.id !== action.payload),
        usuarioSeleccionado: null,
        error: null
      };
      case LOGIN_SUCCESS:
        return {
          ...state,
          usuarioAutenticado: action.payload,
          error: null
        };
    default:
      return state;
  }
};


const initialState = {
  usuarios: [],
  usuarioSeleccionado: null,
  usuarioAutenticado: null,
  error: null
};


const UsuarioContext = createContext();


export const UsuarioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usuarioReducer, initialState);

  
  const fetchUsuarios = async () => {
    try {
      const usuarios = await UsuarioService.getAllUsuarios();
      dispatch({ type: FETCH_USUARIOS_SUCCESS, payload: usuarios });
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const fetchUsuarioById = async (id) => {
    try {
      const usuario = await UsuarioService.getUsuarioById(id);
      dispatch({ type: FETCH_USUARIO_SUCCESS, payload: usuario });
    } catch (error) {
      console.error(`Error fetching usuario with ID ${id}:`, error);
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const createUsuario = async (usuario) => {
    try {
      const nuevoUsuario = await UsuarioService.createUsuario(usuario);
      dispatch({ type: CREATE_USUARIO_SUCCESS, payload: nuevoUsuario });
    } catch (error) {
      console.error('Error creating usuario:', error);
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      const usuarioActualizado = await UsuarioService.updateUsuario(id, usuario);
      dispatch({ type: UPDATE_USUARIO_SUCCESS, payload: usuarioActualizado });
    } catch (error) {
      console.error(`Error updating usuario with ID ${id}:`, error);
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const deleteUsuario = async (id) => {
    try {
      await UsuarioService.deleteUsuario(id);
      dispatch({ type: DELETE_USUARIO_SUCCESS, payload: id });
    } catch (error) {
      console.error(`Error deleting usuario with ID ${id}:`, error);
      dispatch({ type: 'ERROR', payload: error });
    }
  };


  const iniciarSesion = async (usuario, password) => {
    try {
      
      const usuarioAutenticado = await UsuarioService.iniciarSesion(usuario, password);
      dispatch({ type: LOGIN_SUCCESS, payload: usuarioAutenticado });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        usuarios: state.usuarios,
        usuarioSeleccionado: state.usuarioSeleccionado,
        usuarioAutenticado: state.usuarioAutenticado,
        error: state.error,
        fetchUsuarios,
        fetchUsuarioById,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        iniciarSesion,
        setUsuarioSeleccionado: (usuario) => {
          dispatch({ type: FETCH_USUARIO_SUCCESS, payload: usuario });
        } 
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};


export const useUsuarioContext = () => {
  return useContext(UsuarioContext);
};
