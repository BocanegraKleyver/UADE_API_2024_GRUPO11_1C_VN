import React, { useEffect, useState } from "react";
import { PageTitle } from "../components/Titles/PageTitle";
import { FavItemCard } from "../components/Cards/FavItemCard";
import {
  getFavoritos,
  eliminarItemDeFavoritos,
} from "../Services/favoritosService";
import { useNavigate } from "react-router-dom";

export const FavoritosScreen = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate;

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

  const handleVerDescription = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="text-black p-5">
      <PageTitle text="Mis Favoritos" />
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="contenedor-productos">
          {productos.map((producto) => (
            <FavItemCard
              key={producto.id}
              producto={producto}
              onEliminarDeFavoritos={(key) => handleEliminarDeFavoritos(key)}
              onVerDescripcion={(key) => handleVerDescription(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
