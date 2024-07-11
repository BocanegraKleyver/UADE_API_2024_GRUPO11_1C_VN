import React, { useState, useEffect } from "react";
import ProductDo from "../components/Cards/ProductDo";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Filters } from "../components/Filters/Filters";
import { agregarItemAlCarrito } from "../Services/carritoService";
import { agregarItemAFavoritos } from "../Services/favoritosService";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos, filterProductos } from '../Redux/ProductoSlice';
import { fetchCategorias } from '../Redux/CategoriaSlice';
import { fetchDescuentos } from '../Redux/DescuentoSlice';

  export const ComprarScreen = () => {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.producto.productos);
    const categorias = useSelector((state) => state.categoria.categorias);
    const descuentos = useSelector((state) => state.descuento.descuentos);
    
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroDescuento, setFiltroDescuento] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductos());
    dispatch(fetchCategorias());
    dispatch(fetchDescuentos());
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
    if (producto.cantidad === 0) {
      alert("No hay stock del producto. Intente más tarde o con otro producto.");
      return;
    }
    // agregarItemAlCarrito(producto, idCarrito);
    // TODO: implementar en redux
    agregarItemAlCarrito(producto, 1);

    alert("Item agregado al carrito");
  };

  
  const handleAgregarAFavoritos = (producto) => {
    agregarItemAFavoritos(producto);
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
        {filteredProductos.map((value, index) => (
          <div key={index} onClick={() => handleSelectProduct(value)}>
            <ProductDo
              value={value}
              agregarAlCarrito={() => handleAgregarAlCarrito(value)}
              agregarAFavoritos={() => handleAgregarAFavoritos(value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

