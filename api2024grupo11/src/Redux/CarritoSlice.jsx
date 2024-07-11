import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/carrito';

const initialState = {
  carrito: {
    productos: [],
    total: 0,
  },
  status: 'idle',
  error: null,
};


export const fetchCarrito = createAsyncThunk('carrito/fetchCarrito', async (carritoId) => {
  const response = await axios.get(`${API_URL}/${carritoId}`);
  return response.data;
});

export const fetchCarritoByUserId = createAsyncThunk('carrito/fetchCarritoByUserId', async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
});


export const addToCarrito = createAsyncThunk('carrito/addToCarrito', async ({ carritoId, item }) => {
  try {
    const { productoId, cantidad } = item; 
    const response = await axios.post(`${API_URL}/agregar/${carritoId}`, { productoId, cantidad }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error.response ? error.response.data : error.message); 
    throw error;
  }
});

export const substractFromCarrito = createAsyncThunk('carrito/substractFromCarrito', async ({ carritoId, item }) => {
  const response = await axios.post(
    `${API_URL}/restar/${carritoId}`,
    item,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
});

export const removeFromCarrito = createAsyncThunk('carrito/removeFromCarrito', async ({ carritoId, item }) => {
  try {
    const response = await axios.delete(`${API_URL}/quitar/${carritoId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: item
    });
    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error.response ? error.response.data : error.message); 
    throw error;
  }
});

export const emptyCarrito = createAsyncThunk('carrito/emptyCarrito', async (carritoId) => {
  const response = await axios.put(`${API_URL}/vaciar/${carritoId}`);
  return response.data;
});
  
const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarrito.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarrito.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carrito = {
          ...action.payload,
          productos: action.payload.productos || [],
        };
      })
      .addCase(fetchCarrito.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCarritoByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarritoByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carrito = action.payload;
      })
      .addCase(fetchCarritoByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCarrito.fulfilled, (state, action) => {
        state.carrito = action.payload.carrito;
      })
      .addCase(addToCarrito.rejected, (state, action) => {
        state.error = action.error.message; 
      })
      .addCase(substractFromCarrito.fulfilled, (state, action) => {
        state.carrito = action.payload;
      })
      .addCase(removeFromCarrito.fulfilled, (state, action) => {
        state.carrito = action.payload;
      })
      .addCase(emptyCarrito.fulfilled, (state, action) => {
        state.carrito = action.payload;
      });
  },
});

export default carritoSlice.reducer;