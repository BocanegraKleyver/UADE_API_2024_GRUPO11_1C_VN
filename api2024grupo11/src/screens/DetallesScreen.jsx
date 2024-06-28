import React, { useEffect } from "react";
import ProductDo from "../components/Cards/ProductDo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from "../components/Titles/PageTitle";
import { agregarItemAlCarrito } from "../Services/carritoService";
import { getProducto } from "../Services/productosService";

const DescripcionScreen = () => {
  const [producto, setProducto] = useState();
  const { id } = useParams();

  useEffect(() => {
    getProducto(id).then((data) => {
      setProducto(data);
    });
  }, [id]);

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

  return (
    <div>
      <div className="text-black bold p-5">
        <PageTitle text="Detalles" />
      </div>
      <div className="contenedor-productos">
        <ProductDo
          key={producto.id}
          producto={producto}
          agregarAlCarrito={() => handleAgregarAlCarrito(producto.id)}
        />
      </div>
    </div>
  );
};

export default DescripcionScreen;
