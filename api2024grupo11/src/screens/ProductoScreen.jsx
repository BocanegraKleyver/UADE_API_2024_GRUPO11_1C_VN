import React, { useState, useEffect } from 'react';
import { useProductoContext } from '../context/ProductoContext';
import { CategoriaService } from '../Services/categoriaService';
import { DescuentoService } from '../Services/descuentoService';

export const ProductoScreen = () => {
  const { productos, crearProducto, actualizarProducto, eliminarProducto } = useProductoContext();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    titulo: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    imagen_1_URL: '',
    imagen_2_URL: '',
    idCategoria: null,
    idDescuento: null
  });
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setCategorias([]);
    setDescuentos([]);
    fetchCategorias();
    fetchDescuentos();
  }, [])

  useEffect(() => {
    filtrarProductos();
  }, [query, productos]);

  useEffect(() => {
    setProductosFiltrados([...productos]);
  }, [productos]);

  const fetchCategorias = async () => {
    try {
      const data = await CategoriaService.getAllCategorias();
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
        return;
      }
      console.log('Datos del nuevo producto:', nuevoProducto);
      const nuevo = await crearProducto(nuevoProducto);
      resetNuevoProducto();
      setError('');
    } catch (error) {
      console.error('Error creando producto:', error);
      setError('Hubo un problema al crear el producto. Por favor inténtelo nuevamente.');
    }
  };

  
  
  const handleActualizarProducto = async () => {
    try {
      if (!validateProductoSeleccionado()) {
        return;
      }

      await actualizarProducto(productoSeleccionado.id, productoSeleccionado);
      setProductoSeleccionado(null);
      setError('');
    } catch (error) {
      console.error(`Error actualizando producto con ID ${productoSeleccionado.id}:`, error);
      setError('Hubo un problema al actualizar el producto. Por favor inténtelo nuevamente.');
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await eliminarProducto(id);
    } catch (error) {
      console.error(`Error eliminando producto con ID ${id}:`, error);
    }
  };

  const handleImagen1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto({
          ...nuevoProducto,
          imagen_1: file,
          imagen_1_URL: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagen2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto({
          ...nuevoProducto,
          imagen_2: file,
          imagen_2_URL: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const validateNuevoProducto = () => {
    if (nuevoProducto.titulo.trim() === '') {
      setError('Por favor ingrese un título.');
      return false;
    }
    if (nuevoProducto.descripcion.trim() === '') {
      setError('Por favor ingrese una descripción.');
      return false;
    }
    if (isNaN(parseFloat(nuevoProducto.precio))) {
      setError('Por favor ingrese un precio válido.');
      return false;
    }
    if (isNaN(parseInt(nuevoProducto.cantidad))) {
      setError('Por favor ingrese una cantidad válida.');
      return false;
    }
    if (nuevoProducto.idCategoria === null) {
      setError('Por favor seleccione una categoría.');
      return false;
    }
    if (nuevoProducto.idDescuento === null) {
      setError('Por favor seleccione un descuento.');
      return false;
    }
    return true;
  };
  
  const validateProductoSeleccionado = () => {
    if (!productoSeleccionado) return false;

    if (productoSeleccionado.titulo.trim() === '') {
      setError('Por favor ingrese un título.');
      return false;
    }
    if (productoSeleccionado.descripcion.trim() === '') {
      setError('Por favor ingrese una descripción.');
      return false;
    }
    if (isNaN(parseFloat(productoSeleccionado.precio))) {
      setError('Por favor ingrese un precio válido.');
      return false;
    }
    if (isNaN(parseInt(productoSeleccionado.cantidad))) {
      setError('Por favor ingrese una cantidad válida.');
      return false;
    }
    if (productoSeleccionado.idCategoria === null) {
      setError('Por favor seleccione una categoría.');
      return false;
    }
    if (productoSeleccionado.idDescuento === null) {
      setError('Por favor seleccione un descuento.');
      return false;
    }
    return true;
  };
  


  const resetNuevoProducto = () => {
    setNuevoProducto({
      titulo: '',
      descripcion: '',
      precio: 0,
      cantidad: 0,
      imagen_1_URL: '', 
      imagen_2_URL: '', 
      idCategoria: null,
      idDescuento: null
    });
  };

  const filtrarProductos = () => {
    if (query.trim() === '') {
      setProductosFiltrados([...productos]);
    } else {
      const filtered = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setProductosFiltrados(filtered);
    }
  };



return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Productos</h2>
    {error && <div className="text-red-500 mb-4">{error}</div>}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar producto por título"
        className="p-2 border border-gray-300 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
    <ul className="space-y-4 mb-8">
      {productosFiltrados.map((producto) => (
        <li key={producto.id} className="p-4 bg-white shadow-md rounded-md">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 flex flex-col">
              <p className="text-lg font-semibold mb-2">{producto.titulo}</p>
              <p className="mb-2">{producto.descripcion}</p>
              
            </div>
            <div className="col-span-1 flex flex-col">
              <p>Cantidad: {producto.cantidad}</p>
              <p>Precio: {producto.precio}</p>
              {/* <p>Descuento: {descuentos.find(d => d.id === producto.idDescuento)?.porcentaje ?? 'No especificado'}%</p>
              <p>Categoría: {categorias.find(c => c.id === producto.idCategoria)?.descripcion ?? 'No especificada'}</p> */}

            </div>
            <div className="col-span-1 flex justify-center items-center">
                <img
                  src={producto.imagen_1_URL}
                  className="w-24 h-24 object-cover cursor-pointer"
                  style={{ maxWidth: '75px' }}
                  alt="Imagen del producto"
                  onClick={() => window.open(producto.imagen_1_URL, '_blank')}
                />
            </div>

            <div className="col-span-1 flex justify-center items-center">
                <img
                  src={producto.imagen_2_URL}
                  className="w-24 h-24 object-cover cursor-pointer"
                  style={{ maxWidth: '75px' }}
                  alt="Imagen del producto"
                  onClick={() => window.open(producto.imagen_2_URL, '_blank')}
                />
            </div>
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
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          className="p-2 border border-gray-300 rounded-md flex-1"
          value={nuevoProducto.descripcion}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
            required
          />
        </div>
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            placeholder="Precio"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Cantidad"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.cantidad}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="flex space-x-2 mb-4">
          <select
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.idCategoria || ''}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, idCategoria: parseInt(e.target.value) })}
            required
          >
            <option value="">Seleccionar categoría...</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.descripcion}
              </option>
            ))}
          </select>
          <select
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoProducto.idDescuento || ''}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, idDescuento: parseInt(e.target.value) })}
            required
          >
            <option value="">Seleccionar descuento...</option>
            {descuentos.map((descuento) => (
              <option key={descuento.id} value={descuento.id}>
                {descuento.porcentaje}%
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex space-x-4">
  <div className="flex-1">
    <label className="block mb-2">URL de la Imagen 1:</label>
    <input
      type="text"
      placeholder="Ingrese la URL de la imagen 1"
      className="p-2 border border-gray-300 rounded-md w-full"
      value={nuevoProducto.imagen_1_URL}
      onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen_1_URL: e.target.value })}
      required
    />
  </div>
  <div className="flex-1">
    <label className="block mb-2">URL de la Imagen 2:</label>
    <input
      type="text"
      placeholder="Ingrese la URL de la imagen 2"
      className="p-2 border border-gray-300 rounded-md w-full"
      value={nuevoProducto.imagen_2_URL}
      onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen_2_URL: e.target.value })}
      required
    />
  </div>
