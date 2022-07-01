import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const radioButtonSlice = createSlice({
  name: 'radioButton',
  initialState: {
    value: 0,
  },
  reducers: {
    setRadioButtonNumber: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getRadioButtonNumber = (state: RootState) => state.radioButton.value;
export const { setRadioButtonNumber } = radioButtonSlice.actions;
export default radioButtonSlice.reducer;
