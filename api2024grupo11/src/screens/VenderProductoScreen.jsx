import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProducto } from '../Redux/ProductoSlice';
import { fetchCategorias } from '../Redux/CategoriaSlice';
import { fetchDescuentos } from '../Redux/DescuentoSlice';

export const VenderProductoScreen = () => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categoria.categorias);
  const descuentos = useSelector((state) => state.descuento.descuentos);
  const ultimoProductoCreado = useSelector((state) => state.producto.ultimoProductoCreado);
  const [nuevoProducto, setNuevoProducto] = useState({
    titulo: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    imagen_1_URL: '',
    imagen_2_URL: '',
    idCategoria: null,
    idDescuento: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchCategorias());
    dispatch(fetchDescuentos());
  }, [dispatch]);

  const handleCrearProducto = () => {
    if (validateNuevoProducto()) {
      dispatch(createProducto(nuevoProducto));
      resetNuevoProducto();
    }
  };

  const handleImagen1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto({
          ...nuevoProducto,
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
          imagen_2_URL: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
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
      idDescuento: null,
    });
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Vender Productos</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
      <div className="mb-4">
        <label className="block mb-2">Subir Imagen 1:</label>
        <input
          type="file"
          onChange={handleImagen1Change}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Subir Imagen 2:</label>
        <input
          type="file"
          onChange={handleImagen2Change}
        />
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={handleCrearProducto}
      >
        Crear Producto
      </button>

      {ultimoProductoCreado && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Último Producto Creado:</h3>
          <p><strong>Título:</strong> {ultimoProductoCreado.titulo}</p>
          <p><strong>Descripción:</strong> {ultimoProductoCreado.descripcion}</p>
          <p><strong>Precio:</strong> ${ultimoProductoCreado.precio}</p>
          <p><strong>Cantidad:</strong> {ultimoProductoCreado.cantidad}</p>
          <p><strong>Categoría:</strong> {categorias.find(cat => cat.id === ultimoProductoCreado.idCategoria)?.descripcion}</p>
          <p><strong>Descuento:</strong> {descuentos.find(desc => desc.id === ultimoProductoCreado.idDescuento)?.porcentaje}%</p>
          <div className="flex space-x-4 mt-2">
            <img src={ultimoProductoCreado.imagen_1_URL} alt="Imagen 1" className="w-32 h-32 object-cover" />
            <img src={ultimoProductoCreado.imagen_2_URL} alt="Imagen 2" className="w-32 h-32 object-cover" />
          </div>
        </div>
      )}
    </div>
  );
};
