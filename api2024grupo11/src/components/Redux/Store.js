import { configureStore } from "@reduxjs/toolkit";

import { productoSlice } from './CreateProducto';

const Store = configureStore({
    reducer: productoSlice.reducer,
})

export default Store;