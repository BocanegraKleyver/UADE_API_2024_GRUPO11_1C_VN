import axios from 'axios';

const API_URL = 'http://localhost:8080/api/producto';

const ProductoService = {
  getAllProductos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  },

  getProductoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching producto with ID ${id}:`, error);
      throw error;
    }
  },

  createProducto: async (producto) => {
    try {
      
      const formData = new FormData();

      
      formData.append('titulo', producto.titulo);
      formData.append('descripcion', producto.descripcion);
      formData.append('precio', producto.precio);
      formData.append('cantidad', producto.cantidad);
      formData.append('idCategoria', producto.idCategoria);
      formData.append('idDescuento', producto.idDescuento);

      
      if (producto.imagen_1) {
        formData.append('imagen_1', producto.imagen_1);
      }

      
      if (producto.imagen_2) {
        formData.append('imagen_2', producto.imagen_2);
      }

      
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  },

  updateProducto: async (id, producto) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, producto);
      return response.data;
    } catch (error) {
      console.error(`Error updating producto with ID ${id}:`, error);
      throw error;
    }
  },

  deleteProducto: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting producto with ID ${id}:`, error);
      throw error;
    }
  },

  getProductosByCategoriaId: async (idCategoria) => {
    try {
      const response = await axios.get(`${API_URL}/categoria/${idCategoria}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching productos by categoria ID ${idCategoria}:`, error);
      throw error;
    }
  },

  getProductosByDescuentoId: async (idDescuento) => {
    try {
      const response = await axios.get(`${API_URL}/descuento/${idDescuento}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching productos by descuento ID ${idDescuento}:`, error);
      throw error;
    }
  },

  verificarStock: async (idProducto, cantidad) => {
    try {
      const response = await axios.get(`${API_URL}/stock?idProducto=${idProducto}&cantidad=${cantidad}`);
      return response.data;
    } catch (error) {
      console.error(`Error verificando stock para producto ID ${idProducto} y cantidad ${cantidad}:`, error);
      throw error;
    }
  }
};

export default ProductoService;