</div>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={handleCrearProducto}
        >
          Crear Producto
        </button>
      </div>

      {productoSeleccionado && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Editar Producto</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Título"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.titulo}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, titulo: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.descripcion}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, descripcion: e.target.value })}
              required
            />
          </div>
          <div className="flex space-x-2 mb-4">
            <input
              type="number"
              placeholder="Precio"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.precio}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, precio: parseFloat(e.target.value) })}
              required
            />
            <input
              type="number"
              placeholder="Cantidad"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.cantidad}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, cantidad: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="flex space-x-2 mb-4">
            <select
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.idCategoria || ''}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, idCategoria: parseInt(e.target.value) })}
              required
            >
              <option value="">Seleccionar categoría...</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descripcion}
                </option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={productoSeleccionado.idDescuento || ''}
              onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, idDescuento: parseInt(e.target.value) })}
              required
            >
              <option value="">Seleccionar descuento...</option>
              {descuentos.map((descuento) => (
                <option key={descuento.id} value={descuento.id}>
                  {descuento.porcentaje}%
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="URL de la Imagen 1"
                className="p-2 border border-gray-300 rounded-md flex-1"
                value={productoSeleccionado.imagen_1_URL}
                onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, imagen_1_URL: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="URL de la Imagen 2"
                className="p-2 border border-gray-300 rounded-md flex-1"
                value={productoSeleccionado.imagen_2_URL}
                onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, imagen_2_URL: e.target.value })}
                required
              />
            </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleActualizarProducto}
          >
            Actualizar Producto
          </button>
        </div>
      )}
    </div>
  );
};
