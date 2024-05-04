import React from 'react';

export const IncrementarStockButton =  ({ id, cantidad, handleIncrementarStock }) =>{
    return(
        
            <button class="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center" id="Incrementar_Stock_Producto_Button role" role="button" onClick={() => handleIncrementarStock(id, cantidad)}> + </button>  

        )
    };

    