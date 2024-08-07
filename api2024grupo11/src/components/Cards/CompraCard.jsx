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
                        <span>Precio por unidad: $ {cp.producto.precioConDescuento.toFixed(2)}</span>
                        <span>Pagado: ${cp.producto.precioConDescuento.toFixed(2)*cp.cantidad}</span>
                        <span>Cantidad: {cp.cantidad}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
