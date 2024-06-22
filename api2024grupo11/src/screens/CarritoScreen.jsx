// import React, { useEffect, useState } from 'react';
// import { PageTitle } from '../components/Titles/PageTitle';
// import { CartItemCard } from '../components/Cards/CartItemCard';
// import { getCarrito, eliminarItemDelCarrito, vaciarCarrito } from '../Services/carritoService';
// import { useNavigate } from 'react-router-dom';
// import ProductoService from '../Services/productosService';

// export const CarritoScreen = () => {

//   const navigate = useNavigate(); 
//   const [productos, setProductos] = useState([]);
//   const [cantidades, setCantidades] = useState([]); 

//   useEffect(() => {
//     getCarrito()
//     .then((data)=> {
//       setProductos(data);
//       setCantidades(data.map(d => d.cantidad));
//     });
//   }, []);


//   const comprarDeshabilitado = productos.length === 0;

//   const handleCantidadChange = (index, nuevaCantidad) => {
//     const nuevasCantidades = [...cantidades];
//     nuevasCantidades[index] = nuevaCantidad;
//     setCantidades(nuevasCantidades);
//   };

//   // chequear stock elimina mal
//   const handleComprar = () => {
//     const arrayIds = productos.map(objeto => objeto.id);
//     productos.forEach((producto, index) => {
//       decrementarCantidadEnN(producto, cantidades[index]);
//     });
//     vaciarCarrito(arrayIds)
//     alert("Compra exitosa");
//     navigate("/")
//   };

//   const handleEliminarDelCarrito = (id) => {
//     eliminarItemDelCarrito(id)
//     const productosNoEliminados = productos.filter(producto => producto.id !== id);
//     setProductos(productosNoEliminados);
//     alert("Has eliminado el producto seleccionado.")
//   }

//   const totalEstimado = productos.reduce((total, producto, index) => {
//     return total + (cantidades[index] * producto.precio);
//   }, 0);

//   return (
//     <div className='text-black p-5'>
//       <PageTitle text="Carrito de Compras"/>
//       <div className='grid grid-cols-2 gap-2 h-full'>
//         <div className='flex flex-col w-full h-full gap-3 justify-center py-5'>
//           {productos.map((producto, index) => (
//             <CartItemCard
//               key={producto.id}
//               producto={producto}
//               cantidad={cantidades[index]}
//               onCantidadChange={(cantidad) => handleCantidadChange(index, cantidad)}
//               onEliminarDelCarrito={(key) => handleEliminarDelCarrito(key)}
//             />
//           ))}
//         </div>
//         <div className='py-5 text-white flex flex-col px-2 border-l border-slate-300 h-full'>
//           <span className='font-bold'>Información del carrito</span>
//           <span className='font-normal'>Total estimado: <span className='text-black'>${totalEstimado}</span></span>
//           <button onClick={handleComprar} disabled={comprarDeshabilitado} className='p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center'>Comprar</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CarritoScreen;