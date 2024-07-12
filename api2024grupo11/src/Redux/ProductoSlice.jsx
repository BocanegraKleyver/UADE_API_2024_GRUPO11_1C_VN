import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/producto';
const token = localStorage.getItem('usuario') && JSON.parse(localStorage.getItem('usuario')).access_token;

const initialState = {
  productos: [],
  status: 'idle',
  error: null,
};

export const fetchProductos = createAsyncThunk('producto/fetchProductos', async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
});

export const fetchProductoById = createAsyncThunk('producto/fetchProductos', async (id) => {
  const response = await axios.get(API_URL+`/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
});

export const createProducto = createAsyncThunk('producto/createProducto', async (nuevoProducto) => {
  console.log('Enviando solicitud de creación de producto:', nuevoProducto);
  const response = await axios.post(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }, nuevoProducto);
  return response.data;
});


export const updateProducto = createAsyncThunk('producto/updateProducto', async ({ id, producto }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      }, producto);
      return response.data;  
    } catch (error) {
      throw Error('Error al actualizar el producto');
    }
  });


export const deleteProducto = createAsyncThunk('producto/deleteProducto', async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  return id;
});


// TODO: esto esta mal
export const filterProductos = createAsyncThunk('producto/filterProductos', async ({ searchTerm, filtroCategoria, filtroDescuento }) => {
    let url = `${API_URL}?searchTerm=${searchTerm}`;
    
    if (filtroCategoria) {
      url += `&idCategoria=${filtroCategoria}`;
    }
    
    if (filtroDescuento) {
      url += `&idDescuento=${filtroDescuento}`;
    }
  
    const response = await axios.get(url);
    return response.data;
  });


const productoSlice = createSlice({
  name: 'producto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos = action.payload;
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProducto.fulfilled, (state, action) => {
        state.productos.push(action.payload);
      })
      .addCase(updateProducto.fulfilled, (state, action) => {
        const updatedProducto = action.payload;
        const index = state.productos.findIndex((prod) => prod.id === updatedProducto.id);
        if (index !== -1) {
          state.productos[index] = updatedProducto;
        }
        state.status = 'succeeded';
      })
      .addCase(updateProducto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.productos = state.productos.filter((producto) => producto.id !== action.payload);
      })
      .addCase(filterProductos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterProductos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos = action.payload;
      })
      .addCase(filterProductos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productoSlice.reducer;
