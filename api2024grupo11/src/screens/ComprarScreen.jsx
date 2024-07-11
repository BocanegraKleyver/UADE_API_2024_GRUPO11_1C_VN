import React, { useState, useEffect } from "react";
import ProductDo from "../components/Cards/ProductDo";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Filters } from "../components/Filters/Filters";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos, filterProductos } from '../Redux/ProductoSlice';
import { fetchCategorias } from '../Redux/CategoriaSlice';
import { fetchDescuentos } from '../Redux/DescuentoSlice';
import { addToCarrito, fetchCarritoByUserId } from '../Redux/CarritoSlice';
import { agregarItemAFavoritosLocalmente } from "../Redux/FavoritoSlice";


  export const ComprarScreen = () => {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.producto.productos);
    const categorias = useSelector((state) => state.categoria.categorias);
    const descuentos = useSelector((state) => state.descuento.descuentos);
    const carrito = useSelector((state) => state.carrito.carrito);
    
    
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroDescuento, setFiltroDescuento] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
      dispatch(fetchProductos());
      dispatch(fetchCategorias());
      dispatch(fetchDescuentos());
      dispatch(fetchCarritoByUserId());
    }, [dispatch]);
  
    useEffect(() => {
      setFilteredProductos(productos);
    }, [productos]);

    useEffect(() => {
      const fetchFilteredProductos = async () => {
        const response = await dispatch(filterProductos({ searchTerm, filtroCategoria, filtroDescuento }));
        setFilteredProductos(response.payload);
      };
  
      fetchFilteredProductos();
    }, [searchTerm, filtroCategoria, filtroDescuento, dispatch]);



 const handleAgregarAlCarrito = (producto) => {
    if (!carrito || !carrito.id) {
      alert("No se pudo agregar el producto al carrito. Intente nuevamente.");
      return;
    }

    if (producto.cantidad === 0) {
      alert("No hay stock del producto. Intente más tarde o con otro producto.");
      return;
    }

    dispatch(addToCarrito({ item: { productoId: producto.id } }))
      .then(() => {
        alert("Item agregado al carrito");
      })
      .catch((error) => {
        console.error('Error al agregar producto al carrito:', error);
        alert("Hubo un error al agregar el producto al carrito. Intente nuevamente.");
      });
  };
  
  const handleAgregarAFavoritos = (producto) => {
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
    <div>
      <div className="text-black bold p-5">
        <h1>¿Qué desea comprar?</h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      <Filters
        categorias={categorias}
        descuentos={descuentos}
        onFilter={handleFilterChange}
      />
      <div className="contenedor-productos">
        {filteredProductos.map((producto, index) => (
          <div key={index} onClick={() => handleSelectProduct(producto)}>
            <ProductDo
              value={producto}
              agregarAlCarrito={() => handleAgregarAlCarrito(producto)}
              agregarAFavoritos={() => handleAgregarAFavoritos(producto)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};