import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'area',
  initialState: { area: 'India', item: '' },
  reducers: {
    setArea: (state, action) => ({
      ...state,
      area: action.payload,
    }),
    setItem: (state, action) => ({
      ...state,
      item: action.payload,
    }),
  },
});

export const { setArea, setItem } = loader.actions;

export default loader.reducer;
