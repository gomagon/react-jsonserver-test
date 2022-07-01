import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const ageTextSlice = createSlice({
  name: 'ageText',
  initialState: {
    value: "",
  },
  reducers: {
    setAgeText: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getAgeText = (state: RootState) => state.ageText.value;
export const { setAgeText } = ageTextSlice.actions;
export default ageTextSlice.reducer;
