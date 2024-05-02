import React from 'react';
import { useState,useEffect,useId} from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import {AltaProductoButton} from '../Buttons/AltaProductoButton';
import {EliminarProductoButton} from  '../Buttons/EliminarProductoButton';
import {getProductos,altaProdcuto,eliminarProducto} from '../Services/productosService';


export const GestionProductoCard = () => {

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
        // eliminarProducto(id);
        // navegate("/GestionProdutos");
    }

    const handleAltaProducto = () => {
        altaProdcuto(id,titulo,categoria,imagen_1,imagen_2,descripcion,precio,cantidad);
        navegate("/GestionProdutos");
    }

    
    return(
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
                        <label className="form_Gestion_Producto_label"> : CATEGORIA</label>
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
                <Link onClick={() => {setAltaProductoButtonEnabled(false)}} id={producto.id} titulo={producto.titulo} cantidad={producto.cantidad} 
                index={index} handleRemoveProducto={handleRemoveProducto}>
                ID: {producto.id} | {producto.titulo}  | Cantidad: <button> - </button> {producto.cantidad}  |  
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
