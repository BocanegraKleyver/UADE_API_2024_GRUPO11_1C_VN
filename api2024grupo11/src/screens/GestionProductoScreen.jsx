import React from 'react';
import {useState,useEffect} from 'react';
import {Outlet, useNavigate } from "react-router-dom";
import { getCategoria} from '../Services/categoriaService';
import CategoriaService from '../Services/categoriaService';
import {getProductos,altaProdcuto,eliminarProducto, aumentarCantidad, decrementarCantidad} from '../Services/productosService';
import {AltaProductoButton} from '../components/Buttons/AltaProductoButton';
import {EliminarProductoButton} from  '../components/Buttons/EliminarProductoButton';
import {IncrementarStockButton} from '../components/Buttons/IncrementarStockButton';
import {DecrementarStockButton} from '../components/Buttons/DecrementarStockButton';
 
 
export const GestionProductoScreen = () => {
    ///////////////////////////////////// Variables /////////////////////////////////////////////

    const [id, setId] = useState();
    const [titulo, setTitulo] = useState();
    const [categoria, setCategoria] = useState('');
    // const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [imagen_1, setImagen_1] = useState('');
    const [imagen_2, setImagen_2] = useState('');
    const [descripcion, setDescripcion] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState();  
    const [producto, setProductos] = useState([]);
    const navigate = useNavigate();
    const itemsCategoria = ["jardin","comedor","Gamer"];
 
    /////////////// Bloque de  los llamados al JSON (features base de datos) ///////////////////
   
    ///Hook Json Categorias
    // useEffect(() => { getCategoria().then((data) => setCategoria(data));},[]);
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await CategoriaService.getAllCategorias(); // Usa el método correcto del servicio
                setCategoria(data);
            } catch (error) {
                console.error('Error al cargar las categorías:', error.message);
            }
        };

        fetchCategorias();
    }, []);
    //Hook Json Productos
    // useEffect(() => { getProductos().then((data) => setProductos(data));},[]);
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await CategoriaService.getProductos(); // Asumiendo que hay un método getProductos en tu servicio de productos
                setProductos(data);
            } catch (error) {
                console.error('Error al cargar los productos:', error.message);
            }
        };

        fetchProductos();
    }, []);
    ///////////////////////////////////////////////////////////////////////////////////////////
 
    ///////////////////////////////// Bloque de  los handlers /////////////////////////////////
 
    //Handles setID
    const handleSetID = event => {
        setId(event.target.value);
    };
 
    //Handles setTitulo
    const handleSetTitulo = event => {
        setTitulo(event.target.value);
    };
 
    // //Handles Selecciona categoria para cuando usemos backend
    // const handleCategoriaSeleccionadaChange = event => {
    //     setCategoriaSeleccionada(event.target.value);
    // };
 
    const handleSetCategoria = event => {
        setCategoria(event.target.value);
    };
 
 
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
    };
   
    //Handles setPrecio
    const handleSetPrecio = event => {
        setPrecio(event.target.value);
    };      
       
    //Handles setCantidad
    const handleSetCantidad = event => {
        setCantidad(event.target.value);
    };
 
    //Handles ALTA productos
    const handleAltaProducto = () => {
        altaProdcuto(id,titulo,categoria,imagen_1,imagen_2,descripcion,precio,cantidad);
        navigate("/gestionProductos");
    };
 
    //Handles DELETE productos
    const handleRemoveProducto = (id) => {
 
        eliminarProducto(id);
        const nuevoStock = producto.filter(producto => producto.id !== id);
        setProductos(nuevoStock);
        alert("Has eliminado el producto seleccionado.")
        navigate("/gestionProductos");
    };
 
    //Handles Incrementar Stock del  producto
    const handleIncrementarStock = (id) => {
        const productoIncrementado = producto.find(producto => producto.id === id);
 
        if (productoIncrementado) {
           const nuevaCantidad = productoIncrementado.cantidad++;
           setProductos(prevProductos => prevProductos.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item));
 
        aumentarCantidad(id, nuevaCantidad)
        .then((response) => {
            console.log("Cantidad actualizada:", response);
        })
        .catch((error) => {
            console.error("Error al actualizar la cantidad:", error);
        });
        }  else {
            console.error("Producto no encontrado");
        }  
    };

    
 
    //Handles Decrementar Stock del  producto
    const handleDecrementarStock = (id) => {

        const productoDecrementado = producto.find(producto => producto.id === id);

        if (productoDecrementado) {

            const nuevaCantidad = productoDecrementado.cantidad--;

            if (nuevaCantidad === 0) {
                return;
            }

            setProductos(prevProductos => prevProductos.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item));

        decrementarCantidad(id, nuevaCantidad)
        .then((response) => {
            console.log("Cantidad actualizada:", response);
        })
        .catch((error) => {
            console.error("Error al actualizar la cantidad:", error);
        });
        }  else {
            console.error("Producto no encontrado");
        }  
    };
 
 
