import React from 'react';
import { useState, useEffect } from 'react';
import ProductoDo from './ProductDo';

export const ProductCard = () => {

  const [productos, setProdoductos]=useState({});
  const [producto, setProducto]=useState({});

  useEffect(() => {fetch("http://localhost:3000/productos")
    .then((Response) => Response.json())
    .then((data)=>setProdoductos(data))}, [])

  
  

  return (
    <div>
       <h3>Productos</h3>
       <div>
        {productos?.map((value,index)=>(
          <ProductoDo producto={value} key={index}/>
        ))}
       </div>
        
    </div>
  )
}

