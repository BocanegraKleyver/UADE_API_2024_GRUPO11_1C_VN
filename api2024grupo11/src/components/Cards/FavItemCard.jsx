import React from "react";

export const FavItemCard = ({
  producto,
  onEliminarDeFavoritos,
  onVerDescription,
}) => {
  const handleEliminarItem = () => {
    onEliminarDeFavoritos(producto.id);
  };

  const handleVerDescription = () => {
    onVerDescription(producto.id);
  };

  return (
    <div className="overflow-hidden bg-slate-200 h-[20vh] shadow rounded-md px-3 flex items-center">
      <div className="grid grid-cols-3 items-center w-full text-xs">
        <img
          className="producto-imagen-fav"
          src={producto.imagen_1}
          alt={producto.titulo}
        ></img>
        <a
          href={`/producto/${producto.id}`}
          className="font-light text-center mx-2 overflow-hidden"
        >
          {producto.titulo}
        </a>
        {/* col 2 */}
        <div className="w-full text-right">
          {/* Utiliza una función de flecha para envolver la llamada a handleEliminarItem */}
          <button
            onClick={() => handleEliminarItem()}
            className={`text-slate-500 text-[10px] hover:text-black`}
          >
            Eliminar de favoritos
          </button>
          <button
            onClick={() => handleVerDescription()}
            className={`text-slate-500 text-[10px] hover:text-black`}
          >
            Ver descripcion
          </button>
        </div>
      </div>
    </div>
  );
};
