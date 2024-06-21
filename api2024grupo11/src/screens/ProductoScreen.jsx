import React, { useEffect, useState } from "react";
import { agregarItemAlCarrito } from "../Services/carritoService";
import ProductDo from "../components/Cards/ProductDo";
import { PageTitle } from "../components/Titles/PageTitle";

const ProductoScreen =() =>{

    const [producto, setPrododucto]=useState([]);

    //Hook Json Productos
    useEffect(() => { getProductoScreen().then((data) => setProducto(data));},[]);

    useEffect(() => {
      fetch("http://localhost:8000/productos/" + producto.id)
      .then((response) => response.json())
      .then((data)=>setPrododucto(data))
    }, [])
  

    const handleAgregarAlCarrito = (producto) => {
      if (producto.cantidad === 0) {
        alert("No hay stock del producto. Intente más tarde o con otro producto.")
        return;
      }
      agregarItemAlCarrito(producto);
      alert("Item agregado al carrito")
    }

    return (
      <div>
        <div className='text-black bold p-5' >
            <PageTitle text="Informacion del Producto"/>
        </div>
        <div>
          {producto.map((value, index)=>(
            <ProductDo value={value} key={index} agregarAlCarrito={() => handleAgregarAlCarrito(value)} />
          ))}
        </div>
      </div>
    )

}

export default ProductoScreen;