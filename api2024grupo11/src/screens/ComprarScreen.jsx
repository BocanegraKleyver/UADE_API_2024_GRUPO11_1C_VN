import React, { useState, useEffect, useCallback } from "react";
import ProductDo from "../components/Cards/ProductDo";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Filters } from "../components/Filters/Filters";
import ProductSelect from "../components/Cards/ProductSelect";
import { agregarItemAlCarrito } from "../Services/carritoService";
import { agregarItemAFavoritos } from "../Services/favoritosService";
import { useProductoContext } from "../context/ProductoContext";
import { useCategoriaContext } from "../context/CategoriaContext";
import { useDescuentoContext } from "../context/DescuentoContext";


export const ComprarScreen = () => {
  const { productos } = useProductoContext();
  const { categorias } = useCategoriaContext();
  const { descuentos } = useDescuentoContext();
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroDescuento, setFiltroDescuento] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);


  const filterProductos = useCallback((searchTerm, categoriaId, descuentoId) => {
    console.log('Productos:', productos);
    console.log('Filtros - Categoria:', categoriaId, 'Descuento:', descuentoId, 'Search Term:', searchTerm); 

    let filtered = [...productos];

    if (searchTerm) {
      filtered = filtered.filter(producto =>
        producto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoriaId) {
      filtered = filtered.filter(producto => producto.categoria === parseInt(categoriaId));
    }

    if (descuentoId) {
      filtered = filtered.filter(producto => producto.descuento === parseInt(descuentoId));
    }

    console.log("Filtered Products: ", filtered);
    setFilteredProductos(filtered);
  }, [productos]);



  useEffect(() => {
    filterProductos(searchTerm, filtroCategoria, filtroDescuento);
  }, [productos, searchTerm, filtroCategoria, filtroDescuento, filterProductos]);



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
    filterProductos(term, filtroCategoria, filtroDescuento);
  };

  const handleFilterChange = (filtro, value) => {
    console.log(`Filtro: ${filtro}, Valor: ${value}`);
    if (filtro === 'categoria') {
      setFiltroCategoria(value);
    } else if (filtro === 'descuento') {
      setFiltroDescuento(value);
    }
    filterProductos(searchTerm, filtro === 'categoria' ? value : filtroCategoria, filtro === 'descuento' ? value : filtroDescuento);
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