import React from "react";
import {IncrementarStockBoton} from '../Buttons/IncrementarStockBoton';
import {DecrementarStockBoton} from '../Buttons/DecrementarStockBoton';
import {EliminarProductoBoton} from '../Buttons/EliminarProductoBoton';


export const GestionProductoCard = (producto, estadoCantidadProducto) => {

    const incrementarStock = () => {
       const nuevaCantidadStock = producto.cantidad + 1;
       estadoCantidadProducto(nuevaCantidadStock)
    };
    
    const decrementarStock = () => {
     if(producto.cantidad === 0){
        return;
     }else{
        const nuevaCantidadStock = producto.cantidad - 1;
        estadoCantidadProducto(nuevaCantidadStock)
     }
    };
 
    const eliminarProducto = () => {
        alert("Feature a desarrollar :(");
    }


    return(
        <div className="Gestion_Productos">
            <label for="Gestion_Productos"><span className="icon-lock">Stock</span></label>
            <div className='Gestion_Productos-1'>
                    <IncrementarStockBoton Incrementar={incrementarStock} />
                    <span className='Gestion_Productos-2'>{producto.cantidad}</span>
                    <DecrementarStockBoton Decrementar={decrementarStock} />
            </div>
            <div className='Gestion_Productos-3'>
              <button onClick={EliminarProductoBoton} className='Gestion_Producto-4'>Eliminar del carrito</button>
            </div>
        </div>
    );
};