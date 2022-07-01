import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const userTextSlice = createSlice({
  name: 'userText',
  initialState: {
    value: "",
  },
  reducers: {
    setUserText: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getUserText = (state: RootState) => state.userText.value;
export const { setUserText } = userTextSlice.actions;
export default userTextSlice.reducer;
