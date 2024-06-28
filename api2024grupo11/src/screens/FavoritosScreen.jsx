import React, { useEffect, useState } from "react";
import { PageTitle } from "../components/Titles/PageTitle";
import { FavItemCard } from "../components/Cards/FavItemCard";
import {
  getFavoritos,
  eliminarItemDeFavoritos,
} from "../Services/favoritosService";

export const FavoritosScreen = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getFavoritos().then((data) => {
      setProductos(data);
    });
  }, []);

  const handleEliminarDeFavoritos = (id) => {
    eliminarItemDeFavoritos(id);
    const productosNoEliminados = productos.filter(
      (producto) => producto.id !== id
    );
    setProductos(productosNoEliminados);
    alert("Has eliminado el producto seleccionado.");
  };

  return (
    <div className="text-black p-5">
      <PageTitle text="Carrito de Compras" />
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="flex flex-col w-full h-full gap-3 justify-center py-5">
          {productos.map((producto, index) => (
            <FavItemCard
              key={producto.id}
              onEliminarDeFavoritos={(key) => handleEliminarDeFavoritos(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
