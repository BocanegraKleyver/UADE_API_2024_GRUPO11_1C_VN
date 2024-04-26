import React from 'react'

export const CartItemCard = (producto) => {
  return (
    <div className='flex flex-row bg-slate-200 w-[50vh] h-[8vh] items-center shadow rounded-md px-2 gap-4'>
        <span className='font-semibold'>{producto.text}</span>
        <span>{producto.cantidad}</span>
    </div>
  )
}
