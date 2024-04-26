import React from 'react'
import { PageTitle } from '../components/Titles/PageTitle'
import { CartItemCard } from '../components/Cards/CartItemCard'

export const CarritoScreen = () => {
  return (
    <div className='text-black p-5'>
      <PageTitle text="Carrito de Compras"/>
      <div className='flex flex-col w-full h-full gap-3 justify-center px-16'>
        <CartItemCard text="Silla Gamer" cantidad={1}/>
        <CartItemCard text="Silla Ejecutiva" cantidad={1}/>
      </div>
    </div>
  )
}
