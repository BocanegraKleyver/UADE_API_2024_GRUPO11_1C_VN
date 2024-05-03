import React, { useState } from 'react';
import { PageTitle } from '../components/Titles/PageTitle';
import { CartItemCard } from '../components/Cards/CartItemCard';

export const CarritoScreen = () => {

  const [productos, setProductos] = useState([
    { text: "Silla Gamer HyperX RGB PRO 4 patas", cantidad: 1, precio: 2 },
    { text: "Silla Ejecutiva", cantidad: 1, precio: 5 }
  ]);

  // params: acummulator y valor actual.
  const totalEstimado = productos.reduce((total, producto) => {
    return total + (producto.cantidad * producto.precio);
  }, 0);

  const handleCantidadChange = (index, nuevaCantidad) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].cantidad = nuevaCantidad;
    setProductos(nuevosProductos);
  };

  const handleComprar = () => {
    alert("Compra exitosa")
  }

  return (
    <div className='text-black p-5'>
      <PageTitle text="Carrito de Compras"/>
      <div className='grid grid-cols-2 gap-2 h-full'>
        <div className='flex flex-col w-full h-full gap-3 justify-center py-5'>
          {productos.map((producto, index) => (
            <CartItemCard
              key={index}
              producto={producto}
              onCantidadChange={(nuevaCantidad) => handleCantidadChange(index, nuevaCantidad)}
            />
          ))}
        </div>
        <div className='py-5 text-white flex flex-col px-2 border-l border-slate-300 h-full'>
          <span className='font-bold'>Información del carrito</span>
          <span className='font-normal'>Total estimado: <span className='text-black'>${totalEstimado}</span></span>
          <button onClick={handleComprar} className='p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center'>Comprar</button>
        </div>
      </div>
    </div>
  );
};
 