import React from "react";
import ProductDo from "../components/Cards/ProductDo";
import { useState, useEffect } from 'react';
import { PageTitle } from "../components/Titles/PageTitle";


const ComprarScreen = () => {

    const [productos, setProdoductos]=useState([]);


    useEffect(() => {
      fetch("http://localhost:8000/productos")
      .then((response) => response.json())
      .then((data)=>setProdoductos(data)).then(console.log(setProdoductos));
    }, [])
  
    return (
      <div>
        <div className='text-black bold p-5' >
            <PageTitle text="¿Que desea comprar?"/>
        </div>
        <div className="contenedor-productos">
          
          {productos.map((value, index)=>(<>
            <ProductDo value={value} key={index} />
            </>
          ))}
          
  
        </div>
         
          
      </div>
    )
}

export default ComprarScreen;