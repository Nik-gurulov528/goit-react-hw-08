import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setHeaderToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearHeaderToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (values, thunkAPI) => {
    try {
      const registData = await axios.post('users/signup', values);
      setHeaderToken(registData.data.token);
      return registData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const loginData = await axios.post('users/login', values);
      setHeaderToken(loginData.data.token);
      return loginData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.value);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const logoutData = await axios.post('users/logout');
    clearHeaderToken();
    return logoutData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const savedToken = thunkAPI.getState();
      setHeaderToken(savedToken.auth.token);
      const getUserData = await axios.get('users/current');
      return getUserData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const savedToken = thunkAPI.getState();
      return savedToken.auth.token !== null && savedToken.auth.token !== '';
    },
  }
);
