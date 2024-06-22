import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../Services/productoService';

const CatalogoProductosScreen = () => {
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

  const handleAgregarAlCarrito = (producto) => {
    console.log(`Producto ${producto.titulo} agregado al carrito`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Catálogo de Productos</h2>
      <div className="grid grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white p-4 rounded-md shadow-md">
            <img src={producto.imagen_1_url} alt={producto.titulo} className="w-full h-auto mb-2" />
            <p className="text-lg font-semibold">{producto.titulo}</p>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
              onClick={() => handleAgregarAlCarrito(producto)}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogoProductosScreen;
