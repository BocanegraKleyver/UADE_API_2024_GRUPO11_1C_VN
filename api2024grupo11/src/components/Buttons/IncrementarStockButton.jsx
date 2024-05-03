import React from 'react';

export const IncrementarStockButton =  ({ id, cantidad, handleIncrementarStock }) =>{
    return(
        
            <button id="Incrementar_Stock_Producto_Button role" role="button" onClick={() => handleIncrementarStock(id, cantidad)}> + </button>  

        )
    };
