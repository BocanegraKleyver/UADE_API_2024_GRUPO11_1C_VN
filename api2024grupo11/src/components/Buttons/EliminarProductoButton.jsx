import React from 'react';

export const EliminarProductoButton = ({productId,handleClickEliminarProducto}) =>{
    return(
        <button class="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center" id="Eliminar_Producto_Button" role="button" onClick={() => handleClickEliminarProducto(productId)}>Eliminar Producto</button>
        )
    };
