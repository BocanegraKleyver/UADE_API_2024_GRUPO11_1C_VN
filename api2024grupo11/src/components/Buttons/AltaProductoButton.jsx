import React from 'react';

export const AltaProductoButton = ({handleClickAltaProducto}) =>{
    return(
        <button class="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center" id="Alta_Producto_Button" role="button"  onClick={handleClickAltaProducto}>Alta Producto</button>          
    )
};
