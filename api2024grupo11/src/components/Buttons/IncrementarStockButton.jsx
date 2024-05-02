import React from 'react';

export const IncrementarStockButton = ({handleClickIncrementarStock}) =>{
    return(
            <button id="Incrementar_Stock_Producto_Button" role="button"  onClick={handleClickIncrementarStock}> + </button>  
        )
    };
