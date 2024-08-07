import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchCategorias } from '../Redux/CategoriaSlice';
import { fetchDescuentos } from '../Redux/DescuentoSlice';
import { createProducto } from '../Redux/ProductoSlice';

export const VenderProductoScreen = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);
  const role = usuario ? usuario.role : "";
  const categorias = useSelector((state) => state.categoria.categorias);
  const descuentos = useSelector((state) => state.descuento.descuentos);
  const [nuevoProducto, setNuevoProducto] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    cantidad: '',
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

  // const handleCrearProducto = () => {
  //   if (validateNuevoProducto()) {
  //     dispatch(createProducto(nuevoProducto));
  //     resetNuevoProducto();
  //   }
  // };
  const handleCrearProducto = () => {
    if (validateNuevoProducto()) {
      const productoAEnviar = {
        ...nuevoProducto,
        titulo: nuevoProducto.titulo,
        descripcion: nuevoProducto.descripcion,
        imagen_1_URL: nuevoProducto.imagen_1_URL,
        imagen_2_URL: nuevoProducto.imagen_2_URL,
        precio: parseFloat(nuevoProducto.precio),
        cantidad: parseInt(nuevoProducto.cantidad),
        idCategoria: parseInt(nuevoProducto.idCategoria),
        idDescuento: parseInt(nuevoProducto.idDescuento),
      };
      dispatch(createProducto({ prod: productoAEnviar }));
      resetNuevoProducto();
    }
  };

  const resetNuevoProducto = () => {
    setNuevoProducto({
      titulo: '',
      descripcion: '',
      precio: '',
      cantidad: '',
      imagen_1_URL: '',
      imagen_2_URL: '',
      idCategoria: null,
      idDescuento: null,
    });
    setError('');
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
    if (nuevoProducto.idCategoria === '') {
      setError('Por favor seleccione una categoría.');
      return false;
    }
    if (nuevoProducto.idDescuento === '') {
      setError('Por favor seleccione un descuento.');
      return false;
    }
    return true;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {role === "Vendedor" ? (<><h2 className="text-2xl font-bold mb-4">Vender Productos</h2>
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
        <div className="paralelo">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleCrearProducto}
          >
            Crear Producto
          </button>

          <button
            onClick={() => window.history.back()}
            className="producto-agregar"
          >
            ATRAS
          </button>


          <Link
            to="/"
            className="producto-agregar"
          >
            Volver a la pantalla principal
          </Link>
        </div></>) : <p>No tienes permisos para ver esta pagina</p>}

    </div>
  );
};
