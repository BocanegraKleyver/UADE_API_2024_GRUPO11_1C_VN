import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

const initialState = {
  usuario: JSON.parse(localStorage.getItem("usuario")) || null,
  status: 'idle',
  error: null,
};


export const createUsuario = createAsyncThunk('usuario/createUsuario', async ({ username, password, nombre, apellido, email, isVendedor }, { rejectWithValue }) => {
  const req = {
    username,
    firstname: nombre,
    lastname: apellido,
    email,
    password,
    roles: isVendedor ? 3 : 2,//"Vendedor" : "Comprador",
  };

  try {
    const response = await axios.post(`${API_URL}/register`, req, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const loginUsuario = createAsyncThunk('usuario/loginUsuario', async ({ email, password }) => {
  const req = {
    email,
    password,
  };

  const { data } = await axios.post(`${API_URL}/authenticate`, req, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  data.isAuthenticated = true;

  localStorage.setItem("usuario", JSON.stringify(data))
  return data;
});

export const logoutUsuario = createAsyncThunk('usuario/logoutUsuario', async () => {
  localStorage.removeItem("usuario"); 
});

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUsuario.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUsuario.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usuario = null;
      })
      .addCase(createUsuario.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUsuario.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUsuario.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usuario = action.payload;
      })
      .addCase(loginUsuario.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUsuario.fulfilled, (state) => {
        state.status = 'idle';
        state.usuario = null;
      });
  },
});

export default usuarioSlice.reducer;
