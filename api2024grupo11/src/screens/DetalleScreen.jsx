import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { agregarItemAlCarrito } from "../Services/carritoService";
import ProductSelect from "../components/Cards/ProductSelect";
import { ProductoService } from "../Services/ProductoService";


export const DetalleScreen =(props) =>{

    const [producto, setPrododucto]=useState([]);


    const { id } = useParams();

    useEffect(() => {
        ProductoService.getProductoById(id)
      .then((data)=>setPrododucto(data))
    }, id)

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
            <h1>
            Informacion del Producto
            </h1>
        </div>
        <div>
        
          <ProductSelect value={producto} agregarAlCarrito={() => handleAgregarAlCarrito(producto)} />
        
        </div>
      </div>
    )

}
