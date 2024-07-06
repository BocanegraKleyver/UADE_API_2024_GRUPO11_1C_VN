import React from 'react';
import { Link } from 'react-router-dom';

export const AdministrarScreen = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Administrar</h2>
      <ul className="space-y-4 mb-8">
        <li>
          <Link to="/administrar/categoria" className="block bg-white shadow-md rounded-md p-4">
            Administrar Categorías
          </Link>
        </li>
        <li>
          <Link to="/administrar/descuento" className="block bg-white shadow-md rounded-md p-4">
            Administrar Descuentos
          </Link>
        </li>
        <li>
          <Link to="/administrar/producto" className="block bg-white shadow-md rounded-md p-4">
            Administrar Productos
          </Link>
        </li>
      </ul>
      <Link
        to="/home"
        className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4"
      >
        Volver a la pantalla principal
      </Link>
    </div>
  );
};


