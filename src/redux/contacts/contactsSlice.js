import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  getData,
  updateContact,
} from './contactsOps';

const handlePending = state => {
  state.loading = true;
  state.status = null;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.status = 'error';
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
    status: null,
    changingItem: null,
    isChanging: false,
  },
  reducers: {
    getExactContact: (state, action) => {
      state.changingItem = state.items.find(item => item.id === action.payload);
      state.isChanging = true;
    },
    cancelChanging: state => {
      state.changingItem = null;
      state.isChanging = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getData.pending, handlePending)
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getData.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = 'success';
        state.items = [...state.items, action.payload];
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = 'success';
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = 'success';
        state.changingItem = null;
        state.isChanging = false;
        state.items = state.items.map(item => {
          if (item.id === action.payload.id) {
            item.name = action.payload.name;
            item.number = action.payload.number;
          }

          return item;
        });
      })
      .addCase(updateContact.rejected, handleRejected);
  },
});

export const { getExactContact, cancelChanging } = contactsSlice.actions;

export default contactsSlice.reducer;
