import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

export const getData = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contactsData = await axios.get('contacts');
      return contactsData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (value, thunkAPI) => {
    try {
      const contactsData = await axios.post('contacts', value);
      return contactsData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const contactsData = await axios.delete(`contacts/${id}`);
      return contactsData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (values, thunkAPI) => {
    try {
      const contactsData = await axios.patch(
        `contacts/${values.id}`,
        values.info
      );
      return contactsData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
