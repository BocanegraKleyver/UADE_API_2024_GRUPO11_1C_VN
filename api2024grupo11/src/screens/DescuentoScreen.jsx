import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDescuentoContext } from '../context/DescuentoContext';


const DescuentoScreen = () => {
  const { descuentos, agregarDescuento, actualizarDescuento, eliminarDescuento } = useDescuentoContext();
  const [nuevoDescuento, setNuevoDescuento] = useState({ porcentaje: '' });
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);
  const [filtroDescuento, setFiltroDescuento] = useState('');

  const handleCrearDescuento = async () => {
    try {
      await agregarDescuento(nuevoDescuento);
      setNuevoDescuento({ porcentaje: '' });
    } catch (error) {
      console.error('Error al crear descuento:', error.message);
    }
  };

  const handleActualizarDescuento = async () => {
    if (!descuentoSeleccionado) return;

    try {
      await actualizarDescuento(descuentoSeleccionado.id, descuentoSeleccionado);
      setDescuentoSeleccionado(null);
    } catch (error) {
      console.error(`Error al actualizar descuento con ID ${descuentoSeleccionado.id}:`, error.message);
    }
  };

  const handleEliminarDescuento = async (id) => {
    try {
      await eliminarDescuento(id);
    } catch (error) {
      console.error(`Error al eliminar descuento con ID ${id}:`, error.message);
    }
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

      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="block bg-gray-500 text-white py-2 px-4 rounded-md text-center mt-4"
        >
          ATRAS
        </button>
      </div>

      <Link to="/home" className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4">
        Volver a la pantalla principal
      </Link>
    </div>
  );
};

export default DescuentoScreen;