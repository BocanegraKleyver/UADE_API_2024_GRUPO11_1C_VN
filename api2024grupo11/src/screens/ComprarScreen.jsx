import { default as React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ProductDo from "../components/Cards/ProductDo";
import { Filters } from "../components/Filters/Filters";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { addToCarrito, fetchCarritoByUserEmail } from '../Redux/CarritoSlice';
import { fetchCategorias } from '../Redux/CategoriaSlice';
import { fetchDescuentos } from '../Redux/DescuentoSlice';
import { agregarItemAFavoritosLocalmente } from "../Redux/FavoritoSlice";
import { fetchProductos } from '../Redux/ProductoSlice';

export const ComprarScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productos = useSelector((state) => state.producto.productos);
    const categorias = useSelector((state) => state.categoria.categorias);
    const descuentos = useSelector((state) => state.descuento.descuentos);
    const carrito = useSelector((state) => state.carrito.carrito);
    const usuario = useSelector((state) => state.usuario.usuario);
    const usuarioLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    const email = usuarioLocalStorage ? usuarioLocalStorage.registered_email : null;
   


    const [filteredProductos, setFilteredProductos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroDescuento, setFiltroDescuento] = useState('');
    const [filtroPrecio, setFiltroPrecio] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      dispatch(fetchProductos());
      dispatch(fetchCategorias());
      dispatch(fetchDescuentos());
      if (email) {
        dispatch(fetchCarritoByUserEmail(email));
      }
    }, [dispatch, email]);
  
    useEffect(() => {
      setFilteredProductos(productos);
  }, [productos]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = productos;

      if (searchTerm) {
        filtered = filtered.filter(producto =>
          producto.nombre && producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filtroCategoria) {
        filtered = filtered.filter(producto =>
          producto.idCategoria === parseInt(filtroCategoria, 10)
        );
      }

      if (filtroDescuento) {
        filtered = filtered.filter(producto =>
          producto.idDescuento === parseInt(filtroDescuento, 10)
        );
      }

      if (filtroPrecio) {
        filtered = filtered.filter(producto => {
          const precio = producto.precio;
          switch (filtroPrecio) {
            case '0-24999':
              return precio >= 0 && precio <= 24999;
            case '25000-49999':
              return precio > 25000 && precio <= 49999;
            case '50000-74999':
              return precio > 50000 && precio <= 74999;
            case '75000-99999':
              return precio > 75000 && precio <= 99999;
            case '100000+':
              return precio > 100000;
            default:
              return true;
          }
        });
      }

      setFilteredProductos(filtered);
    };

    applyFilters();
  }, [productos, searchTerm, filtroCategoria, filtroDescuento, filtroPrecio]);



    const handleAgregarAlCarrito = (producto) => {

      if (!email) {
        navigate('/usuarios');
        return;
      }
      
      if (!carrito || !carrito.carrito.id) {
        alert("No se pudo agregar el producto al carrito. Intente nuevamente.");
        return;
      }
      
      if (producto.cantidad === 0) {
        alert("No hay stock del producto. Intente más tarde o con otro producto.");
        return;
      }
      
      const item = { productoId: producto.id, cantidad: 1 };
      dispatch(addToCarrito({ carritoId: carrito.carrito.id, item }))
        .then((response) => {
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
    } else if (filtro === 'precio') {
        setFiltroPrecio(value);
    }
};

const filterByCategory = (producto) => {
  if (!filtroCategoria) return true;
  return producto.categoria === parseInt(filtroCategoria, 10);
};


const filterByDiscount = (producto) => {
  if (!filtroDescuento) return true;
  return producto.descuento === parseInt(filtroDescuento, 10);
};

const filterByPriceRange = (producto) => {
  if (!filtroPrecio) return true;

  const precio = producto.precio;
  switch (filtroPrecio) {
      case '0-24999':
          return precio >= 0 && precio <= 24999;
      case '25000-49999':
          return precio > 25000 && precio <= 49999;
      case '50000-74999':
          return precio > 50000 && precio <= 74999;
      case '75000-99999':
          return precio > 75000 && precio <= 99999;
      case '100000+':
          return precio > 100000;
      default:
          return true;
  }
};


return (
  <div className="comprarscreen">
    <div className="paralelo2">
      <div>
        <h1 className="logo">¿Qué desea comprar?</h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      <Filters
        categorias={categorias}
        descuentos={descuentos}
        onFilter={handleFilterChange}
      />
    </div>
    <div className="contenedor-productos">
      {filteredProductos && filteredProductos.map((producto, index) => (
        <div key={index}>
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