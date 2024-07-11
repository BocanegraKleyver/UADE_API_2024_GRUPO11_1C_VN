import { configureStore } from '@reduxjs/toolkit';
import categoriaReducer from './CategoriaSlice.jsx';
import descuentoReducer from './DescuentoSlice.jsx';
import productoReducer from './ProductoSlice.jsx';

const store = configureStore({
  reducer: {
    categoria: categoriaReducer,
    descuento: descuentoReducer,
    producto: productoReducer,
  },
});

export default store; 