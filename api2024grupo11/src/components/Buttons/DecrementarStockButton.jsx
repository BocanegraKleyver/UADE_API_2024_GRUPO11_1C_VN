import React from 'react';

export const DecrementarStockButton = ({id, cantidad, handleDecrementarStock}) =>{
    return(
        <button class="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center" id="Decrementar_Stock_Producto_Button role" role="button" onClick={() => handleDecrementarStock(id, cantidad)}> - </button>  
    )
};

