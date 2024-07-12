import { default as React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Filters } from "../components/Filters/Filters";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { addToCarrito, fetchCarritoByUserId } from '../Redux/CarritoSlice';
import { fetchCategorias } from '../Redux/CategoriaSlice';
import { fetchDescuentos } from '../Redux/DescuentoSlice';
import { agregarItemAFavoritosLocalmente } from "../Redux/FavoritoSlice";
import { fetchProductos, filterProductos } from '../Redux/ProductoSlice';

export const ComprarScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productos = useSelector((state) => state.producto.productos);
    const categorias = useSelector((state) => state.categoria.categorias);
    const descuentos = useSelector((state) => state.descuento.descuentos);
    const carrito = useSelector((state) => state.carrito.carrito);
    const usuario = useSelector((state) => state.usuario.usuario);

    
    
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroDescuento, setFiltroDescuento] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
      dispatch(fetchProductos());
      dispatch(fetchCategorias());
      dispatch(fetchDescuentos());
      if (usuario) {
        dispatch(fetchCarritoByUserId(usuario.id));
      }
    }, [dispatch, usuario]);
  
    useEffect(() => {
      setFilteredProductos(productos);
    }, [productos]);

    useEffect(() => {
      const fetchFilteredProductos = async () => {
        const response = await dispatch(filterProductos({ searchTerm, filtroCategoria, filtroDescuento }));
        console.log(response);
        setFilteredProductos(response.payload);
      };
  
      fetchFilteredProductos();
    }, [searchTerm, filtroCategoria, filtroDescuento, dispatch]);



    const handleAgregarAlCarrito = (producto) => {
      console.log("Agregar al carrito clicked", producto);
    
      if (!usuario) {
        navigate('/usuarios');
        return;
      }
      
      if (!carrito || !carrito.id) {
        alert("No se pudo agregar el producto al carrito. Intente nuevamente.");
        return;
      }
      
      if (producto.cantidad === 0) {
        alert("No hay stock del producto. Intente más tarde o con otro producto.");
        return;
      }
      
      const item = { productoId: producto.id, cantidad: 1 };
      console.log("Datos enviados al carrito:", { carritoId: carrito.id, item });
    
      dispatch(addToCarrito({ carritoId: carrito.id, item }))
        .then((response) => {
          console.log("Respuesta del servidor:", response);
          alert("Item agregado al carrito");
        })
        .catch((error) => {
          console.error('Error al agregar producto al carrito:', error);
          alert("Hubo un error al agregar el producto al carrito. Intente nuevamente.");
        });
    };
    

    const handleAgregarAFavoritos = (producto) => {
      if (!usuario) {
        navigate('/usuarios');
        return;
      }
  
      dispatch(agregarItemAFavoritosLocalmente(producto));
      alert("Producto agregado a favoritos");
    };
  
    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  
    const handleFilterChange = (filtro, value) => {
      if (filtro === 'categoria') {
        setFiltroCategoria(value);
      } else if (filtro === 'descuento') {
        setFiltroDescuento(value);
      }
    };
  
    const handleSelectProduct = (producto) => {
      setSelectedProduct(producto);
    };

  
  return (
    <div className="comprarscreen">
        <div className="text-black bold p-5">
          <h1>¿Qué desea comprar?</h1>
        </div>
        <SearchBar onSearch={handleSearch} />
        <Filters
          categorias={categorias}
          descuentos={descuentos}
          onFilter={handleFilterChange}
        />
        {/* <div className="contenedor-productos">
          {filterProductos.length>0 && filteredProductos.map((producto, index) => (
            <div key={index} onClick={() => handleSelectProduct(producto)}>
              <ProductDo
                value={producto}
                agregarAlCarrito={() => {
                  console.log("Agregar al carrito clicked", producto);
                  handleAgregarAlCarrito(producto);
                }}
                agregarAFavoritos={() => handleAgregarAFavoritos(producto)}
              />
            </div>
          ))}
        </div> */}
      </div>
    );
  };