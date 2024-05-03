import React from 'react'
import {useState,useEffect} from 'react';
import {Outlet, useNavigate } from "react-router-dom";
import { getCategoria} from '../components/Services/categoriaService';
import {getProductos,altaProdcuto,eliminarProducto} from '../components/Services/productosService';
import {AltaProductoButton} from '../components/Buttons/AltaProductoButton';
import {EliminarProductoButton} from  '../components/Buttons/EliminarProductoButton';

import {IncrementarStockButton} from '../components/Buttons/IncrementarStockButton';
import DecrementarStockButton from '../components/Buttons/DecrementarStockButton';
import {GestionProductoCard} from '../components/Cards/GestionProductoCard';


export const GestionProductoScreen = () => {

    //Variables 
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();
    const [categoria, setCategoria] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [imagen_1, setImagen_1] = useState('');
    const [imagen_2, setImagen_2] = useState('');
    const [descripcion, setDescripcion] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState();   
    const [producto, setProductos] = useState([]);
    const navegate = useNavigate();
    

    /////////////// Bloque de  los llamados al JSON (features base de datos) ///////////////////
    
    ///Hook Json Categorias
    useEffect(() => { getCategoria().then((data) => setCategoria(data));},[]); 

    //Hook Json Productos
    useEffect(() => { getProductos().then((data) => setProductos(data));},[]); 

    ///////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////// Bloque de  los handlers /////////////////////////////////

    //Handles setID
    const handleSetID = event => {
        setId(event.target.value);
    }

    //Handles setTitulo
    const handleSetTitulo = event => {
        setTitulo(event.target.value);
    }

    //Handles Selecciona categoria
    const handleCategoriaSeleccionadaChange = event => {
        setCategoriaSeleccionada(event.target.value);
    }

    // Handles para capturar la img del producto 1 que subiremos al json.
    const handleFileFotoChange_1 = (e) => {
        const file = e.target.files[0];
        if (file) {
            //read the file as data url
            const reader = new FileReader();
            reader.onload = () => {
                setImagen_1(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handles para capturar la img del producto 2 que subiremos al json.
    const handleFileFotoChange_2 = (e) => {
        const file = e.target.files[0];
        if (file) {
            //read the file as data url
            const reader = new FileReader();
            reader.onload = () => {
                setImagen_2(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //Handles setDescripcion
    const handleSetDescripcion = event => {
        setDescripcion(event.target.value);
    }

    //Handles setPrecio
    const handleSetPrecio = event => {
        setPrecio(event.target.value);
    }       
        
    //Handles setCantidad
    const handleSetCantidad = event => {
        setCantidad(event.target.value);
    }

    //Handles ALTA productos
    const handleAltaProducto = () => {
        altaProdcuto(id,titulo,categoria,imagen_1,imagen_2,descripcion,precio,cantidad);
        navegate("/GestionProdutos");
    };

    //Handles DELETE productos
    const handleRemoveProducto = (id) => {

        eliminarProducto(id);
        const newStock = producto.filter(producto => producto.id !== id);
        setProductos(newStock);
        alert("Has eliminado el producto seleccionado.")
        navegate("/GestionProdutos");
    };





    // //    const estadoCantidadProducto = (index, nuevaCantidadStock) => {
    // //      const nuevoStockProducto = [...productos];
    // //      nuevoStockProducto[index].cantidad = nuevaCantidadStock;
    // //      setProductos(nuevoStockProducto);
    // //    };

    const handleIncrementarStock_OG = ({producto, onStockChange}) => {
        const newCantidadStock = producto.cantidad + 1;
        onStockChange(newCantidadStock);
    };

        const handleIncrementarStock = (index, stock) => {
            const nuevoStock = [...producto];
            nuevoStock[index].cantidad = stock;
            setCantidad(nuevoStock);
        };

return (

<div className="Gestion_de_Productos_Screen">
    <div class="navbar navbar-clear"> <div class="navbar-inner"> <div class="center sliding"></div></div> </div>

    <div class="pages navbar-fixed toolbar-fixed">
        <div data-page="Productos" class="page">
            <div class="page-content">


    <div class="nice-header header-fix-top small"> <div class="logo">
        <h1>Gestion de Productos</h1>
        <hr></hr>
        <h5>En este espacio vas a poder dar de alta tus productos. Ademas podras realizar modificaciones en cuanto al stock que quieras vender o eliminarlos.</h5>
        </div>
    </div>
    <hr></hr>

    <div className="Gestion_de_Productos_Form">
            <legend>Productos</legend>
            <form> 
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="id_Producto" value={id} placeholder="ID" onChange={handleSetID}></input>
                        <label className="form_Gestion_Producto_label"> : ID</label>
                </div>

                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="text" id="titulo_Producto" value={titulo} placeholder="TITULO" onChange={handleSetTitulo}></input>
                        <label className="form_Gestion_Producto_label"> : TITULO</label>
                </div>

                <div className="form_Gestion_Producto_group">
                    <input className="form_Gestion_Producto_input" type="text" id="categoria_Producto" value={categoriaSeleccionada} placeholder="SELECCIONE CATEGORIA" readOnly></input>
                    <label className="form_Gestion_Producto_label"> : CATEGORIA </label>
                    <select className="form_Gestion_Producto_input" id="Selector_categoria_dropdown" value={categoriaSeleccionada} onChange={handleCategoriaSeleccionadaChange}>
                        <option value=""> Seleccione </option>
                        {categoria.map((categoria, index) => (
                            <option key={index} value={categoria.descripcion}>{categoria.descripcion} </option>
                        ))}
                    </select>
                        
                </div>
                <br/>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label"> IMAGEN 1:  </label>
                    <input className="form_Gestion_Producto_input" type="file" id="imagen_Producto_1" onChange={handleFileFotoChange_1} accept="image/jpeg,image/png" data-testid="fileInput"  ></input>                   
                </div>

                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label"> IMAGEN 2:  </label>
                    <input className="form_Gestion_Producto_input" type="file" id="imagen_Producto_2" onChange={handleFileFotoChange_2} accept="image/jpeg,image/png" data-testid="fileInput"  ></input>                   
                </div>

                <br/>
            
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="text" id="descripcion_Producto" value={descripcion} placeholder="DESCRIPCION" onChange={handleSetDescripcion}></input>
                        <label className="form_Gestion_Producto_label"> : DESCRIPCION</label>
                </div>

                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="precio_Producto" value={precio} placeholder="PRECIO" onChange={handleSetPrecio}></input>
                        <label className="form_Gestion_Producto_label"> : PRECIO</label>
                </div>

                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="cantidad_Producto" value={cantidad} placeholder="CANTIDAD" onChange={handleSetCantidad}></input>
                        <label className="form_Gestion_Producto_label"> : CANTIDAD</label>
                </div>
                <br/>
                
            <AltaProductoButton handleClickAltaProducto={handleAltaProducto}></AltaProductoButton>
            <hr></hr>

            <legend>Stock actual de tus Productos</legend>         
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Imagen 1</th>
                        <th>Imagen 2</th>
                        <th>Opcion</th>
                    </tr>
                </thead>
                <tbody>
                {producto?.map((producto, index) => (
                    <tr key={index}>
                        <td>{producto.id}</td>
                        <td>{producto.titulo}</td>
                        <td>
                            <button>-</button>
                            {producto.cantidad}
                            <IncrementarStockButton handleClickIncrementarStock={() => handleIncrementarStock(index, producto, setCantidad)} />
                        </td>
                        <td>{producto.imagen_1 && (<img src={producto.imagen_1} alt="Uploaded" style={{ maxWidth: '75px' }} />)}</td>
                        <td>{producto.imagen_2 && (<img src={producto.imagen_2} alt="Uploaded" style={{ maxWidth: '75px' }} />)}</td>
                        <td>
                            <EliminarProductoButton productId={producto.id} handleClickEliminarProducto={handleRemoveProducto}></EliminarProductoButton>
                        </td>
                    </tr>
                ))}
                </tbody> 
            </table>
            <Outlet></Outlet>
            </form>
        </div>
        </div> 
        </div>
        </div>
        </div> 
    );
};