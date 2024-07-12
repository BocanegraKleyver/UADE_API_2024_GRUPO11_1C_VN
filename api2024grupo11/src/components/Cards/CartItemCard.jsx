import React from 'react';
import { DecrementItemButton } from '../Buttons/DecrementItemButton';
import { IncrementItemButton } from '../Buttons/IncrementItemButton';
import { addToCarrito, substractFromCarrito } from '../../Redux/CarritoSlice';
import { useDispatch } from 'react-redux';

export const CartItemCard = ({ producto, cantidad, onCantidadChange, onEliminarDelCarrito, idCarrito }) => {
  const dispatch = useDispatch();

  const handleIncrementItem = async () => {
    const item = { productoId: producto.id, cantidad: 1 };
    dispatch(addToCarrito({ carritoId: idCarrito, item }))
    }

  const handleDecrementItem = async () => {
    if (cantidad === 0) {
      return;
    }
    const item = { productoId: producto.id, cantidad: 1 };
    dispatch(substractFromCarrito({ carritoId: idCarrito, item }))
  };

  const handleEliminarItem = () => {
    onEliminarDelCarrito(producto.idProductos);
  };

  return (
    <div className='overflow-hidden bg-slate-200 h-[8vh] shadow rounded-md px-3 flex items-center'>
      <div className='grid grid-cols-3 items-center w-full text-xs'>
        <span className='font-light text-center mx-2 overflow-hidden'>{producto.titulo}</span>
        <div className='flex flex-row items-center border-l border-r justify-center border-slate-300 gap-2'>
          <div className='flex flex-row items-center'>
            <span className='font-light px-2'>Cantidad</span>
            <div className='flex flex-row items-center gap-1'>
              <DecrementItemButton onDecrement={handleDecrementItem} />
              <span className='text-sm font-light'>{cantidad}</span>
              <IncrementItemButton onIncrement={handleIncrementItem} />
            </div>
          </div>
          <span className='font-semibold'>${cantidad * producto.precioConDescuento.toFixed(2)}</span>
        </div>
        <div className='w-full text-right'>
          <button onClick={() => handleEliminarItem()} className={`text-slate-500 text-[10px] hover:text-black`}>Eliminar del carrito</button>
        </div>
      </div>
    </div>
  );
};
