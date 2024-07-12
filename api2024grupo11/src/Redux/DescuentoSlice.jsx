import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/descuento';
const token = JSON.parse(localStorage.getItem('usuario')).access_token;

const initialState = {
  descuentos: [],
  status: 'idle',
  error: null,
};

export const fetchDescuentos = createAsyncThunk('descuento/fetchDescuentos', async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  return response.data;
});

export const createDescuento = createAsyncThunk('descuento/createDescuento', async (nuevoDescuento) => {
  const response = await axios.post(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }, nuevoDescuento);
  return response.data;
});

export const updateDescuento = createAsyncThunk('descuento/updateDescuento', async ({ id, descuento }) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }, descuento);
  return response.data;
});

export const deleteDescuento = createAsyncThunk('descuento/deleteDescuento', async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  return id;
});

const descuentoSlice = createSlice({
  name: 'descuento',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDescuentos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDescuentos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.descuentos = action.payload;
      })
      .addCase(fetchDescuentos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createDescuento.fulfilled, (state, action) => {
        state.descuentos.push(action.payload);
      })
      .addCase(updateDescuento.fulfilled, (state, action) => {
        const updatedDescuento = action.payload;
        const existingDescuento = state.descuentos.find((descuento) => descuento.id === updatedDescuento.id);
        if (existingDescuento) {
          existingDescuento.porcentaje = updatedDescuento.porcentaje;
        }
      })
      .addCase(deleteDescuento.fulfilled, (state, action) => {
        state.descuentos = state.descuentos.filter((descuento) => descuento.id !== action.payload);
      });
  },
});

export default descuentoSlice.reducer;
