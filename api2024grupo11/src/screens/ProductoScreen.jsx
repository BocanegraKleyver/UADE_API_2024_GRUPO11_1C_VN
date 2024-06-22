import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../Services/productoService';
import CategoriaService from '../Services/categoriaService';
import DescuentoService from '../Services/descuentoService';

const ProductoScreen = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    titulo: '',
    descripcion: '',
    imagen_1: null,
    imagen_2: null,
    precio: '',
    cantidad: '',
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
      if (!validateNuevoProducto()) {
        console.error('Por favor complete todos los campos requeridos correctamente');
        
        return;
      }
  
      const formData = new FormData();
      formData.append('titulo', nuevoProducto.titulo);
      formData.append('descripcion', nuevoProducto.descripcion);
      formData.append('precio', parseFloat(nuevoProducto.precio));
      formData.append('cantidad', parseInt(nuevoProducto.cantidad));
      formData.append('idCategoria', parseInt(nuevoProducto.idCategoria));
      formData.append('idDescuento', parseInt(nuevoProducto.idDescuento));
      formData.append('imagen_1', nuevoProducto.imagen_1);
      formData.append('imagen_2', nuevoProducto.imagen_2);
  
      const nuevo = await ProductoService.createProducto(formData);
      await fetchProductos();
      resetNuevoProducto();
      setProductos([...productos, nuevo]);
    } catch (error) {
      console.error('Error creando producto:', error);
      
    }
  };
  
  

  const handleActualizarProducto = async () => {
    try {
      if (!validateProductoSeleccionado()) {
        console.error('Por favor complete todos los campos requeridos correctamente');
        return;
      }

      const formData = new FormData();
      formData.append('titulo', productoSeleccionado.titulo);
      formData.append('descripcion', productoSeleccionado.descripcion);
      formData.append('precio', parseFloat(productoSeleccionado.precio));
      formData.append('cantidad', parseInt(productoSeleccionado.cantidad));
      formData.append('idCategoria', parseInt(productoSeleccionado.idCategoria));
      formData.append('idDescuento', parseInt(productoSeleccionado.idDescuento));
      formData.append('imagen_1', productoSeleccionado.imagen_1);
      formData.append('imagen_2', productoSeleccionado.imagen_2);

      await ProductoService.updateProducto(productoSeleccionado.id, formData);
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

  const handleImagen1Change = (e) => {
    setNuevoProducto({ ...nuevoProducto, imagen_1: e.target.files[0] });
  };

  const handleImagen2Change = (e) => {
    setNuevoProducto({ ...nuevoProducto, imagen_2: e.target.files[0] });
  };


  const validateNuevoProducto = () => {
    return (
      nuevoProducto.titulo.trim() !== '' &&
      nuevoProducto.descripcion.trim() !== '' &&
      !isNaN(parseFloat(nuevoProducto.precio)) &&
      !isNaN(parseInt(nuevoProducto.cantidad)) &&
      nuevoProducto.idCategoria !== null &&
      nuevoProducto.idDescuento !== null
    );
  };

  const validateProductoSeleccionado = () => {
    return (
      productoSeleccionado &&
      productoSeleccionado.titulo.trim() !== '' &&
      productoSeleccionado.descripcion.trim() !== '' &&
      !isNaN(parseFloat(productoSeleccionado.precio)) &&
      !isNaN(parseInt(productoSeleccionado.cantidad)) &&
      productoSeleccionado.idCategoria !== null &&
      productoSeleccionado.idDescuento !== null
    );
  };

  const resetNuevoProducto = () => {
    setNuevoProducto({
      titulo: '',
      descripcion: '',
      imagen_1: null,
      imagen_2: null,
      precio: '',
      cantidad: '',
      idCategoria: null,
      idDescuento: null
    });
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <ul className="space-y-4 mb-8">
        {productos.map((producto) => (
          <li key={producto.id} className="p-4 bg-white shadow-md rounded-md">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 flex flex-col">
                <p className="text-lg font-semibold mb-2">{producto.titulo}</p>
                <p className="mb-2">{producto.descripcion}</p>
              </div>
              <div className="col-span-1 flex flex-col">
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: {producto.precio}</p>
                <p>Descuento: {descuentos.find(d => d.id === producto.idDescuento)?.porcentaje}%</p>
                <p>Categoría: {categorias.find(c => c.id === producto.idCategoria)?.descripcion}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <img
                  src={`data:image/jpeg;base64,${producto.imagen_1}`}
                  className="w-24 h-24 object-cover cursor-pointer"
                  style={{ maxWidth: '75px' }}
                  alt="Imagen 1"
                  onClick={() => window.open(`data:image/jpeg;base64,${producto.imagen_1}`, '_blank')}
                />
              </div>
              {producto.imagen_2 && (
                <div className="col-span-1 flex justify-center items-center">
                  <img
                    src={`data:image/jpeg;base64,${producto.imagen_2}`}
                    className="w-24 h-24 object-cover cursor-pointer"
                    style={{ maxWidth: '75px' }}
                    alt="Imagen 2"
                    onClick={() => window.open(`data:image/jpeg;base64,${producto.imagen_2}`, '_blank')}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
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
            type="file"
            className="p-2 border border-gray-300 rounded-md flex-1"
            onChange={handleImagen1Change}
          />

          <input
            type="file"
            className="p-2 border border-gray-300 rounded-md flex-1"
            onChange={handleImagen2Change}
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
              type="file"
              className="p-2 border border-gray-300 rounded-md flex-1"
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, imagen_1: e.target.files[0] })}
            />

            <input
              type="file"
              className="p-2 border border-gray-300 rounded-md flex-1"
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, imagen_2: e.target.files[0] })}
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
          to="/home"
          className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4"
        >
          Volver a la pantalla principal
        </Link>
      </div>
    </div>
  );
};

export default ProductoScreen;

