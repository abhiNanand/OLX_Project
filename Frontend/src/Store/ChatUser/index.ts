import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'chatUser',
  initialState: { userId: null, userName: null },
  reducers: {
    setUserId: (state, action) => ({
      ...state,
      userName: action.payload.userName,
      userId: action.payload.userId,
    }),
  },
});

export const { setUserId } = loader.actions;

export default loader.reducer;
