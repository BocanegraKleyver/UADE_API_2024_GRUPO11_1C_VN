import React from 'react';
import { DecrementItemButton } from '../Buttons/DecrementItemButton';
import { IncrementItemButton } from '../Buttons/IncrementItemButton';
import { actualizarCarrito, restarCantidadCarrito, sumarCantidadCarrito } from '../../Services/carritoService';

export const CartItemCard = ({ producto, cantidad, onCantidadChange, onEliminarDelCarrito }) => {

  const handleIncrementItem = async () => {
    const nuevaCantidad = cantidad + 1;
  
    try {
      const res = await sumarCantidadCarrito(1, producto.idProductos);
  
      if (res.error === 'No hay suficiente stock de ese producto') {
        alert(res.error);
      } else {
        onCantidadChange(nuevaCantidad);
      }
    } catch (error) {
      console.error("Ocurrió un error al incrementar la cantidad:", error);
    }
  };
  
  const handleDecrementItem = async () => {
    if (cantidad === 0) {
      return;
    }
    const nuevaCantidad = cantidad - 1;

    try {
      await restarCantidadCarrito(1, producto.idProductos)
      onCantidadChange(nuevaCantidad);
    } catch (error) {
      console.error("Ocurrió un error al incrementar la cantidad:", error);
    }
  };

  const handleEliminarItem = () => {
    onEliminarDelCarrito(producto.idProductos);
  };

  return (
    <div className='overflow-hidden bg-slate-200 h-[8vh] shadow rounded-md px-3 flex items-center'>
      <div className='grid grid-cols-3 items-center w-full text-xs'>
        {/* col 1 */}
        <span className='font-light text-center mx-2 overflow-hidden'>{producto.titulo}</span>
        {/* col 2 */}
        <div className='flex flex-row items-center border-l border-r justify-center border-slate-300 gap-2'>
          <div className='flex flex-row items-center'>
            <span className='font-light px-2'>Cantidad</span>
            <div className='flex flex-row items-center gap-1'>
              <DecrementItemButton onDecrement={handleDecrementItem}/>
              <span className='text-sm font-light'>{cantidad}</span>
              <IncrementItemButton onIncrement={handleIncrementItem}/>
            </div>
          </div>
          <span className='font-semibold'>${cantidad * parseFloat(producto.precio)}</span>
        </div>
        {/* col 3 */}
        <div className='w-full text-right'>
          {/* Utiliza una función de flecha para envolver la llamada a handleEliminarItem */}
          <button onClick={() => handleEliminarItem()} className={`text-slate-500 text-[10px] hover:text-black`}>Eliminar del carrito</button>
        </div>
      </div>
    </div>
  );
};
