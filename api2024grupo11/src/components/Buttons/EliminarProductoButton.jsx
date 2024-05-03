import React from 'react';

export const EliminarProductoButton = ({productId,handleClickEliminarProducto}) =>{
    return(
        <button id="Eliminar_Producto_Button" role="button" onClick={() => handleClickEliminarProducto(productId)}>Eliminar Producto</button>
        )
    };
