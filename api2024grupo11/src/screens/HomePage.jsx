import React from 'react'
import { PageTitle } from '../components/Titles/PageTitle'
import SeguirComprandoScreen from './SeguirComprandoScreen'


export const HomePage = () => {
  return (
    <div id='root' className='p-5 '>
      <PageTitle text="Bienvenido"/>
      <SeguirComprandoScreen/>
    </div>
  )
}
