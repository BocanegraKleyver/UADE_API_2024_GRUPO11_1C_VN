import React, { createContext, useContext, useState, useEffect } from 'react';
import ProductoService from '../Services/ProductoService';

const ProductoContext = createContext();


export const useProductoContext = () => useContext(ProductoContext);


export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    fetchProductos();
  }, []);


  const fetchProductos = async () => {
    try {
      const data = await ProductoService.getAllProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  
  const crearProducto = async (producto) => {
    try {
      const nuevoProducto = await ProductoService.createProducto(producto);
      setProductos([...productos, nuevoProducto]);
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  };

  
  const actualizarProducto = async (id, producto) => {
    try {
      await ProductoService.updateProducto(id, producto);
      const productosActualizados = await ProductoService.getAllProductos();
      setProductos(productosActualizados);
    } catch (error) {
      console.error(`Error actualizando producto con ID ${id}:`, error);
      throw error;
    }
  };

  
  const eliminarProducto = async (id) => {
    try {
      await ProductoService.deleteProducto(id);
      const productosActualizados = productos.filter(producto => producto.id !== id);
      setProductos(productosActualizados);
    } catch (error) {
      console.error(`Error eliminando producto con ID ${id}:`, error);
      throw error;
    }
  };

  
  const productoContextValue = {
    productos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
  };

  
  return (
    <ProductoContext.Provider value={productoContextValue}>
      {children}
    </ProductoContext.Provider>
  );
};
