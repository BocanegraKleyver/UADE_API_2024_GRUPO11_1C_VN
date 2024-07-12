import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/categoria';
const token = JSON.parse(localStorage.getItem('usuario')).access_token;

const initialState = {
  categorias: [],
  status: 'idle',
  error: null,
};

export const fetchCategorias = createAsyncThunk('categoria/fetchCategorias', async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  return response.data;
});

export const createCategoria = createAsyncThunk('categoria/createCategoria', async (nuevaCategoria) => {
  const response = await axios.post(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }, nuevaCategoria);
  return response.data;
});

export const updateCategoria = createAsyncThunk('categoria/updateCategoria', async ({ id, categoria }) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }, categoria);
  return response.data;
});

export const deleteCategoria = createAsyncThunk('categoria/deleteCategoria', async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  return id;
});

const categoriaSlice = createSlice({
  name: 'categoria',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategoria.fulfilled, (state, action) => {
        state.categorias.push(action.payload);
      })
      .addCase(updateCategoria.fulfilled, (state, action) => {
        const updatedCategoria = action.payload;
        const existingCategoria = state.categorias.find((cat) => cat.id === updatedCategoria.id);
        if (existingCategoria) {
          existingCategoria.descripcion = updatedCategoria.descripcion;
        }
      })
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.categorias = state.categorias.filter((categoria) => categoria.id !== action.payload);
      });
  },
});

export default categoriaSlice.reducer;
