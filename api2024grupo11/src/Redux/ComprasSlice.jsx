import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/compra';

const initialState = {
  compras: [],
  status: 'idle',
  error: null,
};


export const fetchComprasByUserEmail = createAsyncThunk('compras/fetchComprasByUserEmail', async (email) => {
  const response = await axios.get(`${API_URL}/email/${email}`);
  localStorage.setItem('compras', JSON.stringify(response.data))
  return response.data;
});

const comprasSlice = createSlice({
  name: 'compras',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComprasByUserEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComprasByUserEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.compras = action.payload;
      })
      .addCase(fetchComprasByUserEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default comprasSlice.reducer;