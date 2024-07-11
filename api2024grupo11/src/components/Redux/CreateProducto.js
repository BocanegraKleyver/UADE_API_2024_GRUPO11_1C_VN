import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productos: [],
};

export const productosSlice = createSlice({
   name: "productos",
   initialState,
   
reducers: {
    addProducto: (state, action) => {
        const newProducto = { id: state.todos.length + 1, todo: action.payload }; 
        state.productos = state.productos.concat(newProducto);
    },


}
})
export const {addProducto} = productoSlice.actions