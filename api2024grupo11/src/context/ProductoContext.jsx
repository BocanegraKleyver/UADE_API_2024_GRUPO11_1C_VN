import React, { createContext, useContext, useState, useEffect } from 'react';
import ProductoService from '../Services/productoService';

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
      const formData = new FormData();
      formData.append('titulo', nuevoProducto.titulo);
      formData.append('descripcion', nuevoProducto.descripcion);
      formData.append('precio', nuevoProducto.precio);
      formData.append('cantidad', nuevoProducto.cantidad);
      formData.append('idCategoria', nuevoProducto.idCategoria);
      formData.append('idDescuento', nuevoProducto.idDescuento);

      if (nuevoProducto.imagen_1) {
        formData.append('imagen_1', nuevoProducto.imagen_1, nuevoProducto.imagen_1.name);
      }

      if (nuevoProducto.imagen_2) {
        formData.append('imagen_2', nuevoProducto.imagen_2, nuevoProducto.imagen_2.name);
      }

      const nuevo = await ProductoService.createProducto(formData);
      setProductos([...productos, nuevo]);
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  };

  
  const actualizarProducto = async (id, productoActualizado) => {
    try {
      const formData = new FormData();
      formData.append('titulo', productoActualizado.titulo);
      formData.append('descripcion', productoActualizado.descripcion);
      formData.append('precio', productoActualizado.precio);
      formData.append('cantidad', productoActualizado.cantidad);
      formData.append('idCategoria', productoActualizado.idCategoria);
      formData.append('idDescuento', productoActualizado.idDescuento);

      if (productoActualizado.imagen_1) {
        formData.append('imagen_1', productoActualizado.imagen_1, productoActualizado.imagen_1.name);
      }

      if (productoActualizado.imagen_2) {
        formData.append('imagen_2', productoActualizado.imagen_2, productoActualizado.imagen_2.name);
      }

      await ProductoService.updateProducto(id, formData);
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