return (
 
<div className="Gestion_de_Productos_Screen">
    <div class="navbar navbar-clear"> <div class="navbar-inner"> <div class="center sliding"></div></div> </div>
 
    <div class="pages navbar-fixed toolbar-fixed">
        <div data-page="Productos" class="page">
            <div class="page-content">
 
 
    <div class="nice-header header-fix-top small"> <div class="logo">
        <h3 class="font-bold text-2xl">Gestión de Productos</h3>
        <hr></hr>
        <h3 class="nice-header header-fix-top small">En este espacio vas a poder dar de alta tus productos. Además, podrás realizar modificaciones en cuanto al stock que quieras vender o eliminarlos</h3>
        </div>
    </div>
    <hr></hr>
 
    <div className="Gestion_de_Productos_Form">
            {/* <legend>Productos</legend> */}
            <form>
                <br></br>
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="id_Producto" value={id} placeholder="ID" onChange={handleSetID}></input>
                        <label className="form_Gestion_Producto_label"> : ID</label>
                </div>
                <br></br>
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="text" id="titulo_Producto" value={titulo} placeholder="TITULO" onChange={handleSetTitulo}></input>
                        <label className="form_Gestion_Producto_label"> : TITULO</label>
                </div>
                <br></br>
                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label"> FOTO 1 DEL PRODUCTO:  </label>
                    <input className="form_Gestion_Producto_input" class="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center" type="file" id="imagen_Producto_1" onChange={handleFileFotoChange_1} accept="image/jpeg,image/png" data-testid="fileInput" ></input>                  
                </div>
                <br></br>
                <div className="form_Gestion_Producto_group">
                    <label className="form_Gestion_Producto_label"> FOTO 2 DEL PRODUCTO:  </label>
                    <input className="form_Gestion_Producto_input" class="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center" type="file" id="imagen_Producto_2" onChange={handleFileFotoChange_2} accept="image/jpeg,image/png" data-testid="fileInput" ></input>                  
                </div>
                <br></br>
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="text" id="descripcion_Producto" value={descripcion} placeholder="DESCRIPCION" onChange={handleSetDescripcion}></input>
                        <label className="form_Gestion_Producto_label"> : DESCRIPCION</label>
                </div>
                <br></br>
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="precio_Producto" value={precio} placeholder="PRECIO" onChange={handleSetPrecio}></input>
                        <label className="form_Gestion_Producto_label"> : PRECIO</label>
                </div>
                <br></br>
                <div className="form_Gestion_Producto_group">
                        <input className="form_Gestion_Producto_input" type="number" id="cantidad_Producto" value={cantidad} placeholder="CANTIDAD" onChange={handleSetCantidad}></input>
                        <label className="form_Gestion_Producto_label"> : CANTIDAD</label>
                </div>
                <br></br>
                <div className="form_Gestion_Producto_group">
                        <select className="form_Gestion_Producto_input" id="Selector_categoria_dropdown" value={categoria} onChange={handleSetCategoria}>
                            <option value=""> Seleccione </option>
                            {itemsCategoria.map((items, index) => (
                                <option key={index}  value={items}>{items} </option>
                            ))}
                        </select>
                        <label className="form_Gestion_Producto_label"> : CATEGORIA </label>
                </div>
                <br></br>
 
            <AltaProductoButton handleClickAltaProducto={handleAltaProducto}></AltaProductoButton>
            <br></br>
            <hr></hr>

            <h3 class="font-bold text-2xl">Stock actual de tus Productos</h3>

            <br></br>    
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Imagen 1</th>
                        <th>Imagen 2</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Opción</th>
                    </tr>
                </thead>
                <tbody>
                {producto?.map((producto, index) => (
                    <tr key={index}>
                        <td>{producto.id}</td>
                        <td>{producto.titulo}</td>
                        <td>${producto.precio}</td>
                        <td>{producto.categoria}</td>
                        <td>{producto.imagen_1 && (<img src={producto.imagen_1} alt="Uploaded" style={{ maxWidth: '75px' }} />)}</td>
                        <td>{producto.imagen_2 && (<img src={producto.imagen_2} alt="Uploaded" style={{ maxWidth: '75px' }} />)}</td>
                        <td>{producto.descripcion}</td>
                        <td>
                            <DecrementarStockButton id={producto.id} cantidad={producto.cantidad} handleDecrementarStock={handleDecrementarStock}></DecrementarStockButton>
                            {producto.cantidad}
                            <IncrementarStockButton id={producto.id} cantidad={producto.cantidad} handleIncrementarStock={handleIncrementarStock}></IncrementarStockButton>
                        </td>
                        <td>
                            <EliminarProductoButton productId={producto.id} handleClickEliminarProducto={handleRemoveProducto} ></EliminarProductoButton>
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

export default GestionProductoScreen;