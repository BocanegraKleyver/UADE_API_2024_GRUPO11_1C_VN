import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/producto';

export const ProductoService = {
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
      const response = await axios.post(API_URL, producto);
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
      const response = await axios.get(`${API_URL}/${idProducto}/verificarStock?cantidad=${cantidad}`);
      return response.data;
    } catch (error) {
      console.error(`Error verificando stock para producto ID ${idProducto} y cantidad ${cantidad}:`, error);
      throw error;
    }
  },

  getCantidadDisponibleEnStock: async (idProducto) => {
    try {
      const response = await axios.get(`${API_URL}/${idProducto}/stock`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cantidad disponible en stock para producto ID ${idProducto}:`, error);
      throw error;
    }
  },


  restarStockAlComprar: async (producto, cantADecrementar) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch("http://localhost:8000/productos/" + producto.id);
      const productoADecrementar = await response.json();

      const nuevaCantidad = productoADecrementar.cantidad - cantADecrementar;
      const raw = JSON.stringify({
        "cantidad": nuevaCantidad
      });

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const patchResponse = await fetch(`http://localhost:8000/productos/${producto.id}`, requestOptions);

      if (!patchResponse.ok) {
        throw new Error('La solicitud PATCH no fue exitosa.');
      }

      const result = await patchResponse.json();
    } catch (error) {
      console.error('Error al disminuir la cantidad:', error);
    }
  }
}

