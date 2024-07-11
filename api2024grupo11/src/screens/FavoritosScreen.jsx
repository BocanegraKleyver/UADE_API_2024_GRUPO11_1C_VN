import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FavItemCard } from "../components/Cards/FavItemCard";
import { eliminarItemDeFavoritosLocalmente } from "../Redux/FavoritoSlice"; 
import { fetchProductos } from "../Redux/ProductoSlice";
import { useNavigate } from "react-router-dom";

export const FavoritosScreen = () => {
  const dispatch = useDispatch();
  const productosFavoritos = useSelector((state) => state.favoritos.favoritos);
  const status = useSelector((state) => state.favoritos.status); 
  const error = useSelector((state) => state.favoritos.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  const handleEliminarDeFavoritos = (id) => {
    dispatch(eliminarItemDeFavoritosLocalmente(id));
    alert("Has eliminado el producto seleccionado.");
  };

  const handleVerDescripcion = (id) => {
    navigate(`/producto/${id}`);
  };

  if (status === "loading") {
    return <div>Cargando favoritos...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-black p-5">
      <h1>Mis Favoritos</h1>
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="contenedor-productos">
          {productosFavoritos.length === 0 ? (
            <p>No tienes productos favoritos.</p>
          ) : (
            productosFavoritos.map((producto) => (
              <FavItemCard
                key={producto.id}
                producto={producto}
                onEliminarDeFavoritos={() => handleEliminarDeFavoritos(producto.id)}
                onVerDescripcion={() => handleVerDescripcion(producto.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
