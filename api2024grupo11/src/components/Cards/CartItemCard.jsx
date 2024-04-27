import React from 'react';
import { DecrementItemButton } from '../Buttons/DecrementItemButton';
import { IncrementItemButton } from '../Buttons/IncrementItemButton';

export const CartItemCard = ({ producto, onCantidadChange }) => {

  const handleIncrementItem = () => {
    const newCantidadItem = producto.cantidad + 1;
    onCantidadChange(newCantidadItem);
  };

  const handleDecrementItem = () => {
    if (producto.cantidad === 0) {
      return;
    }
    const newCantidadItem = producto.cantidad - 1;
    onCantidadChange(newCantidadItem);
  };

  const eliminarItemDelCarrito = () => {
    alert("Feature a desarrollar :(");
  };

  return (
    <div className='overflow-hidden bg-slate-200 h-[8vh] shadow rounded-md px-3 flex items-center'>
        <div className='grid grid-cols-3 items-center w-full text-xs'>
          {/* col 1 */}
          <span className='font-light text-center mx-2 overflow-hidden'>{producto.text}</span>
          {/* col 2 */}
          <div className='flex flex-row items-center border-l border-r justify-center border-slate-300 gap-2'>
            <div className='flex flex-row items-center'>
              <span className='font-light px-2'>Cantidad</span>
              <div className='flex flex-row items-center gap-1'>
                <DecrementItemButton onDecrement={handleDecrementItem}/>
                <span className='text-sm font-light'>{producto.cantidad}</span>
                <IncrementItemButton onIncrement={handleIncrementItem}/>
              </div>
            </div>
            <span className='font-semibold'>${producto.cantidad * producto.precio}</span>
          </div>
          {/* col 3 */}
          <div className='w-full text-right'>
            <button onClick={eliminarItemDelCarrito} className='text-slate-500 text-[10px] hover:text-black'>Eliminar del carrito</button>
          </div>
        </div>
    </div>
  );
};
