import React from 'react';
import { useState, useEffect } from 'react';
import ProductoDo from './ProductDo';
import { Outlet } from 'react-router-dom';

export const ProductCard = () => {

  const [productos, setProdoductos]=useState([]);
  const [producto, setProducto]=useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/producto")
    .then((Response) => Response.json())
    .then((data)=>setProdoductos(data))}, [])

  
  

  return (
    <div>
       <div className="contenedor-productos">
        {productos.map((product)=>(<>
          <ProductoDo 
            key={product.postId}
            titulo={product.titulo}
            imagen={product.imagen}
            precio={product.precio}
          />
          </>
        ))}
        <Outlet></Outlet>
       </div>
        
    </div>
  )
}

