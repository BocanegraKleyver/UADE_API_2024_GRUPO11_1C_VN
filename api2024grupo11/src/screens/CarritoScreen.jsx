import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemCard } from '../components/Cards/CartItemCard';
import { useNavigate } from 'react-router-dom';
import { removeFromCarrito } from '../Redux/CarritoSlice';
import { updateProducto } from '../Redux/ProductoSlice';
import { fetchCarritoByUserId } from '../Redux/CarritoSlice';


export const CarritoScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const carrito = useSelector((state) => state.carrito.carrito);
  const productos = carrito?.productos || [];
  const [cantidades, setCantidades] = useState([]);
  const [totalGlobal, setTotalGlobal] = useState(0);


  useEffect(() => {
    if (carrito && carrito.productos) {
      setCantidades(carrito.productos.map((producto) => producto.cantidad));
      setTotalGlobal(carrito.total);
    }
  }, [carrito]);

  const comprarDeshabilitado = productos.length === 0;

  const handleCantidadChange = (index, nuevaCantidad) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = nuevaCantidad;
    setCantidades(nuevasCantidades);
  };


  const handleComprar = async () => {
    productos.forEach(async (producto, index) => {
      const newStock = producto.producto.stock - cantidades[index];
      await dispatch(updateProducto({ id: producto.producto.id, producto: { ...producto.producto, stock: newStock } }));
    });
    alert("Compra exitosa");
    navigate("/");
  };


  const handleEliminarDelCarrito = async (id) => {
    dispatch(removeFromCarrito({ carritoId: carrito.id, item: { id } }));
    alert("Has eliminado el producto seleccionado.");
  };

  useEffect(() => {
    const nuevoTotal = productos.reduce((acc, producto, index) => {
      return acc + (producto.producto.precio * cantidades[index]);
    }, 0);
    setTotalGlobal(nuevoTotal);
  }, [cantidades, productos]);

  useEffect(() => {
    dispatch(fetchCarritoByUserId(1)); 
  }, [dispatch]); 



  return (
    <div className='text-black p-5 bg-[#f3f4f6]'>
      <h1>Carrito de compras</h1>
      <div className='grid grid-cols-2 gap-2 h-full'>
        <div className='flex flex-col w-full h-full gap-3 justify-center py-5'>
          {productos.length > 0 ? (
            productos.map((nodo, index) => (
              <CartItemCard
                key={nodo.producto.idProductos}
                producto={nodo.producto}
                cantidad={cantidades[index]}
                onCantidadChange={(cantidad) => handleCantidadChange(index, cantidad)}
                onEliminarDelCarrito={() => handleEliminarDelCarrito(nodo.id)}
              />
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
        <div className='py-5 text-white flex flex-col px-2 border-l border-slate-300 h-full'>
          <span className='font-bold text-black'>Información del carrito</span>
          <span className='font-normal text-black'>Total estimado: <span className='text-black'>${totalGlobal}</span></span>
          <button onClick={handleComprar} disabled={comprarDeshabilitado} className='p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center'>Comprar</button>
        </div>
      </div>
    </div>
  );
};