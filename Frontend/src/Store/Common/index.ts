import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
  name: 'common',
  initialState: {   access: null, id: null, username: null },
  reducers: {
    updateAuthState: (_, action) => ({
       
      access: action.payload.access,
      id: action.payload.id,
      username: action.payload.username,
    }),
    updateAuthToken: (state, action) => ({
      ...state,
      access: action.payload.access,
    }),
    updateUsername: (state, action) => ({
      ...state,
      username: action.payload.username,
    }),
  },
});

export const { updateAuthState, updateAuthToken, updateUsername } =
  common.actions;

export default common.reducer;
