import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/carrito';
const COMPRA_API_URL = 'http://localhost:8080/api/v1/compra/create'

const initialState = {
  carrito: {
    productos: [],
    total: 0,
  },
  status: 'idle',
  error: null,
  carritoId: JSON.parse(localStorage.getItem("carritoId")) || null,
};


export const fetchCarritoByUserEmail = createAsyncThunk('carrito/fetchCarritoByUserEmail', async (email) => {
  const response = await axios.get(`${API_URL}/user/email/${email}`);
  return response.data;
});

export const substractFromCarrito = createAsyncThunk('carrito/substractFromCarrito', async ({ carritoId, item }) => {
  const { productoId, cantidad } = item;

  try {
    const response = await axios.post(`${API_URL}/restar/${carritoId}`, { productoId, cantidad }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error.response ? error.response.data : error.message);
    throw error;
  }
});

export const addToCarrito = createAsyncThunk('carrito/addToCarrito', async ({ carritoId, item }) => {
  const { productoId, cantidad } = item;
  try {
    const response = await axios.post(`${API_URL}/agregar/${carritoId}`, { productoId, cantidad }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error.response ? error.response.data : error.message);
    throw error;
  }
});

export const comprar = createAsyncThunk('carrito/comprar', async ({email, total, compraProductos}) => {

  const req = JSON.stringify({email: email, total: total, productos: compraProductos})

  try {

    const response = await axios.post(`${COMPRA_API_URL}`, req, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error.response ? error.response.data : error.message);
    throw error;
  }
});

export const removeFromCarrito = createAsyncThunk('carrito/removeFromCarrito', async ({ carritoId, productoId }) => {

  try {
    const response = await axios.put(`${API_URL}/quitar/${carritoId}`, {productoId},
       {
        headers: {
          'Content-Type': 'application/json',
        }
       });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error.response ? error.response.data : error.message);
    throw error;
  }
});


export const emptyCarrito = createAsyncThunk('carrito/emptyCarrito', async (carritoId) => {
  const response = await axios.put(`${API_URL}/vaciar/${carritoId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
});

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    setCarritoId: (state, action) => {
      state.carritoId = action.payload;
      localStorage.setItem('carritoId', action.payload);
    },
    clearCarritoId: (state) => {
      state.carritoId = null;
      localStorage.removeItem('carritoId'); 
      state.carrito = {
        productos: [],
        total: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarritoByUserEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarritoByUserEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carrito = action.payload;
      })
      .addCase(fetchCarritoByUserEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCarrito.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carrito = action.payload;
      })
      .addCase(addToCarrito.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(substractFromCarrito.fulfilled, (state, action) => {
        state.carrito = action.payload;
      })
      .addCase(removeFromCarrito.fulfilled, (state, action) => {
        state.carrito = action.payload;
      })
      .addCase(emptyCarrito.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carrito.productos = [];
        state.carrito.total = 0;
      })
      .addCase(comprar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(comprar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carrito.productos = [];
        state.carrito.total = 0;
      })
      .addCase(comprar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default carritoSlice.reducer;