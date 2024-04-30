import React from 'react'
import { PageTitle } from '../components/Titles/PageTitle'
import{ProductCard} from '../components/Cards/ProductCard'
import { Outlet } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div id='root' className='p-5 '>
      <PageTitle text="Bienvenido"/>
      <ProductCard />
    </div>
  )
}
