import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../Services/ProductoService';
import CategoriaService from '../Services/categoriaService';
import DescuentoService from '../Services/descuentoService';

const ProductoScreen = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    titulo: '',
    descripcion: '',
    imagen_1_url: '',
    imagen_2_url: '',
    precio: 0.0,
    cantidad: 0,
    idCategoria: null,
    idDescuento: null
  });
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [descuentos, setDescuentos] = useState([]);

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchDescuentos();
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await ProductoService.getAllProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await CategoriaService.getAllCategorias();
      console.log('Categorías recibidas:', data);
      setCategorias(data);
    } catch (error) {
      console.error('Error fetching categorías:', error);
    }
  };

  const fetchDescuentos = async () => {
    try {
      const data = await DescuentoService.getAllDescuentos();
      setDescuentos(data);
    } catch (error) {
      console.error('Error fetching descuentos:', error);
    }
  };

  const handleCrearProducto = async () => {
    try {
      const nuevo = await ProductoService.createProducto(nuevoProducto);
      await fetchProductos();
      setNuevoProducto({
        titulo: '',
        descripcion: '',
        imagen_1_url: '',
        imagen_2_url: '',
        precio: 0.0,
        cantidad: 0,
        idCategoria: null,
        idDescuento: null
      });
      setProductos([...productos, nuevo]);
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  const handleActualizarProducto = async () => {
    try {
      await ProductoService.updateProducto(productoSeleccionado.id, productoSeleccionado);
      await fetchProductos();
      setProductoSeleccionado(null);
    } catch (error) {
      console.error(`Error actualizando producto con ID ${productoSeleccionado.id}:`, error);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await ProductoService.deleteProducto(id);
      await fetchProductos();
    } catch (error) {
      console.error(`Error eliminando producto con ID ${id}:`, error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <ul className="space-y-4 mb-8">
        {productos.map((producto) => (
          <li key={producto.id} className="flex flex-col p-4 bg-white shadow-md rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{producto.titulo}</p>
                <p>{producto.descripcion}</p>
                <p>Precio: {producto.precio}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Categoría: {categorias.find(c => c.id === producto.idCategoria)?.descripcion}</p>
                <p>Descuento: {descuentos.find(d => d.id === producto.idDescuento)?.porcentaje}%</p>
                <p>Imagen 1 URL: {producto.imagen_1_url}</p>
                <p>Imagen 2 URL: {producto.imagen_2_url}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => setProductoSeleccionado(producto)}
                >
                  Editar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleEliminarProducto(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Crear Nuevo Producto</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Título"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.titulo}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, titulo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.descripcion}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
          />
          <input
            type="text"
            placeholder="Imagen 1 URL"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.imagen_1_url}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen_1_url: e.target.value })}
          />
          <input
            type="text"
            placeholder="Imagen 2 URL"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.imagen_2_url}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen_2_url: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Cantidad"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.cantidad}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) })}
          />
          <select
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.idCategoria || ''}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, idCategoria: parseInt(e.target.value) })}
          >
            <option value="">Seleccionar Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.descripcion}</option>
            ))}
          </select>
          <select
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.idDescuento || ''}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, idDescuento: parseInt(e.target.value) })}
          >
            <option value="">Seleccionar Descuento</option>
            {descuentos.map((descuento) => (
              <option key={descuento.id} value={descuento.id}>{descuento.porcentaje}%</option>
            ))}
          </select>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleCrearProducto}
          >
            Crear
          </button>
        </div>
      </div>

      {productoSeleccionado && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Editar Producto</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Título"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.titulo}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, titulo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Imagen 1 URL"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.imagen_1_url}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, imagen_1_url: e.target.value })}
            />
            <input
              type="text"
              placeholder="Imagen 2 URL"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.imagen_2_url}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, imagen_2_url: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.precio}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, precio: parseFloat(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Cantidad"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.cantidad}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, cantidad: parseInt(e.target.value) })}
            />
            <select
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.idCategoria || ''}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, idCategoria: parseInt(e.target.value) })}
            >
              <option value="">Seleccionar Categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.descripcion}</option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.idDescuento || ''}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, idDescuento: parseInt(e.target.value) })}
            >
              <option value="">Seleccionar Descuento</option>
              {descuentos.map((descuento) => (
                <option key={descuento.id} value={descuento.id}>{descuento.porcentaje}%</option>
              ))}
            </select>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
              onClick={handleActualizarProducto}
            >
              Actualizar
            </button>
          </div>
        </div>
      )}

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

export default ProductoScreen;
