import React from 'react'
import { useState,useEffect,useId} from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import {AltaProductoButton} from '../components/Buttons/AltaProductoButton';
import {EliminarProductoButton} from  '../components/Buttons/EliminarProductoButton';
import {GestionProductoCard} from '../components/Cards/GestionProductoCard';

import {IncrementarStockButton} from '../components/Buttons/IncrementarStockButton';
import DecrementarStockButton from '../components/Buttons/DecrementarStockButton';
import SubirFotoProductoButton from '../components/Buttons/SubirFotoProductoButton';
import {getProductos,altaProdcuto,eliminarProducto} from '../components/Services/productosService';

export const GestionProductoScreen = () => {

    //    const estadoCantidadProducto = (index, nuevaCantidadStock) => {
    //      const nuevoStockProducto = [...productos];
    //      nuevoStockProducto[index].cantidad = nuevaCantidadStock;
    //      setProductos(nuevoStockProducto);
    //    };

    //   const eliminarProducto = () => {
    //     alert("Producto eliminado")
    //   }

    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();
    const [categoria, setCategoria] = useState();
    const [imagen_1, setImagen_1] = useState();
    const [imagen_2, setImagen_2] = useState();
    const [descripcion, setDescripcion] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState();    
    const [producto, setProductos] = useState([]);
    const [isAltaProductoButtonEnabled, setAltaProductoButtonEnabled] = useState(true); 
    // const [isEliminarProductoButtonEnabled, setEliminarProductoButtonEnabled] = useState(false);
    const navegate = useNavigate();

    useEffect( () => { getProductos().then((data) => setProductos(data)); }, [] ) 

    const handleRemoveProducto = (id) => {
        const newStock = [...producto];
        newStock.splice(id,1);
        setProductos(newStock);
        alert("Has eliminado el producto seleccionado.")
        // navegate("/GestionProdutos");
    }

    const handleAltaProducto = () => {
        altaProdcuto(id,titulo,categoria,imagen_1,imagen_2,descripcion,precio,cantidad);
        navegate("/GestionProdutos");
    }

    const handleIncrementarStock_OG = ({producto, onStockChange}) => {
        const newCantidadStock = producto.cantidad + 1;
        onStockChange(newCantidadStock);
    }

        const handleIncrementarStock = (index, stock) => {
            const nuevoStock = [...producto];
            nuevoStock[index].cantidad = stock;
            setCantidad(nuevoStock);
        }


    const [isOpen, setIsOpen] = useState(false);
    const menuItems = ['Jardin','Comedor','Gamer'];


return (

<div className="Gestion_de_Productos_Screen">
    <div class="navbar navbar-clear"> <div class="navbar-inner"> <div class="center sliding"></div></div> </div>

    <div class="pages navbar-fixed toolbar-fixed">
        <div data-page="Productos" class="page">
            <div class="page-content">


    <div class="nice-header header-fix-top small"> <div class="logo">
        <h1>Gestion de Productos</h1>
        <h4>En este espacio vas a poder subir los productos que necesites vender. Tambien vas a poder modificar el stock y eliminar.</h4>
        </div>
    </div>
    <hr></hr>

    <div className="Gestion_de_Productos_Form">
            <legend>Productos</legend>
            <form> 
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="id_Producto" value={id} placeholder="ID" onChange={e => setId(e.target.value)}></input>
                        <label className="form_Gestion_Producto_label"> : ID</label>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="text" id="titulo_Producto" value={titulo} placeholder="TITULO" onChange={e => setTitulo(e.target.value)}></input>
                        <label className="form_Gestion_Producto_label"> : TITULO</label>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="text" id="categoria_Producto" value={categoria} placeholder="CATEGORIA" onChange={e => setCategoria(e.target.value)}></input>
                        {/* <label className="form_Gestion_Producto_label"> : CATEGORIA</label> */}
                        <button className="form_Gestion_Producto_input" type="button" onClick={() => setIsOpen(!isOpen)}>
                        Categorias
                        </button> {isOpen && (<div>
                                {menuItems.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                      
                                        </div>
                                ))}
                            </div>
                        )
                        }
                        <select id="selector_dropdown" value={menuItems.} onchange={e => setCategoria(e.target.value)}>
                        <option value={categoria} onChange={e => setCategoria(e.target.value)}></option>
                        <option value={categoria}> </option>
                        <option value={menuItems.item}>Comedor</option>
                        <option value={menuItems.item}>Gamer</option>
                        </select>
                        <label for="selector">Categoria</label>

                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                        <label className="form_Gestion_Producto_label"> IMAGEN 1:  </label>
                        <input className="form_Gestion_Producto_input" type="file" id="imagen_Producto_1" value={imagen_1} onChange={e => setImagen_1(e.target.value)} accept="image/jpeg,image/png" multiple="" tabindex="-1"  data-testid="fileInput"></input>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                        <label className="form_Gestion_Producto_label"> IMAGEN 2:  </label>
                        <input className="form_Gestion_Producto_input" type="file" id="imagen_Producto_2" value={imagen_2} onChange={e => setImagen_2(e.target.value)} accept="image/jpeg,image/png" multiple="" tabindex="-1"  data-testid="fileInput"></input>
                </div>
                <br/>


                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="text" id="descripcion_Producto" value={descripcion} placeholder="DESCRIPCION" onChange={e => setDescripcion(e.target.value)}></input>
                        <label className="form_Gestion_Producto_label"> : DESCRIPCION</label>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="precio_Producto" value={precio} placeholder="PRECIO" onChange={e => setPrecio(e.target.value)}></input>
                        <label className="form_Gestion_Producto_label"> : PRECIO</label>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="cantidad_Producto" value={cantidad} placeholder="CANTIDAD" onChange={e => setCantidad(e.target.value)}></input>
                        <label className="form_Gestion_Producto_label"> : CANTIDAD</label>
                </div>
                <br/>
           {isAltaProductoButtonEnabled  && <AltaProductoButton handleClickAltaProducto={handleAltaProducto}>  </AltaProductoButton>} 
            <br/>
            <br/>
            <legend>Stock De Productos</legend>
            <ol>
            {producto?.map((producto, index) => 
                <li key={index}>
                <Link onClick={() => {setAltaProductoButtonEnabled(false)}} id={producto.id} titulo={producto.titulo} cantidad={producto.cantidad} imagen1={producto.imagen_1} imagen2={producto.imagen_2}
                index={index} handleRemoveProducto={handleRemoveProducto} onStockChange={(stock)=> handleIncrementarStock_OG(index, stock)}>
                ID: {producto.id} | {producto.titulo}  | Cantidad: <button> - </button> {producto.cantidad} <IncrementarStockButton handleClickIncrementarStock={handleIncrementarStock}></IncrementarStockButton> | {producto.imagen_1} | {producto.imagen_2}
                </Link> 
                {<button type="button" onClick={() => handleRemoveProducto(id)}> Eliminar Producto</button>}
                {/*Cuando usemos conexion a la BD borrado fisico
                {isEliminarProductoButtonEnabled && <EliminarProductoButton handleClickEliminarProducto={handleRemoveProducto(producto.id)}></EliminarProductoButton>}*/}
                        
                </li>
            )}
            </ol>
            <Outlet></Outlet>
            {/* Cuando usemos conexion a la BD borrado fisico
            {{isAltaProductoButtonEnabled && <button className='btn_eliminar_Producto' role="button" onClick={() => setEliminarProductoButtonEnabled(true)}>BTNN_Eliminar Producto</button>}}             */}
            </form>
        </div>
        </div> 
        </div>
        </div>
        </div> 
    );
};









            {/* <div class="login-view-box mt-50">
                <div class="list login-form-box">
                    <form name="formIniciar" action="#" method="POST" enctype="multipart/form-data" autocomplete="off" id="formIniciar" class="form nice-label">
                        
                    
                        <div class="form-row">
                        
                            <label for="nombre"><span class="icon-man"></span></label>
                            
                            <input type="text" id="nombre" name="nombre" placeholder="Nombre del Producto"></input>
                            
                        </div>
                        
                        <label class="error" for="nombre"></label>
                        

                        <div class="form-row">
                            <label for="descripcion"><span class="icon-lock"></span></label>
                            <input type="descripcion" id="descripcion" name="descripcion" placeholder="Descripcion del Producto"></input>
                        </div>
                        <label class="error" for="descripcion"></label>

                        <div class="form-row">
                            <label for="categoria"><span class="icon-lock"></span></label>
                            <input type="categoria" id="categoria" name="categoria" placeholder="Categoria del Producto"></input>
                        </div>
                        <label class="error" for="categoria"></label>

                        <div class="form-row">
                            <label for="precio"><span class="icon-lock"></span></label>
                            <input type="precio" id="precio" name="precio" placeholder="Precio del Producto"></input>
                        </div>
                        <label class="error" for="precio"></label>                      

                        <div class="form-row">
                            <label for="foto"><span class="icon-lock"></span></label>
                            <input type="foto" id="foto" name="foto" placeholder="Foto elegida"></input>
                            <hr></hr>
                            <div class="input-submit">
                              <button type="submit" id="Button_subir_foto">Subir Foto del Producto</button>
                            </div>
                        </div>
                        <label class="error" for="foto"></label>    

                        <div class="form-row">
                            <div class="input-submit">
                              <button type="submit" id="Button_alta_producto">Dar de alta Producto</button>
                            </div>
                        </div>
                        <hr></hr>

                        {/* <div className='Gestionar_Productos-6'>
                        {productos.map((producto, index) => (
                           <GestionProductoCard key={index} producto={producto} estadoCantidadProducto={(nuevaCantidad) => estadoCantidadProducto(index, nuevaCantidad)}/>
                           )
                         )
                        }
                         <button onClick={eliminarProducto} className='Gestionar_Productos-7'>Eliminar Producto</button>
                        </div> */}

       
