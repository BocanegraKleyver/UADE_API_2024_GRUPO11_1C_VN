import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { agregarItemAlCarrito } from "../Services/carritoService";
import ProductSelect from "../components/Cards/ProductSelect";
import { PageTitle } from "../components/Titles/PageTitle";

const ProductoScreen =(props) =>{

    const [producto, setPrododucto]=useState([]);

    //Hook Json Productos
    //useEffect(() => { getProductoScreen().then((data) => setProducto(data));},[]);
    const { id } = useParams();

    useEffect(() => {
      fetch("http://localhost:8000/productos/" + id)
      .then((response) =>{ 
        console.log (id)
        return response.json()})
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
        
          <ProductSelect value={producto} agregarAlCarrito={() => handleAgregarAlCarrito(producto)} />
        
        </div>
      </div>
    )

}

export default ProductoScreen;