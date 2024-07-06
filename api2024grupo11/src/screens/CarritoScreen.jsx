import React, { useEffect, useState } from 'react';
import { CartItemCard } from '../components/Cards/CartItemCard';
import { getCarrito, eliminarItemDelCarrito } from '../Services/carritoService';
import { useNavigate } from 'react-router-dom';
import { ProductoService } from '../Services/ProductoService';

export const CarritoScreen = () => {

  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState([]);

  const [totalGlobal, setTotalGlobal] = useState(0)

  useEffect(() => {
    getCarrito()
      .then((data) => {
        if (data) {
          setProductos(data.carrito.productos);
          setCantidades(data.carrito.productos.map(d => d.cantidad));
          setTotalGlobal(data.carrito.total)
        }
      });
  }, []);


  const comprarDeshabilitado = productos.length === 0;

  const handleCantidadChange = (index, nuevaCantidad) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = nuevaCantidad;
    setCantidades(nuevasCantidades);
  };

  // chequear stock elimina mal
  const handleComprar = () => {
    productos.forEach((producto, index) => {
      ProductoService.restarStockAlComprar(producto, cantidades[index]);
    });
    alert("Compra exitosa");
    navigate("/")
  };

  const handleEliminarDelCarrito = async (id) => {
    await eliminarItemDelCarrito(id)
    const productosNoEliminados = productos.filter(producto => producto.id !== id);
    setProductos(productosNoEliminados);
    alert("Has eliminado el producto seleccionado.")
  }

  useEffect(() => {
    // Recalcular el total global cuando cambien las cantidades
    const nuevoTotal = productos.reduce((acc, producto, index) => {
      return acc + (producto.producto.precio * cantidades[index]);
    }, 0);
    setTotalGlobal(nuevoTotal);
  }, [cantidades, productos]);


  return (
    <div className='text-black p-5'>
      <h1>Carrito de compras</h1>
      <div className='grid grid-cols-2 gap-2 h-full'>
        <div className='flex flex-col w-full h-full gap-3 justify-center py-5'>
          {productos.map((nodo, index) => (
            <CartItemCard
              key={nodo.producto.idProductos}
              producto={nodo.producto}
              cantidad={cantidades[index]}
              onCantidadChange={(cantidad) => handleCantidadChange(index, cantidad)}
              onEliminarDelCarrito={(key) => handleEliminarDelCarrito(key)}
            />
          ))}
        </div>
        <div className='py-5 text-white flex flex-col px-2 border-l border-slate-300 h-full'>
          <span className='font-bold'>Información del carrito</span>
          <span className='font-normal'>Total estimado: <span className='text-black'>${totalGlobal}</span></span>
          <button onClick={handleComprar} disabled={comprarDeshabilitado} className='p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center'>Comprar</button>
        </div>
      </div>
    </div>
  );
};