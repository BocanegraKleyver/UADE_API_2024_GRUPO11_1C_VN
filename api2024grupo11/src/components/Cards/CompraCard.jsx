import React from 'react'
import { Link } from 'react-router-dom'

export const CompraCard = ({compra}) => {
  return (
    <div className='border border-black p-5 bg-white rounded-xl'>
        <div className='flex flex-col gap-2'>
            <span className='font-semibold text-lg'>Total: ${compra.precioTotal}</span>
            <span className='font-semibold'>Productos comprados:</span>
            <div className='flex flex-row gap-3'>
                {compra.compraProductos.map(cp => (
                    <div className='flex flex-col bg-white p-2'>
                        <Link className='font-medium underline hover:opacity-80' to={`/producto/${cp.producto.id}`}>{cp.producto.titulo}</Link>
                        <span>${cp.producto.precio}</span>
                        <span>Cantidad: {cp.producto.cantidad}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
