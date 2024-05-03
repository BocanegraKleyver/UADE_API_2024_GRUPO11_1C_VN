import React from "react";
import ProductDo from "../components/Cards/ProductDo";
import { useState, useEffect } from 'react';
import { PageTitle } from "../components/Titles/PageTitle";
import { agregarItemAlCarrito } from "../Services/carritoService";

const ComprarScreen = () => {

    const [productos, setProdoductos]=useState([]);

    useEffect(() => {
      fetch("http://localhost:8000/productos")
      .then((response) => response.json())
      .then((data)=>setProdoductos(data)).then(console.log(setProdoductos));
    }, [])
  

    const handleAgregarAlCarrito = (producto) => {
      agregarItemAlCarrito(producto);
      alert("Item agreagado al carrito")
    }

    return (
      <div>
        <div className='text-black bold p-5' >
            <PageTitle text="¿Que desea comprar?"/>
        </div>
        <div className="contenedor-productos">
          
          {productos.map((value, index)=>(
            <ProductDo value={value} key={index} agregarAlCarrito={handleAgregarAlCarrito} />
          ))}
          
  
        </div>
         
          
      </div>
    )
}

export default ComprarScreen;