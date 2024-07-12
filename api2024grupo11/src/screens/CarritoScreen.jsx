import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemCard } from '../components/Cards/CartItemCard';
import { useNavigate } from 'react-router-dom';
import { comprar, emptyCarrito, fetchCarritoByUserEmail, removeFromCarrito, substractFromCarrito } from '../Redux/CarritoSlice';
import { updateProducto } from '../Redux/ProductoSlice';


export const CarritoScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = JSON.parse(localStorage.getItem("usuario")).registered_email;
  
  const carrito = useSelector((state) => state.carrito.carrito);
  const productos = carrito.carrito.productos || [];
  const [cantidades, setCantidades] = useState([]);
  const [totalGlobal, setTotalGlobal] = useState(0);
  const carritoId = carrito.carrito.id || JSON.stringify(localStorage.getItem("carritoId"));

  useEffect(() => {
    dispatch(fetchCarritoByUserEmail(userEmail)); 
  }, [dispatch, userEmail])

  useEffect(() => {
    if (carrito && carrito.carrito.productos) {
      setCantidades(carrito.carrito.productos.map((producto) => producto.cantidad));
      setTotalGlobal(carrito.carrito.total);
    }
  }, [carrito]);


  const comprarDeshabilitado = productos.length === 0;

  // const handleCantidadChange = (index, nuevaCantidad) => {
  //   const nuevasCantidades = [...cantidades];
  //   nuevasCantidades[index] = nuevaCantidad;
  //   setCantidades(nuevasCantidades);
  // };

  const handleCantidadChange = async (index, nuevaCantidad) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = nuevaCantidad;
    setCantidades(nuevasCantidades);

    const producto = productos[index];
    const cantidadDiff = nuevaCantidad - producto.cantidad;

    if (cantidadDiff !== 0) {
      await dispatch(substractFromCarrito({
        carritoId: carritoId,
        productoId: producto.producto.id,
        cantidad: cantidadDiff
      }));
    }
  };

  const handleComprar = async () => {
    const arrayProductos = []
    productos.forEach(nodo => {
      arrayProductos.push({productoId: nodo.producto.id, cantidad: nodo.cantidad, precio: nodo.producto.precioConDescuento})
    })
    await dispatch(comprar({ email: userEmail, total: carrito.carrito.total, compraProductos: arrayProductos}))
    await dispatch(emptyCarrito(carrito.carrito.id));
    alert("Compra exitosa");
    navigate("/");
  };

  const handleEliminarDelCarrito = async (idProducto) => {
    if (carrito.carrito.id) { 
      dispatch(removeFromCarrito({ carritoId: carrito.carrito.id, productoId: idProducto }));
      alert("Has eliminado el producto seleccionado.");
    } else {
      console.error("El ID del carrito no está definido correctamente.");
    }
  };

  useEffect(() => {
    const nuevoTotal = productos.reduce((acc, producto, index) => {
      return acc + (producto.producto.precio * cantidades[index]);
    }, 0);
    setTotalGlobal(nuevoTotal);
  }, [cantidades, productos]);




  useEffect(() => {
    if (carritoId) {
      localStorage.setItem("carritoId", JSON.stringify(carritoId));
    }
  }, [carritoId]);


  return (
    <div className='text-black p-5 bg-[#f3f4f6]'>
      <h1>Carrito de compras</h1>
      <div className='grid grid-cols-2 gap-2 h-full'>
        <div className='flex flex-col w-full h-full gap-3 justify-center py-5'>
          {productos.length > 0 ? (
            productos.map((nodo, index) => (
              <CartItemCard
                key={nodo.producto.id}
                producto={nodo.producto}
                cantidad={cantidades[index]}
                onCantidadChange={(cantidad) => handleCantidadChange(index, cantidad)}
                onEliminarDelCarrito={() => handleEliminarDelCarrito(nodo.producto.id)}
              />
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
        <div className='py-5 text-white flex flex-col px-2 border-l border-slate-300 h-full'>
          <span className='font-bold text-black'>Información del carrito</span>
          <span className='font-normal text-black'>Total estimado: <span className='text-black'>${totalGlobal.toFixed(2)}</span></span>
          <button onClick={handleComprar} disabled={comprarDeshabilitado} className='p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center'>Comprar</button>
        </div>
      </div>
    </div>
  );
};