import React from 'react'
import { PageTitle } from '../components/Titles/PageTitle'
import { CartItemCard } from '../components/Cards/CartItemCard'

export const CarritoScreen = () => {

  const total = 45;

  return (
    <div className='text-black p-5'>
      <PageTitle text="Carrito de Compras"/>
      <div className='grid grid-cols-2 gap-2 h-full'>
        <div className='flex flex-col w-full h-full gap-3 justify-center py-5'>
          <CartItemCard text="Silla Gamer 410mm x 219mm bla bla bllalla" cantidad={1} precio={2}/>
          <CartItemCard text="Silla Ejecutiva" cantidad={1} precio={5}/>
        </div>
        <div className='py-5 text-white flex flex-col px-2 border-l border-slate-300 h-full'>
          <span className='font-bold'>Información del carrito</span>
          <span className='font-normal'>Total estimado: <span className='text-black'>${total}</span></span>
        </div>
      </div>
    </div>
  )
}
