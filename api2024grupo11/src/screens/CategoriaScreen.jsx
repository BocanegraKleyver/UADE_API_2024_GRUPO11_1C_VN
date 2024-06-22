import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import { useCategoriaContext } from '../context/CategoriaContext';

const CategoriaScreen = () => {
  const { categorias, agregarCategoria, actualizarCategoria, eliminarCategoria } = useCategoriaContext();
  const [nuevaCategoria, setNuevaCategoria] = useState({ id: null, descripcion: '' });
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  

  const handleCrearCategoria = () => {
    agregarCategoria(nuevaCategoria);
    setNuevaCategoria({ id: null, descripcion: '' });
  };

  const handleActualizarCategoria = () => {
    actualizarCategoria(categoriaSeleccionada.id, categoriaSeleccionada);
    setCategoriaSeleccionada(null);
  };

  const handleEliminarCategoria = (id) => {
    eliminarCategoria(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>
      <ul className="space-y-4 mb-8">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
            <div>
              <p className="text-lg font-semibold">{categoria.descripcion}</p>
            </div>
            <div className="space-x-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setCategoriaSeleccionada(categoria)}
              >
                Editar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleEliminarCategoria(categoria.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Crear Nueva Categoría</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Descripción"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevaCategoria.descripcion}
            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleCrearCategoria}
          >
            Crear
          </button>
        </div>
      </div>

      {categoriaSeleccionada && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Editar Categoría</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Descripción"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={categoriaSeleccionada.descripcion}
              onChange={(e) => setCategoriaSeleccionada({ ...categoriaSeleccionada, descripcion: e.target.value })}
            />
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
              onClick={handleActualizarCategoria}
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
      </div>

      <Link
        to="/home"
        className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4"
      >
        Volver a la pantalla principal
      </Link>
    </div>
  );
};

export default CategoriaScreen;
