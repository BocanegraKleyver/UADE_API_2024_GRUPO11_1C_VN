import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/favoritos';
const token = JSON.parse(localStorage.getItem('usuario')).access_token;

const initialState = {
  favoritos: [],
  status: 'idle',
  error: null,
};

export const fetchFavoritos = createAsyncThunk('favoritos/fetchFavoritos', async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw Error('Error al obtener los favoritos');
  }
});

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    agregarItemAFavoritosLocalmente: (state, action) => {
      const producto = action.payload;
      state.favoritos.push(producto);
    },
    eliminarItemDeFavoritosLocalmente: (state, action) => {
      const id = action.payload;
      state.favoritos = state.favoritos.filter((producto) => producto.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoritos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favoritos = action.payload;
      })
      .addCase(fetchFavoritos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  agregarItemAFavoritosLocalmente,
  eliminarItemDeFavoritosLocalmente,
} = favoritosSlice.actions;

export default favoritosSlice.reducer;
