import React from 'react';
import { useState,useEffect} from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import {AltaProductoButton} from '../Buttons/AltaProductoButton';
import {EliminarProductoButton} from  '../Buttons/EliminarProductoButton';
import IncrementarStockButton from '../Buttons/IncrementarStockButton';
import DecrementarStockButton from '../Buttons/DecrementarStockButton';
import SubirFotoProductoButton from '../Buttons/SubirFotoProductoButton';
import {getProductos,altaProdcuto,eliminarProducto} from '../Services/productosService';


export const GestionProductoCard = () => {

    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();
    const [categoria, setCategoria] = useState();
    const [imagen, setImagen] = useState();
    const [descripcion, setDescripcion] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState();    
    const [producto, setProductos] = useState([]);
    const [isAltaProductoButtonEnabled, setAltaProductoButtonEnabled] = useState(true); 
    const [isEliminarProductoButtonEnabled, setEliminarProductoButtonEnabled] = useState(false);
    const navegate = useNavigate();

    useEffect( () => { getProductos().then((data) => setProductos(data)); }, [] ) 

    const handleRemoveProducto = (id) => {
        eliminarProducto(id);
        navegate("/GestionProdutos");
    }

    const handleAltaProducto = () => {
        altaProdcuto(id,titulo,categoria,imagen,descripcion,precio,cantidad);
        navegate("/GestionProdutos");
    }

    
    return(
        <div>
            <legend>Productos</legend>
            <form> 
                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label">ID</label>
                        <input className="form_Gestion_Producto_input" type="number" id="id_Producto" value={id} placeholder="ID" onChange={e => setId(e.target.value)}></input>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label">TITULO</label>
                        <input className="form_Gestion_Producto_input" type="text" id="titulo_Producto" value={titulo} placeholder="TITULO" onChange={e => setTitulo(e.target.value)}></input>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label">CATEGORIA</label>
                        <input className="form_Gestion_Producto_input" type="text" id="categoria_Producto" value={categoria} placeholder="CATEGORIA" onChange={e => setCategoria(e.target.value)}></input>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label">IMAGEN</label>
                        <input className="form_Gestion_Producto_input" type="text" id="imagen_Producto" value={imagen} placeholder="IMAGEN" onChange={e => setImagen(e.target.value)}></input>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label">DESCRIPCION</label>
                        <input className="form_Gestion_Producto_input" type="text" id="descripcion_Producto" value={descripcion} placeholder="DESCRIPCION" onChange={e => setDescripcion(e.target.value)}></input>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label">PRECIO</label>
                        <input className="form_Gestion_Producto_input" type="number" id="precio_Producto" value={precio} placeholder="PRECIO" onChange={e => setPrecio(e.target.value)}></input>
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label">CANTIDAD</label>
                        <input className="form_Gestion_Producto_input" type="number" id="cantidad_Producto" value={cantidad} placeholder="CANTIDAD" onChange={e => setCantidad(e.target.value)}></input>
                </div>
                <br/>
            {isAltaProductoButtonEnabled && <AltaProductoButton onClick={handleAltaProducto}></AltaProductoButton>}
            

            <ol>
            {producto?.map((producto, index) => <li key={index}> <Link to={producto.titulo}> {producto.titulo}</Link></li>)}
{/* /*
// {/* <Link onClick={() => {setAltaProductoButtonEnabled(false)}} to={producto.titulo}>     {producto.titulo}    </Link>  */}
   {/*isEliminarProductoButtonEnabled && <button type="button" onClick={() => handleRemoveProducto(producto.id)} className="Gestion_Producto_Borrar">Eliminar Producto</button>}  */}
{/*isEliminarProductoButtonEnabled && <EliminarProductoButton handleclick={handleRemoveProducto(producto.id)}></EliminarProductoButton>}  */}
            </ol>
            <Outlet></Outlet>
            {isAltaProductoButtonEnabled && <button className='btn_eliminar_Producto' role="button" onClick={() => setEliminarProductoButtonEnabled(true)}>Eliminar Producto</button>}
            </form>
        </div>
    )

};
    // const incrementarStock = () => {
    //    const nuevaCantidadStock = producto.cantidad + 1;
    //    estadoCantidadProducto(nuevaCantidadStock)
    // };
    
    // const decrementarStock = () => {
    //  if(producto.cantidad === 0){
    //     return;
    //  }else{
    //     const nuevaCantidadStock = producto.cantidad - 1;
    //     estadoCantidadProducto(nuevaCantidadStock)
    //  }
    // };
 

    // return(
    //     <div className="Gestion_Productos">
    //         <label for="Gestion_Productos"><span className="icon-lock">Stock</span></label>
    //         <div className='Gestion_Productos-1'>
    //                 <IncrementarStockBoton Incrementar={incrementarStock} />
    //                 <span className='Gestion_Productos-2'>{producto.cantidad}</span>
    //                 <DecrementarStockBoton Decrementar={decrementarStock} />
    //         </div>
    //     </div>
    // );
