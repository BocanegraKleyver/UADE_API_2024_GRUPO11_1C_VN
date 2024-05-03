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
import { getCategoria} from '../components/Services/categoriaService';
import { UploadFotoProductoButton } from '../components/Buttons/UploadFotoProductoButton';

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


 





 
    const [isAltaProductoButtonEnabled, setAltaProductoButtonEnabled] = useState(true); 
    // const [isEliminarProductoButtonEnabled, setEliminarProductoButtonEnabled] = useState(false);
    const navegate = useNavigate();






    // const handleSubmitFoto_1 =() => {
    //     // Add the uploaded image to the producto state
    //     setProductos([...producto, {imagen_1}]);
    // };

    // const handleSubmitFoto_2 =() => {
    //     // Add the uploaded image to the producto state
    //     setProductos([...producto, {imagen_2}]);
    // };



    // //    const estadoCantidadProducto = (index, nuevaCantidadStock) => {
    // //      const nuevoStockProducto = [...productos];
    // //      nuevoStockProducto[index].cantidad = nuevaCantidadStock;
    // //      setProductos(nuevoStockProducto);
    // //    };

    // //   const eliminarProducto = () => {
    // //     alert("Producto eliminado")
    // //   }



    const handleRemoveProducto = (id) => {
        const newStock = [...producto];
        newStock.splice(id,1);
        setProductos(newStock);
        alert("Has eliminado el producto seleccionado.")
        // navegate("/GestionProdutos");
    };

    const handleAltaProducto = () => {
        altaProdcuto(id,titulo,categoria,imagen_1,imagen_2,descripcion,precio,cantidad);
        navegate("/GestionProdutos");
    };

    const handleIncrementarStock_OG = ({producto, onStockChange}) => {
        const newCantidadStock = producto.cantidad + 1;
        onStockChange(newCantidadStock);
    };

        const handleIncrementarStock = (index, stock) => {
            const nuevoStock = [...producto];
            nuevoStock[index].cantidad = stock;
            setCantidad(nuevoStock);
        };


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
                
            {isAltaProductoButtonEnabled  && <AltaProductoButton handleClickAltaProducto={handleAltaProducto}></AltaProductoButton>}
            {/* {<UploadFotoProductoButton handleClickUploadFotoProducto={handleSubmitFoto}></UploadFotoProductoButton>}  */}
            <hr></hr>
            <legend>Stock De Productos</legend>         
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Imagen 1</th>
                        <th>Imagen 2</th>
                        <th>Acciones</th>
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
                            <button type="button" onClick={() => handleRemoveProducto(producto.id)}>Eliminar Producto</button>
                        </td>
                    </tr>
                        )
                    )
                }
                </tbody>
            </table>    


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

       
