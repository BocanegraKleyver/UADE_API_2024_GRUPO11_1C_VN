import React from 'react';

export const DecrementarStockButton = (id, cantidad, handleDecrementarStock ) =>{
    return(
        <button id="Decrementar_Stock_Producto_Button role" role="button" onClick={() => handleDecrementarStock(id, cantidad)}> - </button>  
        )
    };

