import React from 'react';
import { DecrementItemButton } from '../Buttons/DecrementItemButton';
import { IncrementItemButton } from '../Buttons/IncrementItemButton';

export const CartItemCard = ({ producto, cantidad, onCantidadChange, onEliminarDelCarrito }) => {

  const handleIncrementItem = () => {
    const nuevaCantidad = cantidad + 1;
    onCantidadChange(nuevaCantidad);
  };

  const handleDecrementItem = () => {
    if (cantidad === 0) {
      return;
    }
    const nuevaCantidad = cantidad - 1;
    onCantidadChange(nuevaCantidad);
  };

  const handleEliminarItem = () => {
    onEliminarDelCarrito(producto.id);
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
