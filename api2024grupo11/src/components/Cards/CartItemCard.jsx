import React, { useState } from 'react'
import { DecrementItemButton } from '../Buttons/DecrementItemButton'
import { IncrementItemButton } from '../Buttons/IncrementItemButton'

export const CartItemCard = (producto) => {

  const [cantidadItem, setCantidadItem] = useState(producto.cantidad)
  const [totalItem, setTotalItem] = useState(cantidadItem * producto.precio)

  const handleIncrementItem = () => {
    const newCantidadItem = cantidadItem + 1;
    setCantidadItem(newCantidadItem);
    setTotalItem(newCantidadItem * producto.precio);
  }

  const handleDecrementItem = () => {
    if (cantidadItem === 0) {
      return;
    }
    const newCantidadItem = cantidadItem - 1;
    setCantidadItem(newCantidadItem);
    setTotalItem(newCantidadItem * producto.precio);
  }

  return (
    <div className='overflow-hidden bg-slate-200 h-[8vh] shadow rounded-md px-3 flex items-center'>
        <div className='grid grid-cols-3 items-center w-full text-xs'>
          {/* col 1 */}
          <span className='font-light text-center mx-2'>{producto.text}</span>
          {/* col 2 */}
          <div className='flex flex-row items-center border-l border-r justify-center border-slate-300 gap-2'>
            <div className='flex flex-row items-center'>
              <span className='font-light px-2'>Cantidad</span>
              <div className='flex flex-row items-center gap-1'>
                <DecrementItemButton onDecrement={handleDecrementItem}/>
                <span className='text-sm font-light'>{cantidadItem}</span>
                <IncrementItemButton onIncrement={handleIncrementItem}/>
              </div>
            </div>
            <span className='font-semibold'>${totalItem}</span>
          </div>
          {/* col 3 */}
          <div className='w-full text-right'>
            <button className='text-slate-500 text-[10px] hover:text-black'>Eliminar del carrito</button>
          </div>
        </div>
    </div>
  )
}
