import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categoria';

const CategoriaService = {
  getAllCategorias: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener las categorías: ${error.message}`);
    }
  },

  getCategoriaById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener la categoría con ID ${id}: ${error.message}`);
    }
  },

  createCategoria: async (categoria) => {
    try {
      const response = await axios.post(API_URL, categoria);
      return response.data;
    } catch (error) {
      throw new Error(`Error al crear la categoría: ${error.message}`);
    }
  },

  updateCategoria: async (id, categoria) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, categoria);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar la categoría con ID ${id}: ${error.message}`);
    }
  },



  
  deleteCategoria: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error(`Error al eliminar la categoría con ID ${id}: ${error.message}`);
    }
  }
};



export default CategoriaService;



