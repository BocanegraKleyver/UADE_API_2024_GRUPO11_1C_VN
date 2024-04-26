import React, { useState } from 'react'
import { DecrementItemButton } from '../Buttons/DecrementItemButton'
import { IncrementItemButton } from '../Buttons/IncrementItemButton'

export const CartItemCard = (producto) => {

  const [cantidadItem, setCantidadItem] = useState(producto.cantidad)

  const handleIncrementItem = () => {
    setCantidadItem(cantidadItem+1)
  }

  const handleDecrementItem = () => {
    if (cantidadItem === 0 ) {
      return;
    }
    setCantidadItem(cantidadItem-1)
  }

  return (
    <div className='overflow-hidden flex flex-row bg-slate-200 w-[50vh] h-[8vh] items-center justify-between shadow rounded-md px-5 gap-4'>
        {/* cambiar width del text si se hace overflow o no entra :) */}
        <span className='font-light text-center'>{producto.text}</span>
        <div className='grid grid-cols-2 items-center gap-2 border-l border-slate-300 pl-2'>
          <span className='font-light text-sm'>Cantidad</span>
          <div className='flex flex-row items-center gap-1'>
            <DecrementItemButton onDecrement={handleDecrementItem}/>
            <span className='text-sm font-normal'>{cantidadItem}</span>
            <IncrementItemButton onIncrement={handleIncrementItem}/>
          </div>

        </div>
    </div>
  )
}
