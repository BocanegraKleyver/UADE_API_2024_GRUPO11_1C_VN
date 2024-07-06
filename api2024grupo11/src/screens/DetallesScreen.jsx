import React, { useEffect } from "react";
import ProductDo from "../components/Cards/ProductDo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { agregarItemAlCarrito } from "../Services/carritoService";
import { ProductoService } from '../Services/ProductoService';

export const DescripcionScreen = () => {
  const [producto, setProducto] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await ProductoService.getProductoById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProducto();
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
        <h1>
        Detalles
        </h1>
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


