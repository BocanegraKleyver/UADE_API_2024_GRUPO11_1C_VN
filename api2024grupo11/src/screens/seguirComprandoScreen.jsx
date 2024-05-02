import React from "react";
import ProductDo from "../components/Cards/ProductDo";
import { useState, useEffect } from 'react';


const SeguirComprandoScreen = () => {

    const [productos, setProdoductos]=useState([]);


    useEffect(() => {
      fetch("http://localhost:3000/producto")
      .then((response) => response.json())
      .then((data)=>setProdoductos(data)).then(console.log(setProdoductos));
    }, [])
  
    return (
      <div>
         <div className="contenedor-productos">
          
          {productos.map((value, index)=>(<>
            <ProductDo value={value} key={index} />
            </>
          ))}
          
  
         </div>
          
      </div>
    )
}

export default SeguirComprandoScreen;