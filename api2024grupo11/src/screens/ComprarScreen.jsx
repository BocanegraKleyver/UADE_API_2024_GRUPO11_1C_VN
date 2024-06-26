import React from "react";
import ProductDo from "../components/Cards/ProductDo";
import { useState, useEffect } from "react";
import { PageTitle } from "../components/Titles/PageTitle";
import { agregarItemAlCarrito } from "../Services/carritoService";
import { agregarItemAFavoritos } from "../Services/favoritosService";

const ComprarScreen = () => {
  const [productos, setProdoductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/productos")
      .then((response) => response.json())
      .then((data) => setProdoductos(data));
  }, []);

  const handleAgregarAlCarrito = (producto) => {
    if (producto.cantidad === 0) {
      alert(
        "No hay stock del producto. Intente más tarde o con otro producto."
      );
      return;
    }
    agregarItemAlCarrito(producto);
    alert("Item agregado al carrito");
  };

  const handleAgregarAFavoritos = (producto) => {
    agregarItemAFavoritos(producto);
    alert("Producto agregado a favoritos");
  };

  return (
    <div>
      <div className="text-black bold p-5">
        <PageTitle text="¿Que desea comprar?" />
      </div>
      <div className="contenedor-productos">
        {productos.map((value, index) => (
          <ProductDo
            value={value}
            key={index}
            agregarAlCarrito={() => handleAgregarAlCarrito(value)}
            agregarAFavoritos={() => handleAgregarAFavoritos(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default ComprarScreen;
