import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const AdministrarScreen = () => {

  const usuario = useSelector((state) => state.usuario.usuario);
  const role = usuario ? usuario.role : "";


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {role === "Admin" ? (
        <>
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
            className="producto-agregar"
          >
            Volver a la pantalla principal
          </Link>
        </>
      )
        :
        <p>No tienes permisos para ver esta pagina</p>
      }

    </div>
  );
};


