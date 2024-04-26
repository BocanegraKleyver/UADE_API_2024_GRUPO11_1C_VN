import React from 'react'
import { PageTitle } from '../components/Titles/PageTitle'

export const CarritoScreen = () => {
  return (
    <div className='text-black p-5'>
      <PageTitle text="Carrito de Compras"/>
      <div className='flex flex-col  w-full h-full gap-3 p-5 justify-center'>
        <div className='flex flex-row bg-slate-200 w-[50vh] h-[8vh] justify-center items-center shadow rounded-lg'>
          123         
        </div>
        <div className='flex flex-row bg-slate-200 w-[50vh] h-[8vh] justify-center items-center shadow rounded-lg'>
          asd
        </div>
      </div>
    </div>
  )
}
