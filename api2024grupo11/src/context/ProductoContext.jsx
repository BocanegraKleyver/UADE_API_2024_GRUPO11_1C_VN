import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductoService } from '../Services/ProductoService';



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


  const crearProducto = async (nuevoProducto) => {
    try {
      const nuevo = await ProductoService.createProducto(nuevoProducto);
      setProductos([...productos, nuevo]);
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  };


  const actualizarProducto = async (id, productoActualizado) => {
    try {
      await ProductoService.updateProducto(id, productoActualizado);
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