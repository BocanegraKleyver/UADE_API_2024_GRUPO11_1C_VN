import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuario';

const UsuarioService = {
  getAllUsuarios: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      throw error;
    }
  },

  getUsuarioById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching usuario with ID ${id}:`, error);
      throw error;
    }
  },

  createUsuario: async (usuario) => {
    try {
      const response = await axios.post(API_URL, usuario);
      return response.data;
    } catch (error) {
      console.error('Error creating usuario:', error);
      throw error;
    }
  },

  updateUsuario: async (id, usuario) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, usuario);
      return response.data;
    } catch (error) {
      console.error(`Error updating usuario with ID ${id}:`, error);
      throw error;
    }
  },

  deleteUsuario: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting usuario with ID ${id}:`, error);
      throw error;
    }
  },

  getUsuariosByRol: async (idRol) => {
    try {
      const response = await axios.get(`${API_URL}/rol/${idRol}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching usuarios by rol ID ${idRol}:`, error);
      throw error;
    }
  }
};

export default UsuarioService;
