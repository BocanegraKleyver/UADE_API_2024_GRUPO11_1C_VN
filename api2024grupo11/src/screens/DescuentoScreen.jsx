import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createDescuento, deleteDescuento, fetchDescuentos, updateDescuento } from '../Redux/DescuentoSlice';


export const DescuentoScreen = () => {
  const dispatch = useDispatch();
  const descuentos = useSelector((state) => state.descuento.descuentos);
  const [nuevoDescuento, setNuevoDescuento] = useState({ porcentaje: '' });
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);
  const [filtroDescuento, setFiltroDescuento] = useState('');


  useEffect(() => {
    dispatch(fetchDescuentos());
  }, [dispatch]);


  const handleCrearDescuento = () => {
    dispatch(createDescuento(nuevoDescuento));
    setNuevoDescuento({ porcentaje: '' });
  };

  const handleActualizarDescuento = () => {
    dispatch(updateDescuento({ id: descuentoSeleccionado.id, descuento: descuentoSeleccionado }));
    setDescuentoSeleccionado(null);
  };

  const handleEliminarDescuento = (id) => {
    dispatch(deleteDescuento(id));
  };

  const descuentosFiltrados = descuentos.filter(descuento =>
    descuento.porcentaje.toString().includes(filtroDescuento)
  );


  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Descuentos</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar porcentaje de descuento"
          className="p-2 border border-gray-300 rounded-md"
          value={filtroDescuento}
          onChange={(e) => setFiltroDescuento(e.target.value)}
        />
      </div>

      <ul className="space-y-4 mb-8">
        {descuentosFiltrados.map((descuento) => (
          <li key={descuento.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
            <span>{descuento.porcentaje}%</span>
            <div className="space-x-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setDescuentoSeleccionado(descuento)}>
                Editar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleEliminarDescuento(descuento.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Crear Nuevo Descuento</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            placeholder="Porcentaje"
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={nuevoDescuento.porcentaje || ''}
            onChange={(e) => setNuevoDescuento({ porcentaje: e.target.value })}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleCrearDescuento}>
            Crear
          </button>
        </div>
      </div>

      {descuentoSeleccionado && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Editar Descuento</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="number"
              placeholder="Porcentaje"
              className="p-2 border border-gray-300 rounded-md flex-1"
              value={descuentoSeleccionado.porcentaje || ''}
              onChange={(e) => setDescuentoSeleccionado({ ...descuentoSeleccionado, porcentaje: e.target.value })}
            />
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
              onClick={handleActualizarDescuento}>
              Actualizar
            </button>
          </div>
        </div>
      )}

      <div className="paralelo">
        <button
          onClick={() => window.history.back()}
          className="producto-agregar"
        >
          ATRAS
        </button>
      

        <Link to="/" className="producto-agregar">
          Volver a la pantalla principal
        </Link>
      </div>
    </div>
  );
};

