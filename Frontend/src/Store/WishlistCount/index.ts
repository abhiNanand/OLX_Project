import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'wishlistCount',
  initialState: { count: 0 },
  reducers: {
    setWishlistCount: (state, action) => ({
      ...state,
      count: action.payload,
    }),
  },
});

export const { setWishlistCount } = loader.actions;

export default loader.reducer;
