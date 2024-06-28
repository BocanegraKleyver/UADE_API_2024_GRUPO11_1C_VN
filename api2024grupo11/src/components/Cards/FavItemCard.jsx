import React from "react";

export const FavItemCard = ({ producto, cantidad, onEliminarDeFavoritos }) => {
  const handleEliminarItem = () => {
    onEliminarDeFavoritos(producto.id);
  };

  return (
    <div className="overflow-hidden bg-slate-200 h-[8vh] shadow rounded-md px-3 flex items-center">
      <div className="grid grid-cols-3 items-center w-full text-xs">
        {/* col 1 */}
        <span className="font-light text-center mx-2 overflow-hidden">
          {producto.titulo}
        </span>
        {/* col 2 */}
        <div className="w-full text-right">
          {/* Utiliza una función de flecha para envolver la llamada a handleEliminarItem */}
          <button
            onClick={() => handleEliminarItem()}
            className={`text-slate-500 text-[10px] hover:text-black`}
          >
            Eliminar de favoritos
          </button>
        </div>
      </div>
    </div>
  );
};
