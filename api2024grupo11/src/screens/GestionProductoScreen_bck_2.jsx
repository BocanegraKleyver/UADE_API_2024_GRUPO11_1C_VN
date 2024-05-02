// import React from 'react'
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { GestionProductoCard } from '../components/Cards/GestionProductoCard';

// export const GestionProductoScreen = () => {

//     //    const estadoCantidadProducto = (index, nuevaCantidadStock) => {
//     //      const nuevoStockProducto = [...productos];
//     //      nuevoStockProducto[index].cantidad = nuevaCantidadStock;
//     //      setProductos(nuevoStockProducto);
//     //    };

//     //   const eliminarProducto = () => {
//     //     alert("Producto eliminado")
//     //   }

//     // const [id, setId] = useState();
//     // const [titulo, setTitulo] = useState();
//     // const [categoria, setCategoria] = useState();
//     // const [imagen_1, setImagen_1] = useState();
//     // const [imagen_2, setImagen_2] = useState();
//     // const [descripcion, setDescripcion] = useState();
//     // const [precio, setPrecio] = useState();
//     // const [cantidad, setCantidad] = useState();    
//     // const [producto, setProductos] = useState([]);
//     // const [isAltaProductoButtonEnabled, setAltaProductoButtonEnabled] = useState(true); 
//     // // const [isEliminarProductoButtonEnabled, setEliminarProductoButtonEnabled] = useState(false);
//     // const navegate = useNavigate();

//     // useEffect( () => { getProductos().then((data) => setProductos(data)); }, [] ) 

//     // const handleRemoveProducto = (id) => {
//     //     const newStock = [...producto];
//     //     newStock.splice(id,1);
//     //     setProductos(newStock);
//     //     alert("Has eliminado el producto seleccionado.")
//     //     // navegate("/GestionProdutos");
//     // }

//     // const handleAltaProducto = () => {
//     //     altaProdcuto(id,titulo,categoria,imagen_1,imagen_2,descripcion,precio,cantidad);
//     //     navegate("/GestionProdutos");
//     // }

//     // const handleIncrementarStock_OG = ({producto, onStockChange}) => {
//     //     const newCantidadStock = producto.cantidad + 1;
//     //     onStockChange(newCantidadStock);
//     // }

//     //     const handleIncrementarStock = (index, stock) => {
//     //         const nuevoStock = [...producto];
//     //         nuevoStock[index].cantidad = stock;
//     //         setCantidad(nuevoStock);
//     //     }

// return (

// <div className="Gestion_de_Productos_Screen">
//     <div class="navbar navbar-clear"> <div class="navbar-inner"> <div class="center sliding"></div></div> </div>

//     <div class="pages navbar-fixed toolbar-fixed">
//         <div data-page="Productos" class="page">
//             <div class="page-content">


//     <div class="nice-header header-fix-top small"> <div class="logo">
//         <h1>Gestion de Productos</h1>
//         <h4>En este espacio vas a poder subir los productos que necesites vender. Tambien vas a poder modificar el stock y eliminar.</h4>
//         </div>
//     </div>
//     <hr></hr>
//     <div className='flex flex-col w-full h-full gap-3 justify-center py-5'>

//             { producto?.map((producto,index ) => (
//                 <GestionProductoCard
//                 key={index}                 
//                 id={producto.id} 
//                 titulo={producto.titulo} 
//                 cantidad={producto.cantidad} 
//                 index={index} 
//                 >
//                 ID: {producto.id} | {producto.titulo}  | Cantidad: <button> - </button> {producto.cantidad}  |  
//                 </GestionProductoCard>
//             ))}

//         </div>
//   </div>
//         </div> 
//         </div>
//         </div>

//     );
// };









//             {/* <div class="login-view-box mt-50">
//                 <div class="list login-form-box">
//                     <form name="formIniciar" action="#" method="POST" enctype="multipart/form-data" autocomplete="off" id="formIniciar" class="form nice-label">
                        
                    
//                         <div class="form-row">
                        
//                             <label for="nombre"><span class="icon-man"></span></label>
                            
//                             <input type="text" id="nombre" name="nombre" placeholder="Nombre del Producto"></input>
                            
//                         </div>
                        
//                         <label class="error" for="nombre"></label>
                        

//                         <div class="form-row">
//                             <label for="descripcion"><span class="icon-lock"></span></label>
//                             <input type="descripcion" id="descripcion" name="descripcion" placeholder="Descripcion del Producto"></input>
//                         </div>
//                         <label class="error" for="descripcion"></label>

//                         <div class="form-row">
//                             <label for="categoria"><span class="icon-lock"></span></label>
//                             <input type="categoria" id="categoria" name="categoria" placeholder="Categoria del Producto"></input>
//                         </div>
//                         <label class="error" for="categoria"></label>

//                         <div class="form-row">
//                             <label for="precio"><span class="icon-lock"></span></label>
//                             <input type="precio" id="precio" name="precio" placeholder="Precio del Producto"></input>
//                         </div>
//                         <label class="error" for="precio"></label>                      

//                         <div class="form-row">
//                             <label for="foto"><span class="icon-lock"></span></label>
//                             <input type="foto" id="foto" name="foto" placeholder="Foto elegida"></input>
//                             <hr></hr>
//                             <div class="input-submit">
//                               <button type="submit" id="Button_subir_foto">Subir Foto del Producto</button>
//                             </div>
//                         </div>
//                         <label class="error" for="foto"></label>    

//                         <div class="form-row">
//                             <div class="input-submit">
//                               <button type="submit" id="Button_alta_producto">Dar de alta Producto</button>
//                             </div>
//                         </div>
//                         <hr></hr>

//                         {/* <div className='Gestionar_Productos-6'>
//                         {productos.map((producto, index) => (
//                            <GestionProductoCard key={index} producto={producto} estadoCantidadProducto={(nuevaCantidad) => estadoCantidadProducto(index, nuevaCantidad)}/>
//                            )
//                          )
//                         }
//                          <button onClick={eliminarProducto} className='Gestionar_Productos-7'>Eliminar Producto</button>
//                         </div> */}

       
