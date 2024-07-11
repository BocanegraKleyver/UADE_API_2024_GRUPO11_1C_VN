import { configureStore } from "@reduxjs/toolkit";
import categoriaReducer from "./CategoriaSlice.jsx";
import descuentoReducer from "./DescuentoSlice.jsx";
import productoReducer from "./ProductoSlice.jsx";
import carritoReducer from "./CarritoSlice.jsx";
import favoritosReducer from "./FavoritoSlice.jsx";

const store = configureStore({
  reducer: {
    categoria: categoriaReducer,
    descuento: descuentoReducer,
    producto: productoReducer,
    carrito: carritoReducer,
    favoritos: favoritosReducer,
  },
});

export default store;
