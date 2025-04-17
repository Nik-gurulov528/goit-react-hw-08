import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { name: '' },
  reducers: {
    changeFilter(state, action) {
      if (action.payload !== null) {
        return {
          ...state,
          name: state.name + action.payload,
        };
      } else {
        return {
          ...state,
          name: state.name.slice(0, state.name.length - 1),
        };
      }
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
