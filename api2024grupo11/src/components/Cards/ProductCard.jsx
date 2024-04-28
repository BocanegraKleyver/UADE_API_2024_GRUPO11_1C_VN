import React from 'react';
import { useState, useEffect } from 'react';
import ProductoDo from './ProductDo';

const ProductCard = () => {

  const [productos, setProdoductos]=useState({});

  useEffect(() => {fetch("http://localhost:3000/productos")
    .then((Response) => Response.json())
    .then((data)=>setProdoductos(data))}, [])

   function cargarProductos(){
    productos.forEach(producto => {

     const div = document.createElement("div");
     div.classList.add("producto");
     div.innerHTML = `
       <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"></img>
       <div class="producto-detalles">
         <h3 class="producto-titulo">${producto.titulo}</h3>
         <p class="producto-precio">$${producto.precio}</p>
         <button class="producto-agregar" id="${producto.id}">Agregar</button>
       </div>
     `;
     contenedorproductos.append(div);
   })
   }
  

  return (
    <div>
       <h3>Productos</h3>

    </div>
  )
}

export default ProductCard;